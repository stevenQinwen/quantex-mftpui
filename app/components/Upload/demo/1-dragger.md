---
order: 1
title: 拖拽上传
---

拖拽上传
- 把文件拖入指定区域,完成上传, 同时支持点击上传
```jsx
import React from 'react';
import { API } from 'utils';
import { Alert } from 'components';
import Upload from '../Upload';

const Dragger = Upload.Dragger;

class DraggerDemoComponent extends React.Component {
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
      extensions: ['doc', 'docx'], // 只能上传 doc/docx 后缀文件
      onSelect: (files) => {
        this.files = files; // 供手动提交时获取文件数据
        this.upload();
      },
      ref: (comp) => { this.uploadComponent = comp; }
    };
    return (
      <Dragger {...uploadProps}>
        <h1>drag file to this area</h1>
      </Dragger>
    );
  }
}

ReactDOM.render(
  <DraggerDemoComponent/>
, mountNode);
```
