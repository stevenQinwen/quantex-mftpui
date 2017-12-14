import React from 'react';
import { observer } from 'mobx-react';
import { Upload } from 'antd';
import _ from 'lodash';
import { Alert } from 'components';
import API from 'utils/API';

@observer
class UploadComponent extends React.Component {
  state = {
    fileList: []
  };
  constructor(props) {
    super(props);
    this.api = new API(props.uploadSite);
  }
  handleProps = () => {
    const { action, uploadParams, extensions, onSelect, multiple } = this.props;
    const url = this.api._makeURL(action, uploadParams, 'GET').url;
    return {
      action: url,
      headers: this.api._handleHeader(),
      beforeUpload: (file) => {
        let isExension = this.validateExtensions(extensions, file.name); // 验证是否满足文件后
        if (isExension) { // 符合后缀
          this.setState(({ fileList }) => {
            let newFileList = multiple ? [...fileList, file] : [file];
            return {
              fileList: newFileList
            };
          }, () => {
            onSelect && onSelect(this.state.fileList);
          });
        }
        return false; // 手动上传
      },
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        }, () => {
          onSelect && onSelect(this.state.fileList);
        });
      },
      fileList: this.state.fileList
    };
  };

  // 移除文件列表, 供外部组件使用
  removeFileList = () => {
    this.setState({
      fileList: []
    });
  };

  /**
   * 验证文件后缀是否满足
   * @param extensions 允许上传的文件后缀 list
   * @param fileName 上传文件名称
   */
  validateExtensions = (extensions, fileName) => {
    if (extensions.length === 0) return true;
    // 获取当前上传文件后缀
    let fileExtension = fileName.substr(_.lastIndexOf(fileName, '.') + 1);
    if (!extensions.includes(fileExtension)) {
      Alert.warning(`文件格式不符合，仅支持${extensions.join('/')}格式文件`);
      return false;
    }
    return true;
  };

  render() {
    const props = this.handleProps();
    const { extensions, onSelect, uploadParams, uploadSite, ...restProps } = this.props;
    return (
      <Upload {...restProps} {...props}>
        {this.props.children}
      </Upload>
    );
  }
}

UploadComponent.propTypes = {
  uploadSite: React.PropTypes.string.isRequired,
  uploadParams: React.PropTypes.object,
  extensions: React.PropTypes.array,
  onSelect: React.PropTypes.func, // 参数: 符合文件格式的文件
};
UploadComponent.defaultProps = {
  uploadParams: {},
  extensions: [], // 允许上传的文件后缀
  multiple: true
};

export default UploadComponent;
