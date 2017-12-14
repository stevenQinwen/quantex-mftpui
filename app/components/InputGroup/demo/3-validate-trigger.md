---
order: 4
title: 添加获取验证节点值时机(validateTrigger)配置项
---

- 结合 Form 组件的 options.validateTrigger 配置项, 设置触发校验器的时机
- 注意: 
  1. 在 getFieldDecorator 中配置 validateTrigger 指定触发校验器时机(默认'onChange')
  2. 在 InputGroup 组件的属性中配置 validateTrigger

```jsx
import React, { Component } from 'react';
import { Form } from 'antd';
import { InputGroup } from 'components';

const FormItem = Form.Item;

class CustomFormComponent extends Component {
  renderInputGroupItem = () => {
    const items = [{
      component: "Input",
      index: 0,
      props: {
        placeholder: "较小值",
        validateTrigger: 'onBlur'
      }
    }, {
      component: "至",
    }, {
      component: "Input",
      index: 1,
      props: {
        placeholder: "较大值",
        validateTrigger: 'onBlur'
      }
    }];
    return (
        <InputGroup items={items}/>
    );
  };

  // 1. 验证后一个值必须大于前一个值
  // 2. 当输入控件 onBlur 时触发验证器
  handleValidateTermUnit = (rule, value = [], callback) => {
    if (value.length === rule.len) {
      if ((+value[0]) > (+value[1])) {
        callback("最大值不得小于最小值");
      }
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem>
          {
            getFieldDecorator('termUnit', {
              rules: [{
                len: 2,
                validator: this.handleValidateTermUnit
              }],
              validateTrigger: 'onBlur'
            })(
                this.renderInputGroupItem()
            )
          }
        </FormItem>
      </Form>
    );
  }
}

const CustomForm = Form.create({})(CustomFormComponent);

ReactDOM.render(
  <CustomForm/>
, mountNode);
```