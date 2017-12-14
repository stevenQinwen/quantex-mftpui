---
order: 1,
title: 函数方式
---

函数传参方式

```jsx
import React, { Component } from 'react';
import { Form } from 'antd';
import { Select, FormItemWrapper, ComponentDict } from 'components';

const FormItem = Form.Item;

class CustomizedFormComponent extends Component {
  state = {
    segmentType: 1 // 如果是费率, 显示百分比组件,否则显示普通输入组件
  };

  onChangeSegmentType = (val) => {
    this.setState({
      segmentType: val
    });
  };
  
  // 函数形式
    componentFn = (type) => {
      return type == 1 ? ComponentDict.PercentNumber : ComponentDict.InputNumber;
    };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { segmentType } = this.state;
    return (
        <Form>
          <FormItem label="分段取值">
            {
              getFieldDecorator('segmentType')(
                  <Select dictUrl="/api/v2/dictdatas/dict"
                          dictKey="segement_value_type"
                          onChange={(val) => { this.onChangeSegmentType(val); }}/>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('value')(
                  <FormItemWrapper
                      component={() => { return this.componentFn(segmentType); }}/>
              )
            }
          </FormItem>
        </Form>
    );
  }
}

const CustomizedForm = Form.create({})(CustomizedFormComponent);

ReactDOM.render(
  <CustomizedForm/>
, mountNode);
```