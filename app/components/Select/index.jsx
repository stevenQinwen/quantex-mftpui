import React from 'react';
import { Select } from 'antd';
import _ from 'lodash';
import classNames from 'classnames';
import Util from 'utils/util';
import API from 'utils/API';
import Alert from '../Alert';

import './index.scss';

const Option = Select.Option;
const FUZZY_SEARCH_DEBOUNCE_DELAY = 800;

/*
TODO: 关于组件外部 qx-select 样式可能存在的页面问题
1.
  大部分页面通过直接控制组件样式(例如 Select 组件一般通过改写 ant-select 类样式)来自定义页面内的组件的样式
  添加外层标签后(类名一般为 qx-xxx 例如 Select 组件外层标签类型为 qx-select)，会造成样式与页面需求不符
  此时应将 ant-xxx 类名的样式替换为对应的 qx-xxx 类名样式
2.
  部分页面可能粗线组件弹出框被遮盖的情况 目前粗线的此类情况均为由于页面外层标签存在 overflow hidden 的样式引起
  例如 Collapse 组件样式 ant-collapse-content 和 Tab 组件样式 ant-tabs 一般都带有 overflow hidden 样式
  此时可能需要修改部分外层标签的 overflow 样式来修复此类问题
  此方法会造成部分其他样式问题 需要具体问题具体分析解决
*/

class SelectComponent extends React.Component {

  constructor(props) {
    super(props);
    this.api = new API(props.dictSite);
    this.fetchFuzzySearchDictData = _.debounce(this.fetchFuzzySearchDictData, FUZZY_SEARCH_DEBOUNCE_DELAY);
  }

  state = {
    options: []
  }

  componentDidMount() {
    // TODO 移开焦点让组件自动选中第一项时不会触发 onSelect 事件
    // 设置模糊搜索标志位，解决 issue：https://github.com/ant-design/ant-design/issues/2954
    this.fuzzySearch = true;
    this.initDictData(this.props);
    // 添加一个初始化数值的trigger
    // 使用场景：比如「风控管理-基础数据-证券池设置-编辑动态证券池表单」，初进表单时，多行表单，Input1有值，Input3要依赖Input1的onChange事件来获取它的类型和取选项方式
    //          即：使初始化已有值时，触发原来onChange的事件
    this.props.onInit();
  }

  /**
   * 判断 props 的更改是否达到了更新组件的条件
   * 只有几个主要的数据属性变化 props 的更新操作不直接造成组件的更新
   * 而是通过 initDictData 中去触发 setState 方法重新渲染组件
   * @param nextProps
     */
  componentWillReceiveProps(nextProps) {
    // 一旦 dictSite 有变化，重新赋值 this.api
    if (nextProps.dictSite && this.props.dictSite !== nextProps.dictSite) {
      this.api = new API(nextProps.dictSite);
    }
    if (nextProps.forceUpdateDict
      || this.shouldUpdateWhenMainPropsChange(nextProps)) {
      this.updateWhenMainPropsChange = true;
      // 如果判断到 notFoundContent 属性有变化, 则进行一次强制刷新, 防止请求数据后前后数据仍然一致导致无法重新 render 的 bug
      if (!_.isEqual(this.props.notFoundContent, nextProps.notFoundContent)) {
        this.forceUpdate();
      }
      this.initDictData(nextProps);
    } else {
      this.updateWhenMainPropsChange = false;
    }
  }

  /**
   * 如果是 state 的改变引起的更新操作, 则一定会重新渲染组件
   * 如果是 props 的改变造成的更新则不进行重新的 render
   * 如果 forceUpdateDict 属性为 true 则会强制重新渲染组件
   * 如果非主要数据属性的更改造成的 props 变化会重新render
   * @param nextProps
   * @param nextState
   * @returns {boolean}
     */
  shouldComponentUpdate(nextProps, nextState) {
    return this.shouldUpdateWhenStateChange(nextState)
      || !this.updateWhenMainPropsChange;
  }

  /**
   * 如果是 dictData/dictUrl/dictParams 等影响数据变化的主要属性有所变化则会返回 true
   * 满足以下两种情况之一即视为 props 的更改会造成组件重新渲染
   * @param nextProps
   * @returns {*|boolean}
     */
  shouldUpdateWhenMainPropsChange = (nextProps) => {
    const { dictData, dictUrl, dictParams, dictKey } = this.props;
    return (
      !Util.isArrayEqual(dictData, nextProps.dictData)
      || !_.isEqual(dictParams, nextProps.dictParams)
      || dictUrl !== nextProps.dictUrl
      || dictKey !== nextProps.dictKey
    );
  }

  /**
   * 判断是 state 的变化是否会影响组件重新渲染
   * @param nextState
   * @returns {boolean}
   */
  shouldUpdateWhenStateChange = (nextState) => {
    const { options } = this.state;
    return !Util.isArrayEqual(options, nextState.options);
  }

  setOptions = (options = []) => {
    this.setState({
      options
    });
  }

