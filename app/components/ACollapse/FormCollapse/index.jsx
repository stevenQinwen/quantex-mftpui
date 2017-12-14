import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Collapse } from 'antd';
import { observer } from 'mobx-react';
import _ from 'lodash';
import Store from './Store';

const { Panel } = Collapse;

@observer
class CollapseComponent extends Component {
  store
  constructor(props) {
    super(props);
    this.store = new Store(props);
    const { innerRef } = props;
    if (innerRef) {
      // 将当前实例返回，在表单提交时调用实例的check方法
      innerRef(this);
    }
  }

  onChange = (info) => {
    const { setActiveKey } = this.store;
    setActiveKey(info);
    if (this.props.onChange) {
      this.props.onChange(info);
    }
  }

  /**
   * 表单提交时，判断Panel内部的输入项是否有错误提示，如果有，打开该Panel
   * 识别方法是搜索Panel内部的所有元素，取id当作输入项的字段名，然后判断是否在err中
   */
  check = (err) => {
    const dom = findDOMNode(this);
    let errorKeys = this.getAllErrorKeys(err);  //  获取所有错误字段名
    let { activeKey } = this.store;
    let newActiveKey = new Set(activeKey);
    this.props.children.forEach((child, index) => {
      const { key } = child;
      const panel = dom.children[index];
      const errorItem = errorKeys.find((item) => {
        // 在panel内部按id找元素，如果找到了，说明该panel有错误
        return panel.querySelector("#" + _.escapeRegExp(item));
      });
      if (errorItem) {
        newActiveKey.add(key);
      }
    });
    this.store.setActiveKey([...newActiveKey]);
  }

  /**
   * 获取所有错误输入项的field
   */
  getAllErrorKeys = (err) => {
    let keys = [];
    const getKeys = (obj) => {
      if (Array.isArray(obj)) {
        // 动态表单
        obj.forEach((item) => {
          Object.values(item).forEach((error) => { getKeys(error); });
        });
      } else {
        obj.errors.forEach((item) => {
          keys.push(item.field);
        });
      }
    };
    Object.values(err).forEach((item) => { getKeys(item); });
    return keys;
  }

  render() {
    const { activeKey } = this.store;
    return (
      <Collapse
        {...this.props}
        activeKey={[...activeKey]}
        onChange={this.onChange}
      />
    );
  }
}

CollapseComponent.Panel = Panel;

export default CollapseComponent;
