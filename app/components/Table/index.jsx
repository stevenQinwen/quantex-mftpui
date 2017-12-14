import React from 'react';
import { observer } from 'mobx-react';
import { Table, Icon } from 'antd';
import { AutoEllipsis, DateTimeTranslate } from 'components';
import { PAGINATION } from 'common/constants';
import Util from 'utils/util';
import TABLE from './table';
import FixedTable from './FixedTable';
import TableFilter from './Filter';
import TableStore from './Store';

import './index.scss';

const { DateTranslate, TimeTranslate } = DateTimeTranslate;

@observer
class TableComponent extends React.Component {

  ActiveTable = Table;

  constructor(props) {
    super(props);
    if (props.tableStore.config.scroll) {
      this.ActiveTable = FixedTable; // 根据配置项确认是否启用固定表头组件
    }
  }

  handleChangeTable = (pager, filter, sorterInfo) => {
    this.props.tableStore.sorter.setSorter(sorterInfo.field ? {
      field: sorterInfo.field,
      order: sorterInfo.order
    } : {});
    this.props.tableStore.onTableChange();
  };

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

  getTotalPage = () => {
    const { tableStore } = this.props;
    const { pageSize } = tableStore.pagination;
    return `共 ${Math.ceil(tableStore.totalRecord / pageSize)}页`;
  }

  /**
   * 整理columns中的排序字段和className和autoEllipsis
   * @param {object} column column
   * @return {object} build column
   */
  buildColumn = (column) => {
    const { tableStore } = this.props;
    const { config, sorter } = tableStore;
    let hidden = column.hidden === true || (column.hidden && column.hidden(column)) === true ? 'hidden' : '';
    let className = '';

    let _column = Object.assign({}, column);
    // 处理排序
    if (column.sorter) {
      if (config.local === true && column.sorter === true) {
        _column.sorter = (a, b) => { return a[column.dataIndex] > b[column.dataIndex] ? -1 : 1; };
      }
      _column.sortOrder = sorter.sorter.field === column.dataIndex && sorter.sorter.order;
    }
    // 处理 dataType 和 className
    this.buildColumnRenderWithDataType(_column);
    // 根据 autoEllipsis 处理 render
    this.buildColumnRenderWithAutoEllipsis(_column);
    // 如果title是一个函数，则先执行函数，动态生成title
    if (typeof _column.title === 'function') {
      _column.title = _column.title();
    }

    // 过滤 hidden 标记为不显示的列
    // 整理 columns className
    if (column.className && hidden) className = column.className + ' ' + hidden;
    else className = column.className || hidden;
    if (className) _column.className += (_column.className ? ' ' : '') + className;
    return _column;
  };

  /**
   * build render for column
   * 为 column dataType 生成指定 render
   * 在 column 中没有 render 时调用
   * @param {object} column column 配置对象
   */
  buildColumnRenderWithDataType = (column) => {
    const { className, dataType = 'string' } = column;
    // 检查是否需要生成 render
    if (!column.render && dataType !== 'string') {
      // 生成指定 dataType 的 render
      switch (dataType) {
        case 'date': column.render = (text) => { return <DateTranslate value={text} />; }; break;
        case 'time': column.render = (text) => { return <TimeTranslate value={text} />; }; break;
        case 'datetime': column.render = (text) => { return <DateTimeTranslate value={text} />; }; break;
        default: break; // column.render = (text) => { return text; };
      }
    }
    // 数据类型为数字时添加右对齐样式
    if (dataType === 'number') {
      let classNames = ['search-table-text-align-right'];
      if (column.sorter && column.filters) {                   // 判断有没有排序或过滤功能
        classNames.push('search-table-sorter-filter');
      } else if (column.sorter || column.filters) {
        classNames.push('search-table-sorter-or-filter');
      }
      column.className = (className ? className + ' ' : '') + (classNames.length > 0 ? classNames.join(' ') : '');
    }
  };

