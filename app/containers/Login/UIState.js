import { observable, action } from 'mobx';

class UIState {
  @observable showModify = false; // 是否显示 新增按钮 部分
  forceUpdatePasswordMsg = ''; // 强制用户修改密码提示语

  showModfifyForm = action((flag, msg) => {
    this.showModify = flag;
    this.forceUpdatePasswordMsg = msg;
  })

  closeModifyForm = action(() => {
    this.showModify = false;
    this.forceUpdatePasswordMsg = '';
  });
}

export default UIState;
