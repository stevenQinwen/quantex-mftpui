import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { Modal } from 'components';

@observer
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
      <div className="content">
        <h1>普通用法</h1>
        <code>{`<Modal {...this.modal.props}/>`}</code>
        <Button type="primary" onClick={this.openModal}>open</Button>
        <Modal {...this.modal.props}/>
      </div>
    );
  }
}

export default ModalComponent;
