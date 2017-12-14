import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'antd';
import styles from '../index.scss';

class Login extends Component {
  constructor() {
    super();
    // 错误信息
    this.state = {
      errorMsg: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.store.login(values, this.props.form.resetFields, (res) => {
          // 提示登录错误信息
          this.setState({ errorMsg: res.msg });
        });
      } else {
        this.setErrorMsg('请输入用户名和密码');
      }
    });
  };

  /**
   * 去掉报错信息
   */
  onInputChange = () => {
    if (this.state.errorMsg.length) {
      this.resetErrorMsg();
    }
  }

  resetErrorMsg = () => {
    this.setState({ errorMsg: '' });
  }

  setErrorMsg = (msg) => {
    this.setState({ errorMsg: msg });
  }

  // 重置表单
  resetForm() {
    this.props.form.resetFields();
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { errorMsg } = this.state;

    return (
      <Form className={styles['login-form']} onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('loginName', {
            rules: [{ required: true, whitespace: true, message: '请输入用户名!' }],
          })(
            <Input size="default"
                   prefix={<Icon type="yonghuming"/>}
                   placeholder="用户名"
                   onChange={this.onInputChange}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('loginPassword', {
            rules: [{ required: true, whitespace: true, message: '请输入密码!' }]
          })(
            <Input size="default"
                   prefix={<Icon type="mima"/>}
                   placeholder="密码"
                   type="password"
                   onChange={this.onInputChange}/>
          )}
        </FormItem>
        <p className={styles['err-msg']}>{errorMsg}</p>
        <FormItem className={styles['btn-form-item']}>
          <Button className={styles['btn-login']} size="default" type="primary" htmlType="submit">
            登录<Icon type="right" />
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
