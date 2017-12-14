---
order: 0
title: 基本使用
---

基本用法。

```jsx
import React from 'react';
import { Button } from 'antd';
import { API } from 'utils';
import { Alert } from 'components';
import Upload from '../Upload';

class DemoComponent extends React.Component {
  constructor() {
    super();
    this.api = new API("qaw");
  }

  upload = () => {
    const formData = new FormData();
    formData.append("file", this.files[0]);
    this.api.post("/api/v2/funds/import", formData, {
      multipart: true,
      loading: true
    }).then((res) => {
      if (res.code === 200) {
        Alert.success('上传成功', (close) => {
          this.uploadComponent.removeFileList(); // 清空界面上显示的文件列表
          close();
        });
      } else {
        Alert.error(res);
        this.uploadComponent.removeFileList();
      }
    });
  };

  render() {
    const uploadProps = {
      name: 'file',
      uploadSite: 'qaw',
      action: "/api/v2/funds/import",
      extensions: ['xlsx'], // 只能上传 xlsx 后缀文件
      onSelect: (files) => {
        this.files = files; // 供手动提交时获取文件数据
        this.upload(); // 自动调用上传文件方法, 模拟 Upload 自动上传文件
      },
      ref: (comp) => { this.uploadComponent = comp; }
    };
    return (
      <Upload {...uploadProps}>
        <Button type="primary" size="small">
          选择文件
        </Button>
      </Upload>
    );
  }
}
 
ReactDOM.render(
  <DemoComponent/>
, mountNode);
```