  /**
   * 根据column里的 autoEllipsis 配置来重新定义 render 函数
   * autoEllipsis: true / {...props}
   * @param column 表格每列配置
   * @returns {*}
   */
  buildColumnRenderWithAutoEllipsis = (column) => {
    let defaultAutoEllipsis = true;
    if ('autoEllipsis' in this.props.tableStore.config) {
      defaultAutoEllipsis = this.props.tableStore.config.autoEllipsis;
    }
    const { autoEllipsis = defaultAutoEllipsis, render } = column;
    if (!autoEllipsis) return;
    // autoEllipsis 是否为配置对象
    const isConfig = Object.prototype.toString.call(autoEllipsis) === '[object Object]';
    let getRenderText = (text, record, index) => {
      if (render) {
        return render(text, record, index);
      } else if (column.dataIndex) {
        return text;
      } else {
        return null;
      }
    };
    column.render = (text, record, index) => {
      return <AutoEllipsis {...(isConfig ? autoEllipsis : {})}>{getRenderText(text, record, index)}</AutoEllipsis>;
    };
    delete column.autoEllipsis; // 处理完毕移除 autoEllipsis 配置项, 不传入到 AntTable
  };

  render() {
    const { tableStore, ...searchTableProps } = this.props;
    const { pagination, totalRecord, config, filter, datas } = tableStore;
    const columns = config.columns.map((va) => {
      // 检查是否存在自定义过滤字段
      let name = (va.filters ? va.filters.name : '') || va.dataIndex;
      let custom = filter.filters[name];
      if (!custom) return this.buildColumn(va);
      else {
        return Object.assign({}, this.buildColumn(va), {
          filterIcon: <Icon type='filter' style={{ color: custom.filtered ? '#108ee9' : '#aaa' }} />,
          filterDropdownVisible: custom.filterDropdownVisible,
          filterDropdown: <TableFilter
            name={name}
            onSubmit={custom.onSubmit}
            onReset={custom.onReset}
            field={custom.field}
          />,
          onFilterDropdownVisibleChange: custom.onFilterDropdownVisibleChange,
          onFilter: custom.onFilter
        }, { filters: undefined });
      }
    });
    // 分页相关属性
    const paginationProps = {
      size: 'small',
      // defaultCurrent: pagination.page,
      current: pagination.page,
      defaultPageSize: pagination.pageSize,
      total: totalRecord,
      showSizeChanger: true, // 是否可以改变pageSize
      showQuickJumper: true, // 是否可快速跳转至某页
      pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
      onShowSizeChange: tableStore.setCurrentPage,
      onChange: tableStore.setPage, // 切换分页
      showTotal: this.getTotalPage
    };
    const tableProps = {
      size: 'small',
      bordered: false,
      dataSource: datas,
      columns: columns,
      tableKey: tableStore.tableKey,
      rowKey: (record) => { return Util.generateHash(JSON.stringify(this.getRowKey(record))); },
      pagination: config.local === true ? false : paginationProps
    };
    // 初始化 FixedTable 需要的 props
    let scroll = config.scroll;
    if (scroll) {
      if (scroll === true) scroll = {};
      tableProps.scroll = scroll;
    }
    // set div className
    const { className } = searchTableProps;
    searchTableProps.className = className ? `search-table ${className}` : 'search-table';

    return <div {...searchTableProps}>
      {
        config.showEmptyTable !== true || datas.length ?
          <this.ActiveTable className={`js-${tableStore.tableId}`} {...tableProps} {...tableStore.configTableProps} onChange={this.handleChangeTable} /> :
          <Table key="empty-table" {...tableProps} bordered={false} />
      }
    </div>;
  }
}

TableComponent.TableStore = TableStore;
TableComponent.FixedTable = FixedTable;
TableComponent.ID = TABLE; // 表格 ID 常量

export default TableComponent;
