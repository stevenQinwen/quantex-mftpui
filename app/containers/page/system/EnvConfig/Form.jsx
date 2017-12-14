import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Input, Button, Icon } from 'antd';
import { Select } from 'components';
import { observer } from 'mobx-react';
import { Util } from 'utils';
import ApiConfig from 'config/api';
import { FORMITEM_LAYOUT } from 'common/constants'; // 引入labelcol常量

const FormItem = Form.Item;
const siteDictData = Object.keys(ApiConfig.domain).map((item) => {
  return { id: item, name: item };
});
/**
 * 批量编辑字典表单
 */
@observer
class EnvComponent extends Component {

  constructor(props) {
    super(props);
    if (props.dataSource) {
      const keys = props.dataSource.apis.map((env, index) => {
        return { key: index };
      });
      props.store.uiState.setSiteItemKeys(keys);
    }
  }

  /**
   * 提交表单
   * @param e
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { store, dataSource } = this.props;
        const type = dataSource ? 'edit' : 'add';
        values.apis = _.compact(values.apis);
        let params = Util.buildFormData(values);
        if (type === 'add') {
          store.addEnv(params);
        } else {
          store.updateEnv({ id: dataSource.id, ...params });
        }
      }
    });
  };

  /**
   * render 动态添加服务组
   * @returns {Array}
   */
  renderSiteItem = () => {
    const { getFieldDecorator } = this.props.form;
    const { uiState } = this.props.store;
    // 样式
    const { newItemLayout } = this.getItemLayout();
    // logger.log("新增字典对组dictGroup:", dictGroup);
    return uiState.siteItemKeys.slice().map((item) => {
      const key = item.key;
      // 获取对象数据结构
      const siteName = `apis[${key}].site`; // 服务名
      const siteUrl = `apis[${key}].url`; // 服务地址
      const iconProps = {
        style: newItemLayout
      };
      return (
          <div key={key}>
            <FormItem label="服务名">
              {getFieldDecorator(siteName, {
                rules: [{ required: true, message: "必填", }],
              })(
                  <Select dictData={siteDictData} showSearch={false}/>
              )}
            </FormItem>
            <FormItem label="服务地址">
              {getFieldDecorator(siteUrl, {
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "必填",
                }],
              })(
                  <Input size="small" type="text" {...iconProps}/>
              )}
              <Icon className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => { uiState.removeSiteItem(key); }}/>
            </FormItem>
          </div>
      );
    });
  };
  /**
   * 获取表单样式
   * @private
   */
  getItemLayout() {
    // 按钮布局
    const tailFormItemLayout = {
      wrapperCol: {
        span: FORMITEM_LAYOUT.FORM_INPUT_LEN,
        offset: FORMITEM_LAYOUT.FORM_LABEL_LEN
      }
    };
    // 新添加项样式
    const newItemLayout = {
      width: '85%',
      marginRight: FORMITEM_LAYOUT.FORM_LABEL_LEN
    };

    return {
      tailFormItemLayout: tailFormItemLayout,
      newItemLayout: newItemLayout
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { uiState } = this.props.store;
    // 样式
    const { tailFormItemLayout } = this.getItemLayout();
    return (
      <Form className="sidebar-content-wrapper qx-form-col-7-17" onSubmit={this.handleSubmit}>
        <div className="sidebar-main-content">
          <FormItem label="环境名称">
            {
              getFieldDecorator(`name`, {
                rules: [{ required: true, message: '必填' }]
              })(
                <Input size="small" type="text"/>
              )
            }
          </FormItem>
          <FormItem label="描述">
            {
              getFieldDecorator(`remark`)(
                <Input size="small" type="text"/>
              )
            }
          </FormItem>
          { this.renderSiteItem() }
          <FormItem {...tailFormItemLayout}><a onClick={uiState.addSiteItem}>添加服务地址</a></FormItem>
        </div>
        <div className="sidebar-btn-wrapper">
          <Button size="small" type="primary" htmlType="submit">提交</Button>
        </div>
      </Form>
    );
  }
}

const EnvForm = Form.create({
  mapPropsToFields(props) {
    return Util.mapPropsToFields(props.dataSource);
  }
})(EnvComponent);

export default EnvForm;
