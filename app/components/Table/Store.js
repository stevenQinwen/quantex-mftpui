import { observable, action } from 'mobx';
import _ from 'lodash';
import classnames from 'classnames';
import { Util, msgCenter, IndexedDB } from 'utils';
import { Alert } from 'components';
import { PAGINATION } from 'common/constants';
import Filter from './Filter';
import SorterStore from './sorter/Store';

const { FilterStore } = Filter;
const T_CUSTOM_TABLE = "custom_table"; // test 表
const dbUtil = IndexedDB.wrapperTableName(T_CUSTOM_TABLE);

/**
config: {
  local: bool, // 大开关, true: 本地数据过滤, false: 服务器端数据过滤
  scroll: true || {详细配置见 FixedTable 组件}, // 默认为空
  tableProps: {
    pagination: false
  }
  columns: [{
    dataType: string, 数据类型 string date time datetime number 决定 render 的加载组件
    // filters 过滤字段避免和 defaultExpandAllRows 一起使用
    // 本地排序过滤 避免和 服务器端接口排序过滤一起使用
    sorter: bool || function, // bool 时为服务器端排序 function 时为本地排序
    defaultSorter: 'asc' 'desc', // 首次加载默认排序
    hidden: bool || function, // 是否显示 hidden 为 true 或 返回 true 时 隐藏该列

    // array 时为 antd 默认过滤样式 配合 filterMultiple 决定加载单选或复选框
    // object { component, props, name } 时为自定义输入框过滤样式 目前只支持单个输入框加载 参数格式基本与 SearchForm 相同
    // name 字段为提交参数名 与 dataIndex 相同时可省略 反之请指定
    filters: array || object<{
      ... value: function 整理回传value的回调函数
    }>,
  }]
}
 */

/**
 * SearchForm Store
 */
class TableStore {
  constructor(config) {
    this.config = { focusable: true, ...config };  // 设置是否可focus变背景色 - 默认是
    this.cacheConfig = _.cloneDeep(config);
    this.tableId = config.tableId || _.uniqueId("table_");  //  标识不同的表格。如果两个表格数据相同，那rowKey也是一样的，focusRowKey会导致两个表格都有高亮的一行，这种情况下需要tableId来标识；
    this.config.columns = this.config.columns || [];
    this.configTableProps = config.tableProps || {};
    // 自定义过滤字段
    this.filter = new FilterStore(this);
    this.sorter = new SorterStore(this);

    if (config.dataSource) this.setDataSource(config.dataSource);
    // 如果开启了focus功能，则加上rowClassName和onRowClick方法
    if (this.config.focusable) {
      this.msgToken = msgCenter.subscribe('focus-reload-table', (topic, data) => {
        // 监听重置事件，在选择行时，需要重新渲染所有表格
        if (this.tableId === data.tableId) {
          this.refreshTable();
        }
      });
      let { rowClassName, onRowClick } = this.configTableProps;
      this.configTableProps.rowClassName = (record, index) => {
        rowClassName = typeof rowClassName === "function" ? rowClassName(record, index) : rowClassName;
        const rowClass = classnames({
          "ant-table-tr-active": (this.getTrueRowKey(record) === TableStore.focusRowKey) && (TableStore.focusTableId === this.tableId),
          [rowClassName]: rowClassName  //  与自定义rowClassName合并，防止覆盖
        });
        return rowClass;
      };
      this.configTableProps.onRowClick = (record, index, event) => {
        if (onRowClick) {
          // 调用自定义点击方法
          onRowClick(record, index, event);
        }
        // 点击时，设置被选中的rowKey和tableId
        TableStore.focusRowKey = this.getTrueRowKey(record);
        if (this.tableId !== TableStore.focusTableId) {
          // 如果上次点击的是其他表格，重新渲染一次
          msgCenter.publish('focus-reload-table', { tableId: TableStore.focusTableId });
        }
        TableStore.focusTableId = this.tableId; // 当 focus 该行数据时，获取表格 id
        TableStore.focusTableColumns = this.cacheConfig.columns; // 用于 ctrl+t 获取表格 columns 配置项数据
        TableStore.focusRecord = record;
        // 重新渲染当前表格
        msgCenter.publish('focus-reload-table', { tableId: TableStore.focusTableId });
      };
    }
    this.init();
  }

  init = () => {
    this.getCustomConfig(); //  获取自定义配置
  }

  /* =================================== OrderTable 部分开始 =================================== */
  @observable tableKey; // 负责刷新Table组件，每次需要更新Table组件数据时，更新tableKey即可
  datas = []; // antd Table 显示数据 从 cacheDatas 整理而来
  cacheDatas = [];
  pagination = { // 分页相关
    page: 1, // 默认当前页为第一页
    pageSize: PAGINATION.PAGE_SIZE
  };
  totalRecord = 0; // 用户记录数
  static focusRowKey; //  被选行rowKey
  static focusTableId;  //  被选的表格的id
  static focusRecord;  //  被选的表格行数据

