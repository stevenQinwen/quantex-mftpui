import React from 'react';
import { Input, Row, Checkbox, Button, TimePicker } from 'antd';
import _ from 'lodash';
import { Select, TreeSelect, Cascader, InputNumber, DatePicker } from 'components';
import classNames from 'classnames';

const styles = require('./index.scss');

const defaultConfig = {
  Input: {
    type: 'text',
    size: 'small',
  },
  Select: {
    allowClear: true
  },
  TreeSelect: {
    allowClear: true
  },
  DatePicker: {
    size: 'small',
    allowClear: true
  }
};

// InputGroup拥有items属性
// items: [
//   {
//     component: 'Input',
//     index: 0
//     props: {
//       placeholder: "最小金额"
//     }
//   }, {
//     component: '至'(<string>) | <span>至</span>(<ReactNode>) | '{ComponentType}'(<string>),
//     props: {
//        // valid when component is ComponentType
//     }
//   }, {
//     component: 'Input',
//     index: 1,
//     props: {
//       placeholder: "最小金额"
//     }
//   }
// ]
class InputGroupComponent extends React.Component {

  state = {
    value: this.props.value || []
  };

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      let value = nextProps.value || [];
      this.setState({ value });
    }
  }

  handleChange = (item) => {
    // 利用闭包保存 index / component 属性
    return (info) => {
      let val = "";
      // 如果有valuePropName,则取valuePropName值,比如Checkbox是从checked取值
      if (item.valuePropName) {
        val = info.target[item.valuePropName];
      } else {
        val = item.component === 'Input' ? info.target.value : info;
      }
      const { value } = this.state;
      value[item.index] = val;
      const onChange = this.props.onChange;
      if (typeof onChange === 'function') {
        if (item.props && typeof item.props.onChange === 'function') {
          // fire onChange in itemConfig
          item.props.onChange(val);
        }
        onChange(value); // 交由 Form 表单内部的 setState 来 re-render InputGroup
      }
      if (!this.props.trigger) this.setState({ value }); // 非 Form 受控模式下，内部受控
    };
  };

  // 获取组件的值, 回调, 触发 InputGroup 组件校验
  handleValidateTrigger = (trigger) => {
    return () => {
      const { value } = this.state;
      if (this.props[trigger]) {
        this.props[trigger](value);
      }
    };
  };

  /**
   * 将传入的对象属性值为函数的转化为具体的值
   * @param params
   * @return {{}}
   */
  evalObjValue = (params = {}) => {
    const returnParams = {};
    for (let i in params) {
      if (_.isFunction(params[i])) {
        returnParams[i] = params[i]();
      } else {
        returnParams[i] = params[i];
      }
    }
    return returnParams;
  };

  itemComponent = (item) => {
    const { disabled } = this.props;
    let itemProps = Object.assign({}, { disabled }, defaultConfig[item.component], item.props);
    if (item.hasOwnProperty('index')) {
      itemProps.onChange = this.handleChange(item);
      if (item.valuePropName) {
        itemProps[item.valuePropName] = this.state.value[item.index];
      }
      itemProps.value = this.state.value[item.index];
    }
    // 添加 validateTrigger(校验子节点值的时机)配置项
    if (itemProps.hasOwnProperty('validateTrigger')) {
      itemProps[itemProps.validateTrigger] = this.handleValidateTrigger(itemProps.validateTrigger);
    }
    switch (item.component) {
      case 'Input':
        return <Input {...itemProps} />;
      case 'Cascader':
        if ('treeParams' in itemProps) {
          itemProps.treeParams = this.evalObjValue(itemProps.treeParams);
        }
        return <Cascader {...itemProps} />;
      case 'DatePicker':
        return <DatePicker {...itemProps} />;
      case 'Select':
        if ('dictParams' in itemProps) {
          itemProps.dictParams = this.evalObjValue(itemProps.dictParams);
        }
        return <Select {...itemProps} />;
      case 'TreeSelect':
        if ('treeParams' in itemProps) {
          itemProps.treeParams = this.evalObjValue(itemProps.treeParams);
        }
        if ('notFoundContent' in itemProps) {
          _.isFunction(itemProps.notFoundContent) && (itemProps.notFoundContent = itemProps.notFoundContent());
        }
        return <TreeSelect {...itemProps} />;
      case 'InputNumber':
        return <InputNumber {...itemProps} />;
      case 'HundredMillionNumber':
        return <InputNumber.HundredMillionNumber {...itemProps} />;
      case 'HundredNumber':
        return <InputNumber.HundredNumber {...itemProps} />;
      case 'TenThousandNumber':
        return <InputNumber.TenThousandNumber {...itemProps} />;
      case 'PercentNumber':
        return <InputNumber.PercentNumber {...itemProps} />;
      case 'Checkbox':
        return <Checkbox {...itemProps} />;
      case 'Button':
        return <Button {...itemProps} />;
      case 'TimePicker':
        return <TimePicker {...itemProps} />;
      default:
        if (item.hasOwnProperty('index')) {
          throw new Error(`ItemComponent invalid, ${item.component} should be a string which in [Input, Select, TreeSelect, DatePicker, TenThousandNumber, Cascader]`);
        }
        return item.component; // return '至' | <span>至</span>
    }
  };

  renderItemComponent = (items) => {
    return items.map((item, i) => {
      const className = item.hasOwnProperty('index')
        ? 'input-group-item input-group-item-has-index'
        : 'input-group-item input-group-item-no-index';
      const spanClassName = classNames({
        [className]: true,
        [item.className]: Boolean(item.className)
      });
      return <span className={spanClassName} key={i} style={item.flex && { flex: item.flex }}>{this.itemComponent(item)}</span>;
    });
  };

  render() {
    const { className, items, id } = this.props;
    const rootClassName = classNames({
      [`${styles.root}`]: true,
      [`${className}`]: className
    });
    return (
      <div className={rootClassName} id={id}>
        <Row type="flex" gutter={8} className={styles.main} align="middle">
          {this.renderItemComponent(items)}
        </Row>
      </div>
    );
  }
}

InputGroupComponent.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default InputGroupComponent;
