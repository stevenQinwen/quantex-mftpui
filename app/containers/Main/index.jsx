import React from 'react';
import { hashHistory, Link } from 'react-router';
import { Row, Icon, Avatar, Layout, Menu } from 'antd';
import { SideBar } from 'components';
import { observer } from 'mobx-react';
// import echarts from 'echarts/lib/echarts';
import styles from './index.scss';
// import echartsTheme from './infographic.json';

// echarts.registerTheme('mftp', echartsTheme);

const { Content, Sider } = Layout;

@observer
class MainContainerComponent extends React.Component {
  sideBar = new SideBar.Store();
  /**
   * 退出系统
   */
  logout = () => {
    userLocalStore.clearUserLocalStorage();
    // 跳转到登录页
    hashHistory.push(`/`);
  }

  selectMenu = ({ key }) => {
    hashHistory.push(key);
  }

  render() {
    const { children, location } = this.props;
    return (
      <Layout className={styles.root}>
        <Row type="flex" className={styles.header} justify="space-between">
          <Link to="page">
            <div className="logo-img" />
          </Link>
          <Row type="flex" align="middle">
            <Avatar src="images/nav_mask.png" icon="user" size="small" />
            <Icon type="tuichu" className="m-l-16 exit-btn" onClick={this.logout} />
          </Row>
        </Row>
        <Layout className={styles.content}>
          <Sider width={200} style={{ background: '#fff', padding: 0 }} className="shadow-box">
            <p className="menu-title">货基申赎预测引擎</p>
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              style={{ height: '100%' }}
              className={styles.menu}
              onSelect={this.selectMenu}
            >
              <Menu.Item key="/app/EngineDesign" ><Icon type="setting" />引擎设计</Menu.Item>
              <Menu.Item key="/app/ModelPerformance"><Icon type="setting" />模型表现</Menu.Item>
              <Menu.Item key="/app/ModelParams"><Icon type="setting" />模型参数</Menu.Item>
              <Menu.Item key="/app/UserAnalysis"><Icon type="setting" />用户分析</Menu.Item>
              <Menu.Item key="/app/DataInsight"><Icon type="setting" />数据洞察</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: 20 }}>
            <Content>
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default MainContainerComponent;
