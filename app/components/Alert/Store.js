import { Alert } from 'components';
import { API } from 'utils';

export default class Store {
  api = new API("auth");
  /**
   * 发送错误信息
   */
  sendErrorMessage = (params) => {
    this.api.post("/api/v2/sys_exceptions", params)
      .then((res) => {
        if (res.code === 200) {
          window.alert("发送成功");
        } else {
          Alert.error(res);
        }
      });
  }
}
