import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Layout, Button, Popconfirm, message, Tabs } from 'antd';
import { ListSelect } from 'components';
import ColumnSortable from './ColumnSortable';
import ExportTable from './ExportTable';
import CONSTANT from './constant';
import Store from './Store';
import UIState from './UIState';
import styles from './index.scss';

const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

// 自定义表列组件
@observer
class CustomTableComponent extends Component {
  /**
   * 1.
   * 2.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.uiState = new UIState();
    this.store = new Store(props.tableId, props.tableColumns, this.uiState);
    this.store.init();
  }

  /**
   * 选中某个模板
   */
  handleSelectTpl = (tpl) => {
    this.uiState.setCurTplIndex(tpl.id); // -1 系统模板
    this.uiState.refeshColumnSortable();
  }

  /**
   * 点击“新增模板按钮”
   */
  handleAddTpl = () => {
    this.uiState.setCurTplIndex(CONSTANT.TPL_NEW); // curIndex = -2 表示新增或复制
    this.uiState.refeshColumnSortable();
  }
  /**
   * 复制模板，点击复制即保存一份复制的数据到 IndexedDB
   * 1. 设置当前的 curTplIndex 为 -2 标记新增（复制）
   * 2. 获取当前模板的数据（通过模板的序号获取当前模板的配置数据），初始化表格列
   */
  handleCopyTpl = (tpl) => {
    this.uiState.setCurTplIndex(CONSTANT.TPL_NEW);
    let copiedTpl;
    if (tpl.id === CONSTANT.TPL_DEFAULT) { // 如果是“默认模板”复制
      let cols = this.props.tableColumns.map((item) => {
        return {
          title: item.title,
          width: item.width,
          show: true
        };
      });
      copiedTpl = {
        columns: cols,
        name: tpl.name
      };
    } else {
      copiedTpl = this.store.customTableConfig.config.tpls[tpl.id];
    }
    const data = {
      tplIndex: CONSTANT.TPL_NEW,
      tpl: {
        name: copiedTpl.name + '副本', // 模板名称
        columns: copiedTpl.columns
      }
    };
    this.store.saveTpl(data);
  }

   /**
   * 删除模板
   * 通过模板的编号删除该模板
   */
  handleDeleteTpl = () => {
    if (this.tpl.id === CONSTANT.TPL_DEFAULT || this.isBeingUsedTpl(this.tpl.id)) {
      message.warning('【默认模板】或【当前使用模板】不可删除！');
      return;
    }
    this.store.customTableConfig.config.tpls.splice(this.tpl.id, 1);
    this.store.saveOrUpdateCustomTableConfig(CONSTANT.ACTION_DEL);
  };

  /**
   * 使用某个模板
   */
  handleUseTpl = (tpl) => {
    this.store.customTableConfig.config.defaultTpl = tpl.id;
    this.store.saveOrUpdateCustomTableConfig(CONSTANT.ACTION_USE);
  }

  /**
   * 对模板管理
   */
  onContextMenuClick = (item, extend) => {
    switch (extend.action) {
      case 'copy':
        this.handleCopyTpl(item);
        break;
      case 'del':
        this.tpl = item;
        break;
      case 'use':
        this.handleUseTpl(item);
        break;
      default:
        logger.log('无效操作');
    }
  }
  /**
   * 正在被使用的模板
   * @param tplId 模板 id
   */
  isBeingUsedTpl = (tplId) => {
    const { customTableConfig } = this.store;
    return customTableConfig && tplId === customTableConfig.config.defaultTpl;
  };

  /**
   * 标记当前使用的模板
   * 1.若只有【默认模板】没有其他自定义模板，则 mark 默认模板表示当前使用默认模板
   */
  _markCurUsedTpl = (item) => {
    if (this.isBeingUsedTpl(item.id)) {
      return 'text-warning';
    } else {
      return '';
    }
  };

  /**
   * 获取用户自定义模板
   * @param tplIndex 根据模板编号获取自定义模板
   */
  _getCustomTpl = (tplIndex) => {
    let tpl;
    if (tplIndex >= 0) { // TODO：add commit
      tpl = this.store.customTableConfig.config.tpls[tplIndex];
    } else if (tplIndex === CONSTANT.TPL_DEFAULT) {
      tpl = {
        name: '默认模板',
        columns: []
      };
    } else { // 新增模板
      tpl = {
        name: '',
        columns: []
      };
    }
    return tpl;
  };

  render() {
    const { tplDictData, tableColumns } = this.store;
    const { key, listKey, curTplIndex, columnSortableKey } = this.uiState;
    const props = {
      tplIndex: curTplIndex, // 若为 -2，则是新增模板，否则是编辑模板
      tpl: this._getCustomTpl(curTplIndex),
      defaultColumns: tableColumns, // 从页面 Table 上获取的 Config.columns 默认配置数据
      key: columnSortableKey, // 刷新
      onSubmit: (data) => { this.store.saveTpl(data); }
    };
    const listSelectProps = {
      onSelect: this.handleSelectTpl,
      listData: tplDictData,
      key: key, // 用于整体刷新
      listKey: listKey, // 用于局部刷新
      contextMenuConfig: {
        onItemClick: this.onContextMenuClick,
        items: [{
          action: 'copy',
          name: '复制'
        }, {
          action: 'del',
          name: (
            <Popconfirm title="确定删除?" onConfirm={this.handleDeleteTpl}>
              删除
            </Popconfirm>
          )
        }, {
          action: 'use',
          name: '使用'
        }]
      },
      listItemConfig: {
        addDiyClass: this._markCurUsedTpl
      }
    };
    return (
      <div className={styles['custom-table-column']}>
        <Tabs>
          <TabPane tab="表格列自定义" key="customColumn">
            <Layout>
              <Sider>
                <ListSelect {...listSelectProps}>
                  <Button type="primary" onClick={this.handleAddTpl}>新建模板</Button>
                </ListSelect>
              </Sider>
              <Content>
                {
                  curTplIndex === undefined ? <span className={styles['area-blank']}>请选择左边</span> : <ColumnSortable {...props}/>
                }
              </Content>
            </Layout>
          </TabPane>
          <TabPane tab="表格数据导出" key="exportData">
            <ExportTable store={this.store}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default CustomTableComponent;
