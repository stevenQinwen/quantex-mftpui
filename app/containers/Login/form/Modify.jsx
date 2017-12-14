import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'antd';
import styles from '../index.scss';

class Modify extends Component {
  constructor() {
    super();
    // 错误信息
    this.state = {
      errorMsg: '',
      btnText: '保存'
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.newPassword !== values.newPasswordRepeat) return;
        if (values.oldPassword === values.newPassword) {
          this.setErrorMsg('新密码不能与原密码相同');
          return;
        }
        this.props.store.updatePassword(values, () => {
          this.props.form.resetFields();
          this.setState({
            btnText: <span><Icon type="check" /> 重置成功</span>,
            errorMsg: ''
          }, () => {
            setTimeout(() => {
              this.props.store.uiState.closeModifyForm();
            }, 500);
          });
        }, (res) => {
          // 提示登录错误信息
          this.setErrorMsg(res.msg);
        });
      } else {
        this.setErrorMsg('请输入所有项');
      }
    });
  };

  // 重置表单
  resetForm() {
    this.props.form.resetFields();
  }

  resetErrorMsg = () => {
    this.setState({ errorMsg: '' });
  }

  setErrorMsg = (msg) => {
    this.setState({ errorMsg: msg });
  }

  /**
   * 去掉报错信息
   */
  onInputChange = () => {
    if (this.state.errorMsg.length) {
      this.resetErrorMsg();
    }
  }

  checkPasswordRepeat = (rule, value, callback, compareField) => {
    const compareValue = this.props.form.getFieldValue(compareField);
    if (compareValue === '' || compareValue === undefined) {
      callback();
      this.resetErrorMsg();
      return;
    }
    if (value !== compareValue) {
      callback();
      this.setErrorMsg('确认密码不一致');
    } else {
      callback();
      this.resetErrorMsg();
    }
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { errorMsg, btnText } = this.state;

    return (
      <Form className={styles['modify-form']} onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, whitespace: true, message: '请输入原密码!' }],
          })(
            <Input size="default"
                   placeholder="初始密码"
                   type="password"
                   onChange={this.onInputChange}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('newPassword', {
            rules: [{ required: true, whitespace: true, message: '请输入新密码!' }, {
              validator: (rule, value, callback) => { this.checkPasswordRepeat(rule, value, callback, 'newPasswordRepeat'); }
            }]
          })(
            <Input size="default"
                   placeholder="新密码"
                   type="password"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('newPasswordRepeat', {
            rules: [{ required: true, whitespace: true, message: '请输入新密码!' }, {
              validator: (rule, value, callback) => { this.checkPasswordRepeat(rule, value, callback, 'newPassword'); }
            }]
          })(
            <Input size="default"
                   placeholder="确认密码"
                   type="password"/>
          )}
        </FormItem>
        <p className={styles['err-msg']}>{errorMsg}</p>
        <FormItem className={styles['btn-form-item']}>
          <Button className={styles['btn-modify']} size="default" type="primary" htmlType="submit">
            {btnText}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const ModifyForm = Form.create()(Modify);

export default ModifyForm;
