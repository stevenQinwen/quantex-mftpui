import Util from 'utils/util';
import Spin from 'components/Spin';
import Alert from 'components/Alert';

const ApiConfig = require('config/api');

class API {
  constructor(props) { // 例如 {site: 'auth'}
    if (props !== undefined) {
      if (typeof props === 'string') {
        this._config = { site: props };
      } else {
        this._config = Object.assign({}, props);
      }
    } else {
      this._config = {};
    }
    const curPageUrl = sessionStorage.getItem('curPageUrl') || 'mainpage';
    this.spin = Spin.getInstance(curPageUrl);
  }

  setBase(base) {
    this._config.base = base;
    return this;
  }

  setSite(site) {
    this._config.site = site;
    return this;
  }

  setUrlPrefix(prefix) {
    this._config.urlPrefix = prefix;
    return this;
  }

  /**
   * 解析所有带{},用正则解析,替换成正确的值
   * @param url
   * @param params
   * @private
   * @return url
   */
  _replaceUrl(url, params) {
    // 1. 解析所有带{},用正则解析
    // 2. 取出{}中的值，然后去params找对应的值（没有则console.error报错）
    // 然后值替换，并删除params对应属性
    let matchList = url.match(/\{[a-zA-Z]+\}/g) || [];
    matchList.forEach((p) => {
      let key = p.replace('{', '').replace('}', '');
      if (key in params) {
        url = url.replace(p, params[key]);
        delete params[key]; // 替换完成删除 params 中对应变量
      } else {
        console.error('require param "' + key + '"not found');
      }
    });
    return url;
  }

  /**
   * 构造请求URL
   * @param url    请求部分的url
   * @param params 请求参数
   * @param method 请求方法 {GET/POST/...}
   * @returns {*}
   * @private
   */
  _makeURL(url, params, method) {
    // 深拷贝会被函数修改到的参数
    let paramsCopy = JSON.parse(JSON.stringify(params));
    if (url.includes('http')) { // 已经是绝对路径了，则无需处理
      return {
        url,
        params
      };
    }
    // http://localhost:8080/auth/v2/users/{id} GET
    let { site, urlPrefix } = this._config;
    let returnUrl = '';
    if (site) {
      if (site in ApiConfig.domain) {
        returnUrl += ApiConfig.domain[site]; // http://localhost:8080/auth
      } else {
        returnUrl += ApiConfig.base + '/' + site; // http://10.16.18.65:8080/auth
      }
    } else {
      returnUrl += ApiConfig.base;
    }
    // https://10.0.74.200/auth
    if (urlPrefix) {
      returnUrl += '/' + urlPrefix;
    }
    // 拼接接口具体url  // https://10.0.74.200/auth/api/v2/menus/{id}
    returnUrl += url;

    // https://10.0.74.200/auth/api/v2/menus/1
    returnUrl = this._replaceUrl(returnUrl, paramsCopy);

    // https://10.0.74.200/auth/api/v2/menus/1?a=123
    if (method === 'GET') {
      // 来拼接剩余请求参数
      let searchParams = new URLSearchParams();
      for (let p in paramsCopy) {
        const value = paramsCopy[p];
        const paramStr = typeof value === 'string' ? value : JSON.stringify(value);
        searchParams.append(p, paramStr);
      }
      // 判断searchParams是否包含字符串信息
      if (searchParams.toString().length > 0) {
        if (returnUrl.includes('?')) {
          returnUrl += '&' + searchParams;
        } else {
          returnUrl += '?' + searchParams;
        }
      }
    }
    return {
      url: returnUrl,
      params: paramsCopy
    };
  }

  /**
   * 远程接口调用，增加jwt-user-info参数
   * @param url
   * @param userInfo
   * @returns returnUrl
   * 如果类型为对象，则增加jwt-user-info属性，
   * 如果类型为字符串（目前需要传入URL），拼接jwt-user-info到URL参数
   */
  // _handleURL(url) {
  //   let returnUrl = url;
  //   if (ApiConfig.isDebug) {
  //     const searchParams = new URLSearchParams();
  //     const userInfo = JSON.stringify(userLocalStore.getItem('userInfo'));
  //     searchParams.append('userInfo', userInfo);
  //     if (returnUrl.indexOf('?') > -1) {
  //       returnUrl += "&" + searchParams;
  //     } else {
  //       returnUrl += "?" + searchParams;
  //     }
  //   }
  //   return returnUrl;
  // }
  /**
   * 增加token请求验证头,在debug模式下,增加jwt-user-info属性
   * @returns {*}
   * @private
   */
  _handleHeader() {
    const token = 'Bearer ' + userLocalStore.getItem('token');
    const { id, userId, roleIds, companyId } = JSON.stringify(userLocalStore.getItem('userInfo'));
    const mac = localStorage.getItem('mac');
    const header = ApiConfig.isDebug ? {
      'Authorization': token,
      // TODO wait remove
      'Jwt-User-Info': {
        id,
        userId,
        roleIds,
        companyId
      }
    } : {
      'Authorization': token
    };
    // 添加 mac 地址头部供后端校验登陆设备，如果不存在 mac 地址则不加
    mac && (header.mac = mac);
    return header;
  }

