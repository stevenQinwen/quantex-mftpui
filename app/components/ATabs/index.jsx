import React from 'react';
import { Tabs } from 'antd';
import handlePropsWithBtnCode from '../_util/handlePropsWithBtnCode';

const TabPane = Tabs.TabPane;

class ATabsComponent extends React.Component {

  render() {
    let hidden = false;
    const props = {};
    let vaildChildren = []; // 有权限的 children
    // 根据默认配置项默认选中第一项来修正 defaultActiveKey 所指定的 key
    React.Children.forEach(this.props.children, (child) => {
      // 根据每个 children 的 btnCode 属性来判断是否无权限
      const hiddenTabPane = handlePropsWithBtnCode(child.props.btnCode).hidden;
      if (!hiddenTabPane) {
        vaildChildren.push(child);
      }
    });
    if (vaildChildren.length === 0) {
      hidden = true;
    } else {
      props.defaultActiveKey = vaildChildren[0].key;
    }
    return (
      !hidden ? (
        <Tabs {...this.props} {...props}>
          {vaildChildren}
        </Tabs>
      ) : null
    );
  }
}

ATabsComponent.TabPane = TabPane;

export default ATabsComponent;
