import { observable, action } from 'mobx';
import _ from 'lodash';
import { Alert } from 'components';
import { API } from 'utils';
import ApiConfig from 'config/api';

class Store {
  api;
  uiState;
  sideBar;
  @observable tableKey = '';
  envList = [];

  constructor(uiState, sideBar) {
    this.api = new API('auth');
    this.uiState = uiState;
    this.sideBar = sideBar;
  }

  refreshTable = action(() => {
    this.tableKey = _.uniqueId('table');
  });

  saveEnvList = () => {
    const newEnvListStr = JSON.stringify(this.envList);
    if (newEnvListStr !== localStorage.getItem('envList')) {
      localStorage.setItem('envList', newEnvListStr);
    }
  };

  fetchEnv = () => {
    this.envList = Store.getEnvList();
    this.refreshTable();
  };

  /**
   * 新增环境
   * @param formData
   */
  addEnv = (params) => {
    this.envList.push({ id: `env_${params.name}`, status: 0, ...params });
    Alert.success('添加成功', (close) => {
      close();
      this.sideBar.close();
      this.refreshTable();
    });
  };

  /**
   * 编辑环境
   * @param id
   */
  updateEnv = (params) => {
    const env = _.find(this.envList, (item) => {
      return item.id === params.id;
    });
    _.assign(env, params);
    Alert.success('修改成功', (close) => {
      close();
      this.sideBar.close();
      this.refreshTable();
    });
  };

  /**
   * 删除环境
   * @param id
   */
  deleteEnv = (id) => {
    _.remove(this.envList, (item) => {
      return item.id === id;
    });
    Alert.success('删除成功', (close) => {
      close();
      this.sideBar.close();
      this.refreshTable();
    });
  };

  /**
   * 启用环境
   * @param id
   */
  enableEnv = (id) => {
    this.envList.forEach((item) => {
      if (item.status === 1) item.status = 0;
      if (id === item.id) item.status = 1;
    });
    Alert.success('启用成功', (close) => {
      close();
      this.refreshTable();
    });
  };

  /**
   * 恢复默认环境
   * @param id
   */
  resetEnv = () => {
    this.envList.forEach((item) => {
      if (item.status === 1) item.status = 0;
    });
    Alert.success('已恢复默认', (close) => {
      close();
      this.refreshTable();
    });
  };

  static initEnv() {
    Store.getEnvList().forEach((env) => {
      if (env.status == 1) {
        env.apis.forEach((api) => {
          ApiConfig.domain[api.site] = api.url;
        });
      }
    });
  }

  static getEnvList = () => {
    return JSON.parse(localStorage.getItem('envList') || '[]');
  }
}

export default Store;
