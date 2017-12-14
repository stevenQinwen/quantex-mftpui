import { message } from 'antd';
import { wrapperTableName } from 'utils/IndexedDB';
import CONSTANT from './constant';

const dbUtil = wrapperTableName(CONSTANT.T_CUSTOM_TABLE); // 注册访问 IndexedDB 接口对象

class Store {
  constructor(tableId, tableColumns, uiState) {
    this.tableId = tableId;
    this.tableColumns = tableColumns; // 保存从页面 Table 中获取到的 config.columns
    this.uiState = uiState;
  }

  init = () => {
    this.initTplDictData();
  };

  /**
   * 初始化模板数据
   * 1. 先默认加入一条‘默认模板’对应的 value，即{id: -1, name: ‘默认模板’}
   * 2. 从 IndexedDB 中获取用户对该表添加的配置项
   */
  async initTplDictData() {
    this.tplDictData = []; // tpl 列表数据
    this.tplDictData.push({
      id: CONSTANT.TPL_DEFAULT, // 默认模板
      name: '默认模板'
    });
    let customTableConfig = await dbUtil.getDataByKey(this.tableId) || {
      id: this.tableId,
      config: {
        defaultTpl: CONSTANT.TPL_DEFAULT,
        tpls: []
      }
    };
    this.customTableConfig = customTableConfig;

    customTableConfig.config.tpls.forEach((item, index) => {
      this.tplDictData.push({
        id: index,
        name: item.name
      });
    });
    this.uiState.refreshListSelect(); // 刷新 listSelect 组件
  }
  saveTpl = (tpl) => {
    if (this._isUniqueTplName(tpl)) {
      message.warning('模板名称不能重复');
      return;
    }
    let actionType = ''; // 操作类型
    if (tpl.tplIndex == CONSTANT.TPL_NEW) { // 新增或复制均为“-2”
      let len = this.tplDictData.length;
      this.tplDictData.push({
        id: len - 1,
        name: tpl.tpl.name
      });
      this.customTableConfig.config.tpls.push(tpl.tpl);
      actionType = CONSTANT.ACTION_ADD;
    } else { // 修改
      this.tplDictData[tpl.tplIndex + 1].name = tpl.tpl.name;
      this.customTableConfig.config.tpls[tpl.tplIndex] = tpl.tpl;
      actionType = CONSTANT.ACTION_EDIT;
    }
    this.saveOrUpdateCustomTableConfig(actionType);
  };

  /**
   * 模板名称是否唯一
   * @param tpl 新模板
   */
  _isUniqueTplName = (tpl) => {
    let tplNames = [];
    this.tplDictData.forEach((item) => {
      if (tpl.tplIndex == CONSTANT.TPL_NEW) { // 新增
        tplNames.push(item.name);
      } else {
        if (item.id !== tpl.tplIndex) { // 编辑
          tplNames.push(item.name);
        }
      }
    });
    return tplNames.includes(tpl.tpl.name);
  }

  /**
   * 更新 IndexedDB 中的 customTableConfig
   * 1. 若执行‘新增’或‘复制’或‘删除’，则全局刷新
   * 2. 若执行’编辑‘或’使用‘操作，则局部刷新
   */
  saveOrUpdateCustomTableConfig = (actionType) => {
    let that = this;
    dbUtil.getDataByKey(this.tableId).then((result) => {
      if (result == undefined) {
        dbUtil.insertData(this.customTableConfig).then(() => {
          that._refresh();
        });
      } else {
        dbUtil.updateData(this.customTableConfig).then(() => {
          if (actionType == CONSTANT.ACTION_EDIT || actionType == CONSTANT.ACTION_USE) {
            that._refrshPartly();
          } else {
            that._refresh();
          }
        });
      }
    });
  }

  /**
   * 保存成功后的反馈信息
   * 1. 刷新 listSelect
   * 2. 清空右边右侧 columnList 内容
   */
  _refresh = () => {
    message.success('操作成功!');
    this.initTplDictData();
    this.uiState.setCurTplIndex(undefined);
  }
  // 局部刷新，仅刷新 listSelect 数据，不刷新状态
  _refrshPartly = () => {
    message.success('操作成功!');
    this.uiState.refreshListSelectPartly();
  }
}

export default Store;
