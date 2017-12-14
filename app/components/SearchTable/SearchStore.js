import { observable, action } from 'mobx';
import _ from 'lodash';
import Alert from 'components/Alert';
import API from 'utils/API';
import TableStore from '../Table/Store';

/**
config: {
  api: api, // string
  urlConfig: {}, // same as each request config in utils/API/index.js
  // 各字段占用的 span 此配置将统一设置高级搜索框内各字段占用的 span
  fieldSpan: number
  // 是否允许 miniForm 搜索框
  // 为 false 时将不能切换到简易搜索框
  // 为 true 时将不能切换到高级搜素框
  // 不传时按照配置状态自动切换
  mini: bool
  showSwitch: bool // 是否显示切换按钮 不传时检查配置初始化
  searchUrl: '/api/v2/dictdatas/query',
  defaultSearchParams: {
  },
  searchParams: {
  },
  events: {
    onFetchSuccess: function<list>,
    onFetchFail: function<res>
  },
  fields: [{
    mini: bool // 配置为 false 时此配置字段将不在 简易搜索 中出现
    span: number // 此字段占用的 span
  }]
}
 */

/**
 * SearchForm Store
 */
class SearchStore extends TableStore {
  constructor(config = {}) {
    super(config);
    this.config.fields = this.config.fields || [];
    this.configApi = new API(config.api);
    this.configUrlConfig = config.urlConfig || {};
    this.configDefaultSearchParams = config.defaultSearchParams || {};
    this.configSearchParams = config.searchParams || {};
    this.configEvents = config.events || {};
    this.initFormOption();
  }

  initFormOption = () => {
    const fields = this.config.fields || [];
    this.miniNumber = this.config.mini === false ? 0 : fields.filter((va) => { return va.mini !== false; }).length;
    this.fieldsNumber = this.config.mini === true ? 0 : fields.filter((va) => { return va.mini !== true; }).length;
    if (this.config.showSwitch) this.showSwitch = this.config.showSwitch;
    else {
      // 只有一个搜索字段 或 没有简易搜索字段时 不显示切换按钮
      if (this.miniNumber > 0 && this.fieldsNumber > 1) this.showSwitch = true;
      else this.showSwitch = false;
      // 无 简易搜索字段 但是有 高级搜索字段时
      if (this.miniNumber < 1 && this.fieldsNumber > 0) this.setExpand(false);
    }
  };

  /* =================================== SearchForm 部分开始 =================================== */
  searchParams = {}; // search
  @observable expand = this.config.expand !== false; // '简易搜索' : '高级搜索'
  searchFormComponent;

  setSearchFormComponent = (component) => {
    this.searchFormComponent = component;
  };
  // SearchForm 部分结束

  /* =================================== MiniForm 部分开始 =================================== */
  @observable current = ''; // 当前选中的搜索字段
  miniFormComponent;

  setCurrent = action((current) => { this.current = current; });
  SetMiniFormComponent = (component) => {
    this.miniFormComponent = component;
  }
  // MiniForm 部分结束

  /* =================================== 接口 部分开始 =================================== */
  setSearchParam = (params) => {
    this.searchParams = params;
  };

  /**
   * 点击[查询]按钮触发
   * @param searchParams
     */
  searchForm = (searchParams = {}) => {
    this.searchParams = searchParams; // 保存查询参数(用于分页查询)
    this.setCurrentPage(1); // 重置查@observable 询第一页
    if (this.configEvents.onBeforeSearch) { //  点击查询按钮的搜索之前的处理，例：用来重置外部分页的页码 (风险额度页面)
      this.configEvents.onBeforeSearch();
    }
    // 点击搜索时，重置被选中的行
    TableStore.focusRowKey = null;
    TableStore.focusTableId = null;
    this.search();
  };

  /**
   * 查询某一页(分页查询)
   * @param page
     */
  searchPage = (page) => {
    this.setCurrentPage(page);
    this.search();
  };

  /**
   * 查询
   */
  search = () => {
    // 支持通过函数的形式传入 searchParams
    let configSearchParams = typeof this.configSearchParams === 'function' ?
      this.configSearchParams() :
      _.assign({}, this.configSearchParams);
    configSearchParams.orderBy = this.sorter.makeParamOrder(configSearchParams.orderBy);
    let searchParams = Object.assign({}, this.searchParams, this.config.local !== true ? this.filter.filterValue : {});
    for (let key in searchParams) if (searchParams[key] === undefined || searchParams[key].length < 1) delete searchParams[key];
    let params = [
      {},
      this.pagination,
      this.configDefaultSearchParams,
      configSearchParams,
      searchParams,
    ];
    this.fetchData(_.assign(...params));
  };

  fetchData = (params) => {
    let searchUrl = this.config.searchUrl;
    // 获取数据前的回调,如果返回是false,则不获取数据
    if (this.configEvents.onBeforeFetch) {
      if (this.configEvents.onBeforeFetch(params) === false) {
        return;
      }
    }
    this.configApi.query(searchUrl, params, this.configUrlConfig)
      .then((res) => {
        if (res.code === 200) {
          let data = res.data;
          let list = data.list;
          if (this.configEvents.onFetchSuccess) {
            list = this.configEvents.onFetchSuccess(list, data);
          }
          this.cacheDatas = list;

          if (this.config.local === true) {
            this.setDatas(this.filter.handleLocalFilter(this.cacheDatas)); // 本地过滤
          } else {
            this.setDatas(this.cacheDatas);
          }
          this.setTotalRecord(data.totalRecord);
          this.refreshTable(); // 刷新table
        } else {
          if (this.configEvents.onFetchFail) {
            this.configEvents.onFetchFail(res);
          }
          Alert.error(res);
        }
      });
  };

  // 切换 miniForm 和 searchForm
  setExpand = action((expand) => {
    this.expand = expand;
  });

  // setFieldsValue
  setFieldsValue = (values) => {
    this.searchFormComponent.props.form.setFieldsValue(values);
    this.miniFormComponent.props.form.setFieldsValue(values);
  };

  // setFields
  setFields = (values) => {
    this.searchFormComponent.props.form.setFields(values);
    this.miniFormComponent.props.form.setFields(values);
  };

  // resetFields
  resetFields = (values) => {
    this.searchFormComponent.props.form.resetFields(values);
    this.miniFormComponent.props.form.resetFields(values);
  };
}

export default SearchStore;
