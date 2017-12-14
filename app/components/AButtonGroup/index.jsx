import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import handlePropsWithBtnCode from '../_util/handlePropsWithBtnCode';

const MenuItem = Menu.Item;

/**
 * 带权限的操作按钮组
 * @class AButtonGroupComponent
 * @extends {React.Component}
 */
class AButtonGroupComponent extends React.Component {
  render() {
    let hidden = false;
    let children = null;
    let vaildChildren = []; // 有权限的 children
    React.Children.forEach(this.props.children, (child) => {
      if (child === null) return;
      // 根据每个 children 的 btnCode 属性来判断是否无权限
      const hiddenButton = handlePropsWithBtnCode(child.props.btnCode).hidden;
      if (!hiddenButton) {
        vaildChildren.push(child);
      }
    });
    switch (vaildChildren.length) {
      case 0:
        hidden = true;
        break;
      case 1: // one child
        children = vaildChildren;
        break;
      case 2: // add a divider between two child
        vaildChildren.splice(1, 0, <span className="ant-divider" />);
        children = vaildChildren;
        break;
      default: // display more button when more than two child
        let [first, ...more] = vaildChildren;
        children = [first, <span className="ant-divider" />];
        let menu = (<Menu>
          {
            // FIXME use index generate key may cause something wrong
            more.map((child, index) => {
              return <MenuItem key={index} disabled={child.props.disabled}>{child}</MenuItem>;
            })
          }
        </Menu>);
        let dropdown = (
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              更多 <Icon type="down" />
            </a>
          </Dropdown>
        );
        children.push(dropdown);
    }

    return (
      !hidden ? (
        <span >
          {children}
        </span>
      ) : null
    );
  }
}

export default AButtonGroupComponent;
