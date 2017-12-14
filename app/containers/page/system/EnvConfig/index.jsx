import React, { Component } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Button, Popconfirm, Table, Tooltip, Icon } from 'antd';
import { SideBar } from 'components';
import EnvForm from './Form';
import Store from './Store';
import UIState from './UIState';

/**
 * 字典管理组件
 */
@observer
class EnvConfigComponent extends Component {

  uiState = new UIState();
  sideBar = new SideBar.Store();
  store = new Store(this.uiState, this.sideBar);

  componentDidMount() {
    this.store.fetchEnv();
    // 监听窗口刷新
    window.addEventListener('beforeunload', this.store.saveEnvList);
  }

  handleEnableEnv = (env) => {
    this.store.enableEnv(env.id);
  };

  handleResetEnv = () => {
    this.store.resetEnv();
  };

  /**
   * 添加环境表单
   */
  showAddForm = () => {
    const bar = <EnvForm store={this.store}/>;
    this.sideBar.open('新增环境', bar);
  };

  /**
   * 编辑环境表单
   */
  showEditForm = (env) => {
    const bar = <EnvForm dataSource={env} store={this.store}/>;
    this.sideBar.open("编辑环境", bar);
  };

  /**
   * 删除环境
   * @param record
   */
  handleDeleteEnv = (env) => {
    this.store.deleteEnv(env.id);
  };

  expandedRowRender = (record) => {
    const columns = [{
      title: '服务名',
      dataIndex: 'site'
    }, {
      title: '服务地址',
      dataIndex: 'url'
    }];

    return (
      <Table
        columns={columns}
        size="small"
        dataSource={record.apis}
        pagination={false}
      />
    );
  };

  render() {
    const { envList, tableKey } = this.store;
    const env = _.find(envList, (item) => {
      return item.status === 1;
    });
    const columns = [{
      title: '环境名称',
      dataIndex: 'name'
    }, {
      title: '描述',
      dataIndex: 'remark'
    }, {
      title: '当前状态',
      dataIndex: 'status',
      render: (text) => {
        return text === 1 ? '启用' : '禁用';
      }
    }, {
      title: '操作',
      dataIndex: '',
      render: (text, record) => {
        return (
          <span>
            <a onClick={() => { this.handleEnableEnv(record); }} disabled={record.status === 1}>启用</a>
            <span className="ant-divider" />
            <a onClick={() => { this.showEditForm(record); }}>编辑</a>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => { this.handleDeleteEnv(record); }}>
              <a className="text-danger">删除</a>
            </Popconfirm>
          </span>
        );
      }
    }];
    return (
      <div>
        <SideBar {...this.sideBar.props}>
          <div className="qx-main">
            <div className="m-b-8">
              <Button size="small" type="primary" onClick={this.showAddForm}>新增环境</Button>
              <Button style={{ margin: '0 8px' }} size="small" type="primary" onClick={this.handleResetEnv}>使用默认</Button>
              当前使用环境：{env ? env.name : '默认'}
              <Tooltip title='更换环境后请关闭配置页面，退出登录并刷新页面之后重新登录'><Icon type='info-circle' style={{ 'verticalAlign': '-1px' }} className="m-l-8" /></Tooltip>
            </div>
            <Table
              tableKey={tableKey}
              size="small"
              pagination={false}
              dataSource={envList}
              columns={columns}
              expandedRowRender={this.expandedRowRender}
              rowKey={(record) => {
                return record.id;
              }}/>
          </div>
        </SideBar>
      </div>
    );
  }
}

export default EnvConfigComponent;
