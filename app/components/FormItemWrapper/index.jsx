import React, { Component } from 'react';
import getComponent from '../_util/getComponent';

// 组件用途: 根据传进来的 component 属性切换 输入控件
class FormItemWrapper extends Component {

  componentWillMount() {
    this.ItemComponent = this.getItemComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.componentName !== this.getComponentName(nextProps.component)) {
      logger.log("switch component");
      this.ItemComponent = this.getItemComponent(nextProps);
      const { trigger } = this.props["data-__meta"];  //  获取该FormItem的收集子节点值的方法，一般是onChange
      if (trigger) {
        // 切换组件时清空值
        this.props[trigger]();
      }
    }
  }

  /**
   * 根据传入的属性获取相应的输入控件
   * @param props 组件上所有 props
   * @returns {*}
   */
  getItemComponent = (props) => {
    this.componentName = this.getComponentName(props.component); // 缓存当前组件名称
    return getComponent(this.componentName);
  };

  /**
   * 获取组件名称
   * @param component 传入组件的 component props
   * @returns {*}
   */
  getComponentName = (component) => {
    return typeof component === 'function' ? component() : component;
  };

  render() {
    const { component, ...extraProps } = this.props; // 避免传入不必要的属性(component) TODO: 寻求更优解决方案
    return <this.ItemComponent {...extraProps} />;
  }
}

FormItemWrapper.defaultProps = {
  size: 'small'
};

export default FormItemWrapper;