  // 设置数据
  setDatas = (datas) => { this.datas = datas || []; };
  setPage = (page) => { this.pagination.page = page; };
  setPageSize = (pageSize) => { this.pagination.pageSize = pageSize; };
  setTotalRecord = (total) => { this.totalRecord = total || this.datas.length; };

  /**
   * @param current 当前页码
   * @param pageSize 显示数据条数
   * 若 pageSize 调整至 500 || 1000 || 5000, 则弹出警告框提示
   */
  setCurrentPage = (current, pageSize) => {
    let warningSize = [500, 1000, 5000];
    if (warningSize.includes(pageSize)) {
      Alert.warning("请确保你当前需要将数据导出，否则有可能导致页面卡顿，请及时恢复正常值");
    }
    this.setPagination({
      page: current,
      pageSize: pageSize || this.pagination.pageSize
    });
  };
  setPagination = (pagination) => { this.pagination = pagination; };

  // 备注(Sharon): 当没有 searchForm 时, 通过服务器过滤数据则需要在 tableProps 添加一个 onTableChange 方法
  onTableChange = () => {
    if (this.config.local === true) {
      this.setDatas(this.filter.handleLocalFilter(_.cloneDeep(this.cacheDatas)));
      this.refreshTable();
    } else {
      if (this.search) this.search();
      else {
        let searchParams = {};
        if (this.sorter.sorter.field) {
          searchParams.orderBy = this.sorter.getParamOrder(this.sorter.sorter);
        }
        this.configTableProps.onChange(Object.assign(
          {},
          this.pagination,
          this.filter.filterValue,
          searchParams
        ));
      }
    }
  };

  // 设置table数据源 存在本地过滤排序时 会深拷贝数据源并进行一次过滤
  setDataSource = (datas, totalRecord) => {
    if (datas) {
      this.cacheDatas = datas;
      if (this.config.local === true) {
        this.setDatas(this.filter.handleLocalFilter(this.cacheDatas)); // 本地过滤 深拷贝
      } else {
        this.setDatas(this.cacheDatas);
      }
      this.totalRecord = totalRecord || datas.length;
    }
  };

  // 刷新Table数据
  refreshTable = action((datas, totalRecord) => {
    this.setDataSource(datas, totalRecord);
    this.tableKey = _.uniqueId('table');
  });

  /**
   * 数据推送
   * 存在指定对比字段的数据将被替换
   * 反之会添加推送信息至列表
   * @param {object} data 推送信息
   * @param {string} key 对比字段
   */
  push = (data, key = 'code') => {
    let target = this.cacheDatas.find((item) => { return item[key] == data[key]; });
    if (target) Object.assign(target, data);
    else this.cacheDatas.unshift(data);
    this.refreshTable(this.cacheDatas);
  };

  // set
  setField = (middleWare) => {
    middleWare(this);
    return this;
  };

  /**
   * 获取rowKey
   */
  getTrueRowKey = (record) => {
    const { rowKey } = this.configTableProps;
    if (rowKey) {
      // 兼容自定义RowKey
      return typeof rowKey === "function" ? rowKey(record) : record[rowKey];
    } else {
      return Util.generateHash(JSON.stringify(this.getRowKey(record)));
    }
  }

  getRowKey = (record) => {
    let newRecord = {};
    for (let p in record) {
      let r = record[p];
      if (typeof r === 'string' || typeof r === 'number') {
        newRecord[p] = r;
      }
    }
    return newRecord;
  }

  /**
   * 获取自定义配置
   * {
      id: tableId, // 表格id
      name: '风控因子', // 表格名称，暂时为null
      config: {
        defaultTpl: 0,
        tpls: [
          {
            name: '自定义表格1',
            columns: this.config.columns.splice(0, 3)
          }
        ]
      }
    });
   */
  getCustomConfig = () => {
    dbUtil.getDataByKey(this.tableId).then((results) => {
      let tpl = [];
      if (results) {
        const { tpls, defaultTpl } = results.config;
        tpl = tpls[defaultTpl];
      } else {
        tpl = null;
      }
      this.makeCustomTable(tpl);
    });
  }

  /**
   * 按配置，改变columns
   * 根据用户配置与默认配置进行结合，按照用户自定义模板进行展示
   */
  makeCustomTable = (tpl) => {
    let { columns = [] } = this.config;
    if (tpl) {  //  如果有配置，按配置改变columns，如果没有，直接返回所有columns
      const { columns: tplColumns = [] } = tpl;
      let result = [];
      tplColumns.forEach((tplColumn) => {
        const { title } = tplColumn;
        // 兼容有 titleText 的配置项
        const defaultColumn = columns.find((item) => { return item.title == title || item.titleText == title; });
        defaultColumn.width = +tplColumn.width; // 设置默认宽度
        defaultColumn.order = tplColumn.order; // 设置是否排序 TODO: 暂时未用到
        result.push(defaultColumn);
      });
      columns = result;
    }
    this.config.columns = columns;
    this.refreshTable();
  }
}

export default TableStore;
