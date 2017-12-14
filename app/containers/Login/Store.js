/**
 * Created by harry on 2017/3/23.
 */
import { hashHistory } from 'react-router';
import moment from 'moment';
import ApiConfig from 'config/api';
import { API, DICT } from 'utils';
import UserStore from 'utils/Store';
import Alert from 'components/Alert';

class Store {
  api;
  qowApi;
  uiState;

  constructor(uiState) {
    this.api = new API('auth');
    this.qowApi = new API('qow');
    this.uiState = uiState;
  }

  login = (params, successCb, errorCb) => {
    this.api.post('/api/v2/users/login', params).then((res) => {
      if (res.code == 200) {
        successCb();
        const { forceUpdatePassword, forceUpdatePasswordMsg, code, token } = res.data;
        // 初始化用户储存
        window.userLocalStore = new UserStore({
          preKey: code
        });
        userLocalStore.setItem('token', token);
        if (forceUpdatePassword) {
          this.uiState.showModfifyForm(forceUpdatePassword, forceUpdatePasswordMsg);
        } else {
          this.fetchServerTime(res.data);
        }
      } else {
        errorCb(res);
      }
    });
  }

  /**
   * 修改密码
   */
  updatePassword = (params, successCb, errorCb) => {
    return this.api.put('/api/v2/users/pwd_update', params).then((res) => {
      if (res.code === 200) {
        successCb();
      } else {
        errorCb(res);
      }
    });
  };

  /**
   * 获取服务器时间
   * @param marketCode 市场 code
   */
  fetchServerTime = (userInfo) => {
    this.api.get('/api/v2/system/current_datetime').then((res) => {
      if (res.code == 200) {
        // 获取服务器时间,如果与客户端的时间差大于60秒,则报错提示
        let diff = Math.abs(new Date().getTime() - res.data.currentDateTime);
        if (diff < 60 * 1000 * 60) { // 改为1小时
          // 将必要的用户信息 userId/userName/roleIds/token/lastLoginTime 保存到 localStorage
          userLocalStore.setItem('userInfo', userInfo);
          userLocalStore.setItem('lastLoginTime', userInfo.loginTime);
          // 将当前登录的用户id保存到原生localStorage中,为了使刷新页面时仍然可获取到userLocalStore对象
          sessionStorage.setItem('userId', userInfo.code);
          // 开启 WebSocket 消息推送
          window.electron && electron.ipcRenderer.send('login-success', {
            userInfo,
            token: userInfo.token,
            loginTime: new Date().getTime(),
            wsUrl: ApiConfig.domain.msgcenter,
            mac: localStorage.getItem('mac') // 如果存在 mac 地址，则主进程建立 websocket 连接的时候以缓存的 mac 地址来建立连接
          });
          // 获取市场相关的交易日期 和 当前系统时间
          this.fetchAllTradeDate(
            [
              DICT.market_code_IB, // 获取银行间当前交易日
              DICT.market_code_SH, // 获取上交所当前交易日
              DICT.market_code_SZ, // 获取深交所当前交易日
              'system_date' // 获取当前系统日期
            ]
          ).then(() => {
            // 跳转首页
            hashHistory.push(`app`);
          });
        } else {
          Alert.error(`客户端时间(${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}) 与服务端时间(${moment(res.data.currentDateTime).format("YYYY-MM-DD HH:mm:ss")}) 不同步, 相差 ${diff / 1000} 秒!`);
        }
      }
    });
  };

  /**
   * 获取市场当前交易日
   * @param marketCode 市场 code
   */
  fetchTradeDate = (marketCode) => {
    return marketCode == 'system_date' ?
      new API('qow').get('/api/v2/date_templets/CAL001/cur_sys_day') :
      this.qowApi.get('/api/v2/trade_dates/{marketCode}', {
        next: 0, // 当前交易日
        marketCode
      }
    );
  };

  /**
   * 获取所有市场交易日期
   * @param marketCodes 所有市场
   */
  fetchAllTradeDate = (marketCodes) => {
    return new Promise((resolve) => {
      const newMarketCodes = marketCodes.map((item) => {
        return this.fetchTradeDate(item);
      });
      Promise.all(newMarketCodes).then((results) => {
        let marketTradeDateMap = new Map();
        marketCodes.forEach((item, index) => {
          const key = marketCodes[index];
          const value = key === 'system_date' ? results[index].data.sysDate : results[index].data.tradeDate;
          marketTradeDateMap.set(key, value);
        });
        userLocalStore.setItem('marketTradeDateMap', marketTradeDateMap);
        resolve();
      }).catch((err) => {
        logger.error("获取交易日失败:", err);
        resolve();
      });
    });
  };
}

export default Store;