  /**
   * 调用请求
   * @param url    请求部分url
   * @param params 请求参数
   * @param method 请求方法 {GET/POST/...}
   * @param config
   * @returns {Promise}
   * @private
   */
  _request(url, params, method, config) {
    logger.debug('request:', url, params, method, config);
    config.loading && this.spin.showLoading(); // 开启 Loading 效果
    const disableSubmitAgain = method === 'POST' || method === 'PUT';
    let submitBtns;
    // 提交表单时，禁用提交按钮防止二次提交
    if (disableSubmitAgain) {
      submitBtns = document.querySelectorAll('.page-container-visible .side-bar button[type="submit"], .page-container-visible .js-submit'); // 侧边栏中的 submit 按钮 & 指令创建页的 submit 按钮
      submitBtns.forEach((btn) => {
        btn.disabled = true;
      });
    }

    let request = null;
    let urlInfo = this._makeURL(url, params, method);
    let reqUrl = urlInfo.url;
    let timeout = config.timeout || this._config.timeout; // 当前请求包含超时设置时使用当前超时时间
    const restParams = urlInfo.params; // 传递处理剩下的 restParams 给除了 GET 请求外的其他请求作为 body 的内容对象
    const isLoginAction = url.includes('/api/v2/users/login');
    const headers = new Headers();

    logger.info(method, urlInfo.url);
    if (!config.multipart) {
      headers.append("Content-Type", "application/json");
    }

    if (!isLoginAction) {
      // 除登陆请求外的所有请求处理
      // 增加 token 验证头部
      let header = this._handleHeader();
      for (let p in header) {
        headers.append(p, header[p]);
      }
    } else {
      // 登陆请求处理
      // 添加 mac 地址头部供后端校验登陆设备，如果不存在 mac 地址则不加
      const mac = localStorage.getItem('mac');
      mac && headers.append("mac", mac);
    }

    if (ApiConfig.isDebug) {
      // 开发模式下，在 url 末尾传递 _site 字段供代理服务进行处理
      if (urlInfo.url.includes('?')) {
        reqUrl += `&_site=${this._config.site}`;
      } else {
        reqUrl += `?_site=${this._config.site}`;
      }
      // 开发模式下更改url将请求发送到本地代理服务器 http://localhost:8001
      const reg = new RegExp(/^https?:\/\/[\w]+(\.[\w]+)+(:[0-9]+)?\//);
      const result = reqUrl.match(reg);
      reqUrl = reqUrl.replace(result[0], ApiConfig.proxyServer);
      headers.append("site", this._config.site);
    }

    if (method === 'GET') {
      request = new Request(reqUrl, {
        headers: headers,
        method: method
      });
    } else {
      request = new Request(reqUrl, {
        headers: headers,
        body: config.multipart === true ? params : JSON.stringify(restParams),
        method: method
      });
    }

    let st = null;
    let promise = new Promise((resolve) => {
      fetch(request)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((json) => {
          logger.debug('----response start-------');
          logger.info(url, params, json);
          logger.debug('----response end-------');
          st && clearTimeout(st); // 成功时取消超时返回
          resolve(json);
        })
        .catch((error) => {
          logger.error('Request failed', url, params, error);
        })
        .finally(() => {
          // 移除加载框
          config.loading && this.spin.hideLoading();
          // 恢复被禁用的提交按钮
          if (disableSubmitAgain) {
            submitBtns.forEach((btn) => {
              btn.disabled = false;
            });
          }
        });
    });

    if (timeout !== -1) {
      // 以下代码处理请求超时
      // 实现原理是通过 Promise.race 来比较超时 Promise 与 原始 Promise 哪个最快返回
      // 最快返回的将清除另一个未返回的 Promise, 达到请求超时的效果
      let abortFn = null;
      const abortDelay = timeout || 60 * 1000;
      const timeoutAlertCls = 'alert-timeout';

      // 通过 Alert.wrappedAlert 函数预先将 alertContainer 保存起来
      // 让超时请求弹出框在初始化超时请求的页面弹出
      const alertFn = Alert.wrappedAlert(Alert.error);
      const { container: alertContainer } = alertFn;
      let abortPromise = new Promise((resolve, reject) => {
        abortFn = () => {
          // 请求结束,关闭 Loading 效果
          config.loading && this.spin.hideLoading();
          // 手动调起 promise reject 方法
          reject({
            code: 500,
            msg: `请求超时,请重试(${abortDelay}ms)`
          });
        };
      }).then(() => {
      }).catch((res) => {
        // 已存在超时请求弹框，不继续弹出
        if (alertContainer.querySelectorAll(`.${timeoutAlertCls}`).length) return;
        alertFn(res, { className: timeoutAlertCls });
      });
      // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
      const abortablePromise = Promise.race([promise, abortPromise]);
      st = setTimeout(abortFn, abortDelay); // 默认一分钟超时
      return abortablePromise;
    } else {
      return promise;
    }
  }

  /**
   * @url URL
   * @params 参数，可选
   */
  get(url, params, config) {
    return this._request(url, params || {}, 'GET', Object.assign({ loading: false }, config));
  }

  post(url, params, config) {
    return this._request(url, params || {}, 'POST', Object.assign({ loading: true }, config));
  }

  put(url, params, config) {
    return this._request(url, params || {}, 'PUT', Object.assign({ loading: true }, config));
  }

  delete(url, params, config) {
    return this._request(url, params || {}, 'DELETE', Object.assign({ loading: true }, config));
  }

  /**
   * 需要分页的查询
   * @param url
   * @param params
   * @returns {*}
   */
  query(url, params = {}) {
    url = this._replaceUrl(url, params);
    let _params = Util.buildFilterParams(params);
    return this.get(url, { query: _params });
  }

  /**
   * 带有查询的功能，但是不需要分页，且一般是精确查询，接口参数是固定的
   * @param url
   * @param params
   * @returns {*}
   */
  list(url, params = {}) {
    url = this._replaceUrl(url, params);
    let _params = Util.buildFilterParams(params);
    return this.get(url, { query: _params });
  }
}

export default API;
