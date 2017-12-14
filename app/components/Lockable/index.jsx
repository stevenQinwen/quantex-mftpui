import React, { Component } from 'react';
import { Icon } from 'antd';
import Select from 'components/Select';
import InputNumber from 'components/InputNumber';
import InputGroup from 'components/InputGroup';
import styles from './index.scss';

const { PercentNumber } = InputNumber;

const LockableWrapper = (lockableData, form) => {
  // 必填 for
  class Lockable extends Component {

    static PropTypes = {
      check: React.PropTypes.func
    };

    constructor(props) {
      super(props);
      lockableData[props.for] = false;
    }

    getComponent = (comp) => {
      // 高阶组件的属性(读取,增加,编辑,或移除comp传进来的props)
      let props = {
        key: this.props.for
      };
      // 只有当加锁时, 添加 disabled 属性, 否则不添加该属性, 避免影响该组件内部包裹组件的 disabled 属性设置
      if (this.isLock()) {
        Object.assign(props, {
          disabled: this.isLock()
        });
      }
      const compType = this.props.type;
      switch (compType) {
        case 'Select':
          return <Select {...comp.props} {...props} />;
        case 'InputNumber':
          return <InputNumber {...comp.props} {...props} />;
        case 'PercentNumber':
          return <PercentNumber {...comp.props} {...props} />;
        case 'InputGroup':
          return <InputGroup {...comp.props } {...props } />;
        default:
          throw new Error('ItemComponent invalid, component should be a string which in [InputNumber, Select, PercentNumber, InputGroup]');
          // return null;
      }
    };

    toggleLock = () => {
      const { check } = this.props;
      let bo = !this.isLock(); // 正在修改为的锁定状态
      if (bo && form && form.validateFields) { // 正在锁定组件时检查组件是否存在可用的值
        form.validateFields([this.props.for], {}, (err) => {
          bo = !err;
        });
      }
      // 不存在可用值时不会锁定组件
      lockableData[this.props.for] = check ? check(bo, this.props.for) : bo;
      this.forceUpdate();
    }

    isLock = () => {
      return !!lockableData[this.props.for]; // return false
    };

    render() {
      let comp = this.props.children; // Select, NumberFormat 组件
      // logger.info('comp:', comp);
      return (
        <div className={styles.root}>
          {
            this.getComponent(comp)
          }
          <Icon type={this.isLock() ? 'lock' : 'unlock'} onClick={this.toggleLock} />
        </div>
      );
    }
  }

  return Lockable;
};

export default LockableWrapper;
