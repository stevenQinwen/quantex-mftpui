import React from 'react';
import Collapse from './FormCollapse';
import handlePropsWithBtnCode from '../_util/handlePropsWithBtnCode';

const Panel = Collapse.Panel;

class ACollapseComponent extends React.Component {

  render() {
    let hidden = false;
    const props = {
      defaultActiveKey: [] // 默认展开的 key 数组
    };
    let vaildChildren = []; // 有权限的 children
    // 根据默认配置项默认选中第一项来修正 defaultActiveKey 所指定的 key
    React.Children.forEach(this.props.children, (child) => {
      // 根据每个 children 的 btnCode 属性来判断是否无权限
      const hiddenPanel = handlePropsWithBtnCode(child.props.btnCode).hidden;
      if (!hiddenPanel) {
        vaildChildren.push(child);
        props.defaultActiveKey.push(child.key);
      }
    });
    if (vaildChildren.length === 0) {
      hidden = true;
    }
    return (
      !hidden ? (
        <Collapse {...this.props} {...props}>
          {vaildChildren}
        </Collapse>
      ) : null
    );
  }
}

ACollapseComponent.Panel = Panel;

export default ACollapseComponent;
