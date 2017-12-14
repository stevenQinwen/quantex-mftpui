---
order: 0,
title: 基本使用
---

基本用法

```jsx
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { Modal } from 'components';
import Demo from './0-basic';

// @observer
// TODO(Sharon)：由于 quantex-design 目前配置暂不支持装饰器（@observer），此处仅用于展示代码，具体使用看用例（0-basic.jsx）
class ModalComponent extends Component {

  modal = new Modal.Store();

  openModal = () => {
    this.modalContent = "确认继续XX操作？";
    this.modal.open('确认框', this.modalContent, {
      width: 500,
      maskCloseable: false,
      onOk: this.handleOk
    });
  };

  handleOk = () => {
    logger.log("继续操作的回调……");
    this.modal.close();
  };

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>open</Button>
        <Modal {...this.modal.props}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo/>
, mountNode);
```