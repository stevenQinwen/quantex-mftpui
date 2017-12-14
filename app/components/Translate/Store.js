import { observable, action } from 'mobx';
import _ from 'lodash';
import Alert from 'components/Alert';
import { msgCenter, API, Util } from 'utils';

class Store {

  constructor(config) {
    this.config = config;
    this._fetchError = false; // 创建一个判断请求是否出现错误的标记
    this.api = new API(config.transSite || 'auth');
  }

  @observable dictData = new Map();

  /**
   * 翻译多个字段或一个字段
   * @param dictData
   * @param props
   * @returns {*}
   */
  static translate(dictData, props) {
    let { value, nullValueContent, multiple, separator } = props;
    if (value == null) {
      return nullValueContent;
    }
    value += '';
    if (!dictData.size) {
      return value;
    }
    if (multiple) {
      let labels = value.split(',').map((v) => {
        return Store.translateSingle(dictData, v, nullValueContent);
      });
      return labels.join(separator);
    } else {
      return Store.translateSingle(dictData, value, nullValueContent);
    }
  }

  /**
   * 根据字典进行翻译，无翻译值时返回原始值或 nullValueContent
   * @param dictData
   * @param value
   * @param nullValueContent
   * @returns {*}
   */
  static translateSingle(dictData, value, nullValueContent) {
    const key = _.toString(value); // undefined or null ==> ""
    const label = dictData.get(key);
    if (label !== undefined) {
      return label;
    } else {
      return key.length ? value : nullValueContent;
    }
  }

  initDictData() {
    const { dictData, transUrl } = this.config;
    if (dictData.length) {
      this.existData = true;
      if (_.isMap(dictData)) {
        this.setDictData(dictData);
      } else {
        const tempMap = new Map();
        dictData.forEach((item) => {
          tempMap.set(`${item.id}`, item.name);
        });
        this.setDictData(tempMap);
      }
    } else {
      if (!transUrl) return;
      const params = this.getUrlParams(this.config);
      this.api.get(transUrl, params).then((res) => {
        if (res.code == 200) {
          let tempMap = new Map();
          res.data.list.forEach((item) => {
            tempMap.set(`${item.id}`, item.name);
          });
          // 成功请求数据标志位
          this.existData = true;
          this.setDictData(tempMap);
        } else {
          // 请求失败时设置为true
          this._fetchError = true;
          Alert.error(res);
        }
      });
    }
  }

  setDictData = action((dictData) => {
    this.dictData = dictData;
  })

  updateDictData() {
    this.initDictData();
  }

  getUrlParams = (config) => {
    return {
      dictKey: config.transKey,
      query: Util.buildFilterParams(config.transParams)
    };
  }

  static getInstance(config) {
    const { dictData, transUrl, transKey, transParams } = config;
    let key = '';
    if (dictData && dictData.length) {
      key = Util.generateHash(JSON.stringify(dictData));
    } else {
      key = transUrl + transKey + JSON.stringify(transParams);
    }
    let instanceMap = Store.instanceMap;
    let store = instanceMap.get(key);
    if (store) {
      let initialized = true;
      // 如果存在实例但是缓存数据字典为空，且this._fetchError=true
      // 将 shouldFetchAgain 标志位置为 true，这样组件会重新请求数据
      if (store._fetchError && store.dictData.size === 0) {
        initialized = false;
        store._fetchError = false;
      }
      return {
        initialized,
        store
      };
    } else {
      store = new Store(config);
      instanceMap.set(key, store);
      return {
        store
      };
    }
  }
}

Store.instanceMap = new Map();
// 当有新的翻译字典需要缓存时，绑定一个可以通过事件删除缓存 key 的事件给外部使用
// 用于重新缓存翻译字典的数据
// 由【params.url】以及【params.key】组成通配的事件名
Store.eventToken = msgCenter.subscribe('retranslate', (topic, params) => {
  const instanceMap = Store.instanceMap;
  [...instanceMap.keys()].forEach((instanceKey) => {
    if (instanceKey.includes(params.url + params.key)) {
      instanceMap.delete(instanceKey);
    }
  });
});

export default Store;
