/**
 * Created by hegj on 2017/4/7.
 */

const W3CWebSocket = require('websocket').w3cwebsocket;
const ApiConfig = require('config/api');

class WebSocket {
  constructor(site, wsUrl, params = {}) {
    let url = this._makeURL(site, wsUrl, params);
    this._init(url);
  }

  _init(wsUrl) {
    const token = '' + userLocalStore.getItem('token');
    this.client = new W3CWebSocket(wsUrl, [token]);
    this.client.onerror = () => {
      logger.error('Connection Error', wsUrl, arguments);
      if (this.onerror) {
        this.onerror(...arguments);
      }
    };
    this.client.onopen = () => {
      logger.info('Connection Success', wsUrl);
      if (this.onopen) {
        this.onopen();
      }
    };
    this.client.onclose = () => {
      logger.info('Connection Closed', wsUrl);
      if (this.onclose) {
        this.onclose();
      }
    };
    this.client.onmessage = (e) => {
      logger.debug(e);
      if (this.onmessage) {
        let json = JSON.parse(e.data);
        this.onmessage(json);
      }
    };
    this.close = () => {
      this.client.close();
    };
  }

  _makeURL = (site, wsUrl, params) => {
    if (wsUrl.startsWith('ws://') || wsUrl.startsWith('wss://')) {
      // concat search string
      return this._concatSearch(wsUrl, params);
    }
    let returnUrl = '';
    // concat domain base on ApiConfig
    if (site in ApiConfig.domain) {
      returnUrl += ApiConfig.domain[site];
    } else {
      returnUrl += ApiConfig.base + '/' + site;
    }
    // if ApiConfig.domain no a real domain string then create wss domain base on location host info manually
    // location.host ==> 127.0.0.1:8888
    // returnUrl /msgcenter ==> wss://127.0.0.1:8888/msgcenter
    if (!returnUrl.startsWith('ws://') && !returnUrl.startsWith('wss://')) {
      if (location.protocol === 'http:') {
        returnUrl = `ws://${location.host}${returnUrl}`;
      } else {
        returnUrl = `wss://${location.host}${returnUrl}`;
      }
    }
    // concat wsUrl to url
    // wsUrl ==> /event/all
    // returnUrl wss://127.0.0.1:8888/msgcenter ==> wss://127.0.0.1:8888/msgcenter/event/all
    returnUrl += wsUrl;
    // concat search string
    // returnUrl wss://127.0.0.1:8888/msgcenter ==> wss://127.0.0.1:8888/msgcenter/event/all?search=???
    return this._concatSearch(returnUrl, params);
  };

  _concatSearch = (url, params = {}) => {
    let returnUrl = url;
    let searchParams = new URLSearchParams();
    const userInfo = JSON.stringify(userLocalStore.getItem('userInfo'));
    const token = userLocalStore.getItem('token');
    searchParams.append('userInfo', userInfo);
    searchParams.append('token', token);
    if (params) {
      for (let p in params) {
        const paramStr = JSON.stringify(params[p]);
        searchParams.append(p, paramStr);
      }
    }
    // 判断searchParams是否包含字符串信息
    if (searchParams.toString().length > 0) {
      if (returnUrl.includes('?')) {
        returnUrl += '&' + searchParams;
      } else {
        returnUrl += '?' + searchParams;
      }
    }
    return returnUrl;
  }
}
export default WebSocket;
