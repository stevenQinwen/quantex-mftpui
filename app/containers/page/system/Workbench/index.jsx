import React from 'react';
import { observer } from 'mobx-react';
import { Icon, Menu, Dropdown, Popconfirm } from 'antd';
import { SideBar } from 'components';
import WorkForm from './Form';
import Store from './Store';

const styles = require('./index.scss');

@observer
class WorkbenchComponent extends React.Component {

  sideBar = new SideBar.Store();
  store = new Store(this.sideBar);


  componentDidMount() {
    const { fetchMenu, fetchWorkbench } = this.store;
    fetchMenu();
    fetchWorkbench();
  }

  addWork = () => {
    const bar = <WorkForm store={this.store}/>;
    this.sideBar.open('添加工作台', bar);
  }

  updateWork = (work) => {
    const bar = <WorkForm store={this.store} dataSource={work}/>;
    this.sideBar.open('编辑工作台', bar);
  }

  deleteWork = (id) => {
    this.store.deleteWork({ id });
  }

  render() {
    const { userMenuMap, workbench } = this.store;
    return (
      <div className={styles.root}>
        <SideBar {...this.sideBar.props} >
          <div className="qx-main">
            <div className="m-b-8">
              工作台数量：{workbench.length} / <a onClick={this.addWork}>添加工作台</a>
            </div>
            <div className={styles.work}>
              {workbench.map((item) => {
                const menu = (
                  <Menu selectedKeys={[]}>
                    <Menu.Item>
                      <a className="a-status-hover"
                        onClick={() => {
                          this.updateWork(item);
                        }}>编辑工作台</a>
                    </Menu.Item>
                    <Menu.Item>
                      <Popconfirm title="是否删除工作台？" onConfirm={() => { this.deleteWork(item.id); }}>
                        <a className="a-status-hover">删除工作台</a>
                      </Popconfirm>
                    </Menu.Item>
                    <Menu.Item>
                      <a className="a-status-hover"
                        onClick={() => {
                          item.menuIds.split(',').forEach((id) => {
                            window.openTab(userMenuMap.get(id));
                          });
                        }}>打开所有菜单</a>
                    </Menu.Item>
                  </Menu>
                );
                return (
                  <div className={styles.item}>
                    <div className={styles.head} style={{ backgroundColor: item.backgroundColor }}>{item.name}
                      <Dropdown overlay={menu}>
                        <Icon className={styles.icon} type="ellipsis" />
                      </Dropdown></div>
                    <div className={styles.body}>
                      {item.menuIds.split(',').map((id) => {
                        const menuItem = userMenuMap.get(id);
                        if (menuItem) {
                          return (
                            <li key={menuItem.id} onClick={() => {
                              window.openTab(menuItem);
                            }}>{menuItem.name}</li>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SideBar>
      </div>
    );
  }
}

export default WorkbenchComponent;
