import { observable, action } from 'mobx';

export default class Store {
  @observable activeKey  //  已打开的面板的key
  constructor(props) {
    const { activeKey, defaultActiveKey } = props;
    this.setActiveKey(activeKey || defaultActiveKey);
  }

  setActiveKey=action((activeKey) => {
    this.activeKey = activeKey;
  })
}
