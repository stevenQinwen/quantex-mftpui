import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import moment from 'moment';
import { AppContainer } from 'react-hot-loader';
import msgCenter from 'utils/MsgCenter';
import EnvConfigStore from 'containers/page/system/EnvConfig/Store';
import RootContainer from './Router';

require('common/global'); // 引入自定义的window全局变量和函数
require('normalize.css/normalize.css');
require('smalltalk/css/smalltalk.css');
require("styles/index.scss"); // 引入框架样式文件
require('styles/core/tools/iconfont/font/iconfont');
require('styles/core/tools/iconfont/index.css'); // 引入覆盖font/iconfont.less文件样式类 文件

useStrict(true); // 强制所有对mobx-store的更改都得通过action
EnvConfigStore.initEnv();

// 监听main process里发出的message
if (window.electron) {
  const { ipcRenderer } = electron;
  ipcRenderer.on('asynchronous-reply', (event, resultObj, sysInfo) => {
    resultObj.data = resultObj.data || { msgType: 'unknown' };
    logger.info('------------------ msgCenter ------------------');
    logger.info(`register :  [${moment(sysInfo.loginTime).format('YYYY-MM-DD HH:mm:ss')}]`);
    logger.info(`publish  :  [${moment().format('YYYY-MM-DD HH:mm:ss')}]`);
    logger.info(`msgType  :  [${resultObj.data.msgType}]`);
    logger.info(`result   : `, resultObj);
    logger.info('-----------------------------------------------');
    msgCenter.publish(resultObj.data.msgType, resultObj.data); // 发布消息
  });
  ipcRenderer.on('websocket-open', () => {
    logger.info('websocket connect success');
    // 清空msgCenter中的消费者
    msgCenter.reset();
  });
  ipcRenderer.on('websocket-error', (event, error) => {
    logger.error('websocket connect fail', error);
    // 清空msgCenter中的消费者
    msgCenter.reset();
  });
  ipcRenderer.on('new-window', (event, config) => {
    window.openWindow(config);
  });
  ipcRenderer.on('update-msg', (event, text) => {
    console.log(text);
  });
  // 存储从主进程获取的 macAddress
  ipcRenderer.on('store-mac-address', (event, macAddress) => {
    console.log('mac', macAddress);
    localStorage.setItem('mac', macAddress);
  });
  // send
  // 如果本地储存里没有mac地址，向主进程获取
  if (!localStorage.getItem('mac')) {
    ipcRenderer.send('gain-mac-address');
  }
}

const render = (Component) => {
  ReactDOM.render((
    <AppContainer>
      <Component/>
    </AppContainer>
  ), document.getElementById('app'));
};

// load app
render(RootContainer);

if (module.hot) {
  // when HMR is enabled. react-hot-loader will reload app.
  module.hot.accept('./Router.jsx', () => {
    const NextRootContainer = require("./Router").default;
    render(NextRootContainer);
  });
  // TODO This is a react-router bug when work with react-hot-loader
  // override the console.error, and filter the warning out.
  // It's only included when HMR is enabled.
  // disabled log error 'You cannot change <Router routes>;'
  const orgError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1 && typeof args[0] === "string" && args[0].indexOf('You cannot change <Router routes>;') > -1) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
}
