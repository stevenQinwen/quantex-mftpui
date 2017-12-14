import { observable, action } from 'mobx';
import _ from 'lodash';

class UiState {
  @observable siteItemKeys = []; // 字典子项对应 key 值, 即:[{ key: 0 }, { key: 1 }]

  setSiteItemKeys = action((keys) => {
    this.siteItemKeys = keys;
  });

  // 添加字典子项
  addSiteItem = action(() => {
    const lastItem = _.last(this.siteItemKeys);
    const lastKey = lastItem ? lastItem.key : 0;
    this.siteItemKeys.push({
      key: lastKey + 1
    });
  });

  /**
   * 移除字典子项
   * @params key 被移除子项对应 key
   */
  removeSiteItem = action((key) => {
    _.remove(this.siteItemKeys, (item) => {
      return item.key === key;
    });
  });
}

export default UiState;
