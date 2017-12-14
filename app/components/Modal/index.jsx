import React from 'react';
import { Modal } from 'antd';
import Store from './Store';

require('./index.scss');

class ModalComponent extends React.Component {
  render() {
    const { content, ...extProps } = this.props;
    return (
      <Modal {...extProps}>
        {content}
      </Modal>
    );
  }
}

ModalComponent.Store = Store;
export default ModalComponent;
