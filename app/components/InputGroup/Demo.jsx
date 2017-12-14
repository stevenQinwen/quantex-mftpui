import React, { Component } from 'react';
import { Form } from 'antd';
import { InputGroup, Alert } from 'components';

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
        Alert.warning("最大值不得小于最小值");
        callback("");
      }
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem label="期限">
          {
            getFieldDecorator('termUnit', {
              rules: [{
                len: 2,
                validator: this.handleValidateTermUnit
              }],
              trigger: 'onBlur',
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

class DemoComponent extends Component {
  render() {
    return (
        <CustomForm/>
    );
  }
}

export default DemoComponent;
