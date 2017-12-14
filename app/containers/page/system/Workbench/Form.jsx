import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { Select } from 'components';
import Util from 'utils/util';

const FormItem = Form.Item;
const baseDotStyle = { width: '10px', height: '10px', marginRight: '6px' };
const colorInfoMap = new Map([
  ['red', { name: '红色', color: '#f04134' }],
  ['green', { name: '绿色', color: '#00a854' }],
  ['blue', { name: '蓝色', color: '#108ee9' }],
  ['pink', { name: '粉色', color: '#f5317f' }],
  ['orange', { name: '橙色', color: '#f56a00' }],
  ['purple', { name: '紫色', color: '#7265e6' }],
  ['yellow', { name: '黄色', color: '#ffbf00' }],
  ['cyan', { name: '青色', color: '#00a2ae' }]
]);

class Work extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { store, dataSource } = this.props;
        const type = dataSource ? 'edit' : 'add';
        let params = Util.buildFormData(values);
        if (type === 'add') {
          store.addWork(params);
        } else {
          Object.assign(params, { id: dataSource.id });
          store.updateWork(params);
        }
      }
    });
  }

  buildColorDictData = () => {
    return [...colorInfoMap.keys()].map((color) => {
      return this.buildColorDictItem(color);
    });
  }

  buildColorDictItem = (color) => {
    const info = colorInfoMap.get(color);
    const style = Object.assign({ backgroundColor: info.color }, baseDotStyle);
    const name = (
      <span>
        <span className="ant-badge-status-dot" style={style}></span>
        {info.name}
      </span>
    );
    return { id: info.color, name };
  }

  render() {
    const { store } = this.props;
    const { getFieldDecorator } = this.props.form;
    const colorDictData = this.buildColorDictData();
    return (
      <Form className="sidebar-content-wrapper qx-form-col-7-17" onSubmit={this.handleSubmit}>
        <div className="sidebar-main-content">
          <FormItem label="工作台名称">
            {getFieldDecorator('name', { rules: [{ required: true, whitespace: true, message: '必填' }] })(
              <Input size="small" placeholder="请填写工作台名称" />
            )}
          </FormItem>
          <FormItem label="选择菜单项">
            {getFieldDecorator('menuIds$$array', { rules: [{ required: true, message: '必填' }] })(
              <Select multiple dictData={store.userMenu} />
            )}
          </FormItem>
          <FormItem label="工作台颜色">
            {getFieldDecorator('backgroundColor', {
              initialValue: colorInfoMap.get('blue').color
            })(
              <Select showSearch={false} dictData={colorDictData} />
              )}
          </FormItem>
        </div>
        <div className="sidebar-btn-wrapper">
          <Button size="small" type="primary" htmlType="submit">提交</Button>
        </div>
      </Form>
    );
  }
}

const WorkForm = Form.create({
  mapPropsToFields(props) {
    return Util.mapPropsToFields(props.dataSource, {
      menuIds: {
        dataType: 'array'
      }
    });
  }
})(Work);
export default WorkForm;