  getUrlParams = (props, fuzzySearchDictParams = {}) => {
    const { dictKey, dictUrl, dictParams } = props;
    return Object.assign({
      dictKey: dictKey,
      query: Util.buildFilterParams({ orderBy: 'id' }, dictParams, fuzzySearchDictParams)
    }, dictUrl.indexOf('{') > -1 ? dictParams : undefined);
  }

  /**
   * 主要是初始化网络请求数据
   * @param props
     */
  initDictData = (props) => {
    const { dictData, dictUrl, fuzzySearch } = props;
    if (!fuzzySearch) {
      // 非模糊搜索模式下的初始化处理
      if (dictData.length) {
        this.setOptions(dictData);
      } else if (dictUrl) {
        const params = this.getUrlParams(props);
        this.api.get(dictUrl, params).then((res) => {
          if (res.code == 200) {
            this.setOptions(res.data.list);
          } else {
            Alert.error(res);
          }
        });
      }
    } else {
      const extUrlParams = {};
      if (!this.isInitFuzzySearch) {
        if (this.props.value) {
          const value = Util.valuesToStrings(this.props.value);
          extUrlParams.value = typeof value === 'string' ? value : value.join(',');
        }
      }
      this.fetchFuzzySearchDictData('', extUrlParams);
    }
  }

  /**
   * 模糊搜索网络查询
   * @param value
     */
  fetchFuzzySearchDictData = (value, extUrlParams = {}) => {
    const { dictUrl, mode, fuzzyName } = this.props;
    const { options } = this.state;

    const fuzzyPropName = _.isFunction(fuzzyName) ? fuzzyName(value) : fuzzyName;
    const pureFuzzyName = this.getPureFuzzyName(fuzzyPropName);
    const urlParams = this.getUrlParams(this.props, {
      [fuzzyPropName]: value, // 根据 input 框的值进行模糊搜索
      orderBy: `${pureFuzzyName},id`,
      pageSize: 8, // 请求数据条数限制
    });
    // 拼凑额外的 url 参数
    // 解决编辑表单中模糊搜索默认数据不包含保存数据导致无法正常显示的bug
    const params = { ...urlParams, ...extUrlParams };

    let cacheOptions = [];
    if (mode === "multiple") {
      //  如果是模糊搜索并且是多选，缓存当前value对应的option，在获取数据之后再拼上
      cacheOptions = this.getCacheOptions();
    }

    options.length && this.setOptions([]); // 如果当前下拉列表有数据则清空

    this.api.get(dictUrl, params)
      .then((res) => {
        if (!this.isInitFuzzySearch) {
          this.isInitFuzzySearch = true; // 第一次请求返回结果之后这个标志位
        }
        let { list = [] } = res.data;
        const opts = _.uniqBy([...list, ...cacheOptions], "id");
        this.setOptions(opts);
      });
  };

  /**
   * 获取模糊搜索纯字段名，eg: name
   */
  getPureFuzzyName = (fuzzyName) => {
    const $index = fuzzyName.indexOf('$');
    return $index > -1 ? fuzzyName.substring(0, $index) : fuzzyName;
  }

  /**
   * 在模糊搜索时，缓存value对应的options，使搜索之后翻译仍然生效
   */
  getCacheOptions = () => {
    let cacheOptions = [];
    let { value: selectValue = [] } = this.props;
    const { options = [] } = this.state;
    // 将 value 内的所有值转成字符串
    selectValue = Util.valuesToStrings(selectValue);
    // 多选,在options找到value对应的翻译，放入缓存中
    options.forEach((option) => {
      if (selectValue.find((item) => { return item == option.id; })) {
        cacheOptions.push(option);
      }
    });
    return cacheOptions;
  }

  /**
   * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
   * @param value string/object/array
     */
  onChange = (value) => {
    // 单选情况下 value 为 string
    // labelInValue 为 true 时 value 为 object { key: '', label: '' }
    // 多选情况下 value 为 array
    logger.log('value:', value, window.event);
    this.props.onChange(value);
  };

  /**
   * 选中某一项触发
   * @param value
   * @param option
   */
  onSelect = (value, option) => {
    logger.log('select:', value);
    this.fuzzySearch = false;
    this.props.onSelect(value, option);
  };

  /**
   * 选中某一项触发
   * @param value
   * @param option
   */
  onBlur = (value) => {
    logger.log('blur:', value);
    this.props.onBlur(value);
  };

  /**
   * 文本框值变化时回调
   * @param value string
     */
  onSearch = (value) => {
    logger.log('searchValue:', value);
    const { fuzzySearch } = this.props;
    // 模糊搜索
    if (fuzzySearch && this.fuzzySearch) {
      this.fetchFuzzySearchDictData(value);
    }
    if (this.fuzzySearch === false) {
      this.fuzzySearch = true;
    }
    this.props.onSearch(value);
  }

