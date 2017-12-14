/**
 * Created by harry on 2017/3/22.
 */
import { observable, action } from 'mobx';
import API from 'utils/API';
import Alert from 'components/Alert';

// @observable
class Store {
  api;
  sideBar;
  userMenu = [];
  @observable userMenuMap = new Map();
  @observable workbench = [];

  constructor(sideBar) {
    this.api = new API('auth');
    this.sideBar = sideBar;
  }

  setUserMenuMap = action((userMenuMap) => {
    this.userMenuMap = userMenuMap;
  })

  setWorkbench = action((workbench) => {
    this.workbench = workbench;
  });

  fetchMenu = () => {
    const userInfo = userLocalStore.getItem('userInfo');
    this.api.get('/api/v2/users/{id}/menus', { id: userInfo.id }).then((res) => {
      if (res.code === 200) {
        const userMenuMap = new Map();
        this.userMenu = res.data.list.filter((menu) => {
          menu.url && userMenuMap.set(menu.id, menu);
          return menu.url;
        });
        this.setUserMenuMap(userMenuMap);
      }
    });
  }

  fetchWorkbench = () => {
    this.api.list('/api/v2/workbenches/list').then((res) => {
      if (res.code === 200) {
        this.setWorkbench(res.data.list);
      }
    });
  }

  sortWork = (work) => {
    this.api.put('/api/v2/workbenches/sort', work).then((res) => {
      if (res.code === 200) {
        //
      }
    });
  }

  deleteWork = (work) => {
    this.api.delete('/api/v2/workbenches/{id}', work).then((res) => {
      if (res.code === 200) {
        Alert.success('删除成功', (close) => {
          this.fetchWorkbench();
          close();
        });
      } else {
        Alert.error(res);
      }
    });
  }

  addWork = (work) => {
    this.api.post('/api/v2/workbenches', work).then((res) => {
      if (res.code === 200) {
        Alert.success('添加成功', (close) => {
          this.sideBar.close();
          this.fetchWorkbench();
          close();
        });
      } else {
        Alert.error(res);
      }
    });
  }

  updateWork = (work) => {
    this.api.put('/api/v2/workbenches/{id}', work).then((res) => {
      if (res.code === 200) {
        Alert.success('修改成功', (close) => {
          this.sideBar.close();
          this.fetchWorkbench();
          close();
        });
      } else {
        Alert.error(res);
      }
    });
  }
}

export default Store;
