import React, { Component } from 'react';
import API from 'utils/API';
import { Alert } from 'components';

// 下载组件
class DownloadComponent extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    // const { action, downloadParams, downloadSite, method = 'GET' } = this.props;
    DownloadComponent.downloadFile(this.props);
  };

  /**
   * 下载文件
   * @param action 后台接口
   * @param site 系统服务
   * @param params 下载参数
   */
  static downloadFile = (props) => {
    const { action, downloadSite: site, downloadParams: params, method = "GET", onDownloaded } = props;
    const api = new API(site);
    const url = api._makeURL(action, params, method).url;
    const headers = api._handleHeader();
    // @see https://github.com/react-component/upload/blob/e960a3fc2b6c2a6d1897ab3c89b1fce72e259ed5/src/request.js
    // @see https://segmentfault.com/a/1190000004322487
    // @see https://stackoverflow.com/questions/22724070/prompt-file-download-with-xmlhttprequest

    const saveBlob = (blob, fileName) => {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
    };

    const xhr = new XMLHttpRequest();
    // 设置 xhr 请求的超时时间
    xhr.timeout = 3000;
    // 创建一个 get 请求, 采用异步
    xhr.open(method, url, true);
    xhr.responseType = 'blob';
    // 注册相关事件回调处理函数
    // 如果是 post 请求，添加 content-type 请求头，支持传入数据格式是字符串，即通过 JSON.stringify 将其序列化
    if (method === "POST") {
      xhr.setRequestHeader('content-type', 'application/json');
    }
   // 当请求成功完成时触发
    xhr.onload = function onload() {
      // logger.log('this.status:', this.status);
      let blob = xhr.response;
      if (!xhr.getResponseHeader("Content-Disposition")) return;
      let fileName = xhr.getResponseHeader("Content-Disposition").match(/\sfilename="([^"]+)"(\s|$)/)[1];
      saveBlob(blob, decodeURI(fileName)); // 解码文件名称
    };
    xhr.ontimeout = function ontimeout(e) {
      logger.error(e);
    };
    xhr.onerror = function onerror(e) {
      logger.log(e);
    };

    xhr.onreadystatechange = function onreadystatechange() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 使用 FileReader 将 blob 类型转成 json 类型
        let fr = new FileReader();
        fr.onload = function () {
          let res = JSON.parse(this.result); // 此处 this.result 不可更改, 为 FileReader 内部实现
          if (res.code === 200) return;
          Alert.error(res);
        };
        fr.readAsText(xhr.response);
      }
      if (xhr.readyState === 4 && xhr.status === 201) {
        onDownloaded && onDownloaded();
      }
    };

    // 设置 headers
    for (let h in headers) {
      xhr.setRequestHeader(h, headers[h]);
    }
    // 发送
    if (method === 'GET') {
      xhr.send();
    } else {
      xhr.send(params); // params 数据类型是：JSON.stringify(object)
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: 'inline' }}>
        { this.props.children }
      </form>
    );
  }
}

DownloadComponent.propTypes = {
  action: React.PropTypes.string.isRequired,
  downloadSite: React.PropTypes.string.isRequired,
  downloadParams: React.PropTypes.object,
  onDownloaded: React.PropTypes.fun
};
DownloadComponent.defaultProps = {
  action: '', // 接口 url
  downloadSite: '', // 接口所属系统
  method: "GET",
  downloadParams: {},
  onDownloaded: () => {
    // 下载成功后的回调
  }
};
export default DownloadComponent;
