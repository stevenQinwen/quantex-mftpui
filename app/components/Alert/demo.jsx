import React from 'react';
import { Button } from 'antd';
import Alert from 'components/Alert';

class AlertDemo extends React.Component {

  render() {
    return (
        <div className="content">
          <h1>普通提交成功确认框</h1>
          <code>{`<Button type="primary" onClick={() => { Alert.success('test'); }}>成功提示框</Button>`}</code>
          <Button type="primary" onClick={() => { Alert.success('test'); }}>成功提示框</Button>
          <h1>带有‘发送详情’按钮复发错误提示信息框</h1>
          <code>{`<Button type="primary" onClick={() => {
              Alert.error({
                requestId: 'xxxx',
                msg: 'tst',
                msgInfo: 'xx',
                msgDetail: '这是很长很长的堆栈信息',
                code: 400
              });
            }}>复杂错误提示框</Button>`}</code>
          <Button type="primary" onClick={
            () => {
              Alert.error({
                requestId: 'xxxx',
                msg: 'tst',
                msgInfo: 'xx',
                msgDetail: '这是很长很长的堆栈信息',
                code: 400
              });
            }
          }>
          复杂错误提示框
          </Button>
          <h1>带有回调函数的错误提示框</h1>
          <code>{`<Button type="primary" onClick={() => { Alert.error('test', (close) => { logger.log('close...'); close(); }); };}>错误提示框</Button>`}</code>
          <Button type="primary" onClick={() => {
            Alert.error('test', (close) => {
              logger.log('close...');
              close();
            });
          } }>
            错误提示框
          </Button>
          <h1>Confirm 确认框</h1>
          <code>{`<Button type="primary" onClick={() => {
            Alert.confirm('error', {
              okText: '继续',
              cancelText: '中断处理',
              type: 'error',
              iconType: 'cross-circle-o',
              onOk: (close) => {
                logger.log('继续………………');
                close();
              },
              onCancel: (close) => {
                logger.log('中断处理…………');
                close();
              }
            });
          }}>Confirm 确认框</Button>`}</code>
          <Button type="primary" onClick={
            () => {
              Alert.confirm('error', {
                okText: '继续',
                cancelText: '中断处理',
                type: 'error',
                iconType: 'cross-circle-o',
                onOk: (close) => {
                  logger.log('继续………………');
                  close();
                },
                onCancel: (close) => {
                  logger.log('中断处理…………');
                  close();
                }
              });
            }
          }>Confirm 确认框</Button>
        </div>
    );
  }
}

export default AlertDemo;