  /**
   * 根据过滤条件渲染 Options
   * @returns {Array}
     */
  renderOptions = (options) => {
    let { disabledValues, hiddenValues } = this.props;
    disabledValues = Util.valuesToStrings(disabledValues);
    hiddenValues = Util.valuesToStrings(hiddenValues);

    if ('enabledValues' in this.props) {
      // 如果传入了 enableValues 则重新生成 disabledValues
      let { enabledValues } = this.props;
      disabledValues = [];
      enabledValues = Util.valuesToStrings(enabledValues);
      options.forEach((item) => {
        if (!enabledValues.includes(`${item.id}`)) {
          disabledValues.push(`${item.id}`);
        }
      });
    }

    // 过滤掉隐藏的数据
    if (hiddenValues.length) {
      options = options.filter((item) => {
        return !hiddenValues.includes(`${item.id}`);
      });
    }
    return options.map((item) => {
      const id = `${item.id}`;
      return (
        <Option
          key={id}
          value={id}
          disabled={disabledValues.includes(id)}
        >{item.name}</Option>
      );
    });
  }

  getPopupContainer = () => { return this.refs.selectContainer; }

  /**
   * 供外部获取options的方法
   */
  getOptions = () => {
    return this.state.options;
  }

  render() {
    let { fuzzySearch, notFoundContent, mode, defaultValue, value, defaultSelectFirstOption, preHandleDictData, disabled, id } = this.props;
    let { options } = this.state;

    if (preHandleDictData) {
      options = preHandleDictData(options);
    }

    // 将 defaultValue 内的所有值转成字符串
    defaultValue = Util.valuesToStrings(defaultValue);
    // 将 value 内的所有值转成字符串
    value = Util.valuesToStrings(value);

    // 如果外部没有传入 defaultValue 且 defaultSelectFirstOption 为 true 则会进行默认选中第一项的赋值
    if (_.isUndefined(defaultValue) && defaultSelectFirstOption && _.isObject(options[0])) {
      if (mode === 'multiple' || mode === 'tags') {
        defaultValue = [`${options[0].id}`];
      } else {
        defaultValue = `${options[0].id}`;
      }
    }
    const props = {
      defaultValue,
      onChange: this.onChange,
      onSearch: this.onSearch,
      onSelect: this.onSelect,
      onBlur: this.onBlur,
      ref: this.props.innerRef,
      onInit: this.onInit
    };

    // 当 this.props.value 不为空时才能传入 value 这个字段到 Select 组件, 不然会导致默认显示出 bug
    if (!_.isUndefined(value)) {
      props.value = value;
    }
    return <div
      className={classNames('qx-select', {
        [this.props.className]: this.props.className
      })}
      ref='selectContainer'
      id={id}
    >
      {
        options.length || fuzzySearch && this.isInitFuzzySearch ?
          <Select
            getPopupContainer={this.getPopupContainer}
            {...this.props}
            {...props}
          >
            {this.renderOptions(options)}
          </Select> :
          <Select
            key="empty-select"
            value={value}
            getPopupContainer={this.getPopupContainer}
            notFoundContent={notFoundContent}
            disabled={disabled}
            size={this.props.size}
            placeholder={this.props.placeholder}
          />
      }
    </div>;
  }
}

SelectComponent.propTypes = {
  // ===========Custom-Select==============
  dictData: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  dictKey: React.PropTypes.string,
  dictParams: React.PropTypes.object,
  dictSite: React.PropTypes.string,
  disabledValues: React.PropTypes.array,
  enabledValues: React.PropTypes.array,
  hiddenValues: React.PropTypes.array,
  fuzzySearch: React.PropTypes.bool,
  fuzzyName: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),
  forceUpdateDict: React.PropTypes.bool,
  preHandleDictData: React.PropTypes.func,
  onInit: React.PropTypes.func,                         // 设置初始值时（edit表单），触发事件 - 函数类型
};

SelectComponent.defaultProps = {
  // ===========Custom-Select==============
  dictData: [],
  dictParams: {},
  dictSite: 'auth',
  disabledValues: [],
  hiddenValues: [],
  fuzzySearch: false,
  fuzzyName: 'name$like', // 自定义模糊搜索字段名
  // =============Ant-Select===============
  // mode 默认为单选且不带自动提示
  // 'multiple'(多选)
  // 'tags'(自定义条目)
  // 'combobox'(自动提示,不清除value,所以无需从第一个字符重新进行搜索)
  placeholder: "请选择",
  notFoundContent: "暂无数据",
  size: 'small',
  showSearch: true,
  // 根据显示值与option显示值的比较来过滤
  filterOption: (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
  optionFilterProp: "children", // 默认搜索label值
  optionLabelProp: "children", // 默认均将item.name值回填到输入框中
  onChange: () => { },
  onSearch: () => { },
  onSelect: () => { },
  onBlur: () => { },
  innerRef: () => { }, // 设置ref属性
  onInit: () => { },                                     // 设置初始值时（edit表单），触发事件
};

export default SelectComponent;
