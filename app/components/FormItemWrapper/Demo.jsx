import React, { Component } from 'react';
import { Form } from 'antd';
import { Select, ComponentDict } from 'components';
import { DICT } from 'utils';
import FormItemWrapper from './index';

const FormItem = Form.Item;

class CustomizedFormComponent extends Component {
  state = {
    segmentType: DICT.segement_value_type_rate
  };

  onChangeSegmentType = (val) => {
    this.setState({
      segmentType: val,
      segmentType2: val
    });
  };

  // 函数形式
  componentFn = (type) => {
    return type == DICT.segement_value_type_rate ? ComponentDict.PercentNumber : ComponentDict.InputNumber;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { segmentType, segmentType2 } = this.state;
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
                      component={segmentType == DICT.segement_value_type_rate ? ComponentDict.PercentNumber : ComponentDict.InputNumber}/>
              )
            }
          </FormItem>
          <FormItem label="分段取值2">
            {
              getFieldDecorator('segmentType2')(
                  <Select dictUrl="/api/v2/dictdatas/dict"
                          dictKey="segement_value_type"
                          onChange={(val) => { this.onChangeSegmentType(val); }}/>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('value2')(
                  <FormItemWrapper
                      component={() => { return this.componentFn(segmentType2); }}/>
              )
            }
          </FormItem>
        </Form>
    );
  }
}

const CustomizedForm = Form.create({})(CustomizedFormComponent);

class DemoComponent extends Component {
  render() {
    return (
       <CustomizedForm/>
    );
  }
}

export default DemoComponent;
