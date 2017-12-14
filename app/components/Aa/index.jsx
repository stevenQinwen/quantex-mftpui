import React from 'react';
import handlePropsWithBtnCode from '../_util/handlePropsWithBtnCode';

class AaComponent extends React.Component {
  render() {
    let props = handlePropsWithBtnCode(this.props.btnCode);
    return (
      !props.hidden ? (
        <a {...this.props} {...props}>
          {this.props.children}
        </a>
      ) : null
    );
  }
}

export default AaComponent;
