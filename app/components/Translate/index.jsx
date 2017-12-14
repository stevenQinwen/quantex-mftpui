import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';

@observer
class TranslateComponent extends React.Component {

  constructor(props) {
    super(props);
    const { ...config } = props;
    const instance = Store.getInstance(config);
    this.store = instance.store;
    this.storeInitialized = instance.initialized;
  }

  componentDidMount() {
    // 如果为实例绑定的store里不存在缓存数据则进行初始化缓存数据
    !this.storeInitialized && this.store.initDictData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceUpdateTrans) {
      this.store.updateDictData();
    }
  }

  /**
   * 如果 props 有变化不会直接造成组件重新 render
   * @returns {boolean}
     */
  shouldComponentUpdate(nextProps) {
    if (!this.store.existData) return true;
    return this.props.value !== nextProps.value;
  }

  componentDidUpdate() {
    this.props.onUpdated();
  }

  render() {
    const { showTitle } = this.props;
    let text = Store.translate(this.store.dictData, this.props);
    let props = {
      className: this.props.className
    };
    showTitle && (props.title = text);
    return (
      <span {...props}>
        {text}
      </span>
    );
  }
}

TranslateComponent.propTypes = {
  dictData: React.PropTypes.array,
  transUrl: React.PropTypes.string,
  transKey: React.PropTypes.string,
  transParams: React.PropTypes.object,
  transSite: React.PropTypes.string,
  forceUpdateTrans: React.PropTypes.bool,
  multiple: React.PropTypes.bool,
  separator: React.PropTypes.string,
  showTitle: React.PropTypes.bool,
  onUpdate: React.PropTypes.func
};
TranslateComponent.defaultProps = {
  localUniqueId: '', // 如果是直接传入翻译字典数据, 则需要此项来区分是不一样的本地翻译字典
  dictData: [],
  transUrl: '',
  transKey: '',
  transParams: {},
  transSite: 'auth',
  separator: '/',
  nullValueContent: '--',
  showTitle: false, // 用于展示翻译的title
  onUpdated: () => {}
};

export default TranslateComponent;
