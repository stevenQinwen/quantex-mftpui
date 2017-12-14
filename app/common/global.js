/**
 * 定义 window 全局变量和函数
 * 所有页面打开场景下都会执行的初始化文件
 */
import React from 'react';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import { Modal } from 'antd';
import smalltalk from 'smalltalk/legacy';
import { Alert, SearchTable, CustomTable } from 'components';
import { logger, Store, eventCenter } from 'utils';

const { TableStore } = SearchTable.Table;
const isMainWindow = () => {
  return location.hash === "#/app";
};

// 刷新主页面时确保 userLocalStore 变量依然存在
const userId = sessionStorage.getItem('userId') || '';

const documentTitle = sessionStorage.getItem('documentTitle');
if (documentTitle) {
  document.getElementsByTagName('title')[0].innerText = documentTitle; // set title
}

// 初始化按钮权限 Map
const btnCodeStr = sessionStorage.getItem('btnCode');
const btnCode = btnCodeStr ? JSON.parse(btnCodeStr) : [];
const btnCodeMap = new Map();
btnCode.forEach((item) => {
  btnCodeMap.set(item.code, item);
});

window.btnCodeMap = btnCodeMap;
window.prompt = smalltalk.prompt;
window.logger = logger; // 使用logger替换console
window.userLocalStore = new Store({ preKey: userId }); // 初始化当前用户 localStorage 实例

/**
 * 弹开新窗口
 {
   url: '/page/qtw/inst/OrderExecution/Order',
   //【可选】最好加上，窗口显示的名称(document.title)
   title: '用户管理',
   //【可选】窗口的标识，如果指定了，那么就不允许打开两个相同名字的窗口
   // 所以，如果允许打开多个窗口，则可不传
   name: ''
   //【可选】
   params: {}
 }
 返回值，为true，打开新窗口，为false，已打开该窗口
 */
window.openWindow = (config) => {
  let win = null;
  // 通过主窗口打开新窗口，统一行为
  let winObj = isMainWindow() ? window : window.opener || window;
  let { url, title, name, params } = config;

  if (_.isEmpty(url)) {
    throw new Error('config error');
  }

  if (title) {
    // 打开新窗口前将新窗口标题信息储存到 sessionStorage
    winObj.sessionStorage.setItem('documentTitle', title);
  }
  if (!url.startsWith('http')) {
    if (winObj.process) {
      if (winObj.process.env.REACT_WEBPACK_ENV == 'dev') {
        url = `${location.origin}/#${url}`;
      } else {
        url = `${location.pathname}#${url}`;
      }
    } else {
      url = `${location.origin}/#${url}`;
    }
  }
  if (params) {
    const paramsStr = JSON.stringify(params);
    url += `?params=${paramsStr}`;
  }
  if (name) {
    win = winObj.open(url, name);
    // TODO 加入 name 属性后，下次打开应该自动 focus 窗口
    // TODO 如果需要再加入 isOpen 标志位
  } else {
    win = winObj.open(url);
  }
  winObj.sessionStorage.removeItem('documentTitle'); // 打开新窗口成功后应该移除当前窗口的 documentTitle， 不然当前窗口刷新后会被篡改
  return win;
};

/**
 * #【主界面调用 openTab】以下这个方法也会被 Main.jsx 文件内提供的 window.openTab 覆盖，会在主界面上跳转到对应的 tab，
 * #【在弹出窗口中调用 openTab】则会调用此方法以弹出新窗口的方法显示另外一个tab
 * const config = {
      url: 'qtw/inst/OrderExecution/Order',
      props: {
        params: {}, // 一般是查询参数
        onInit: () => {},
        onComponentDidMount: () => {},
        // 其它方法，想到再加进去
      }
    };
 */
window.openTab = (config) => {
  if (isMainWindow()) {
    window.openMenuByMain({ ...config, type: 'tab' });
  } else {
    // opener ==> 主窗口全局对象
    // 通过主窗口打开菜单，统一行为
    const winObj = window.opener || window;
    winObj.openMenuByMain && winObj.openMenuByMain({ ...config, type: 'win' });
  }
};

/**
 * 获取当前页面链接参数对象
 * @param url [option]
 */
window.getUrlParams = () => {
  const url = window.location.href; // 默认取当前页面链接
  const search = url.split('?')[1];
  const paramsStr = search && search.split('=')[1];
  return paramsStr && JSON.parse(paramsStr) || {};
};

/**
 * 退出系统
 */
window.logout = () => {
  window.electron && electron.ipcRenderer.send('login-out');
  userLocalStore.clearUserLocalStorage();
  // 跳转到登录页
  hashHistory.push(`/`);
  if (!window.electron) {
    // 浏览器端退出时刷新页面。
    location.reload();
  }
};

// TODO 重构成文件 ——harry
// ===============绑定全局快捷键=================
/**
 * 订阅快捷键打开环境配置页面
 */
eventCenter.subscribe(['ctrl+e'], () => {
  window.openWindow({
    url: '/page/system/EnvConfig',
    title: '环境配置',
    name: '环境配置'
  });
});
/**
 * 订阅快捷键打印整条表格行数据
 */
eventCenter.subscribe(['ctrl+p'], (topic, event) => {
  event.preventDefault(); // 阻止浏览器默认打印行为
  if (!TableStore.focusTableId) return;
  const msg = JSON.stringify(TableStore.focusRecord, null, 4).split('\n').map((item, key) => {
    return <span style={{ "white-space": "pre-wrap" }} key={key}>{item + ''}<br/></span>;
  });
  Alert.info({ msg }, { style: { width: 600 } });
});

/**
 * 弹出当前表格列自定义模态框
 * 1. 选中表格一行，按 ctrl+t 获取该表格的 tableId 及其 columns 配置项数据
 * 2. 打开表格自定义模态框对表格列做相应配置
 */
eventCenter.subscribe(['ctrl+t'], (topic, event) => {
  event.preventDefault(); // 阻止浏览器默认行为
  if (!TableStore.focusTableId) return;
  const props = {
    tableId: TableStore.focusTableId,
    tableColumns: TableStore.focusTableColumns
  };
  const title = <div><span>自定义表格（表格ID: {props.tableId})</span><span className="text-danger m-l-18 ">刷新页面后表格自定义设置方可生效。</span></div>;
  window.CustomTableModal = Modal.info({
    prefixCls: 'qx-diy-table',
    title: title,
    content: <CustomTable {...props}/>,
    iconType: null,
    width: 800,
  });
});

/**
 * 退出系统
 */
window.logout = () => {
  window.electron && electron.ipcRenderer.send('login-out');
  userLocalStore.clearUserLocalStorage();
  // 跳转到登录页
  hashHistory.push(`/`);
  if (!window.electron) {
    // 浏览器端退出时刷新页面。
    location.reload();
  }
};
