import { observable, action } from 'mobx';
import _ from 'lodash';

class UIState {
  @observable curTplIndex = undefined; // 若没有选中，则为 undefined
  @observable key = 0; // 当新增模板的时候，需要刷新 listSelect 组件（即数据和状态均刷新）
  @observable listKey = 0; // 当编辑的时候，仅更换 listSelect 组件数据，保留选中状态
  @observable columnSortableKey = 0; // 可拖拽列组件的 key

  setCurTplIndex = action((index) => {
    this.curTplIndex = index;
  });

  // listSelect 组件整体刷新，数据和状态均刷新
  refreshListSelect = action(() => {
    this.key = _.uniqueId('key');
  });

  // listSelect 组件部分刷新，仅刷新数据
  refreshListSelectPartly = action(() => {
    this.listKey = _.uniqueId('list_key');
  });

  refeshColumnSortable = action(() => {
    this.columnSortableKey = _.uniqueId('ColumnSortable');
  });
}

export default UIState;
