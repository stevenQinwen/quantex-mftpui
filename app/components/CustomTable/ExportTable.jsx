import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Download, Alert } from 'components';
import styles from './index.scss';

const FormItem = Form.Item;

// 导出表格数据组件
@observer
class ExportTableDataComponent extends Component {

  /**
   * 导出表格文件
   */
  handleExport = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let tableData = this._getTableData(); // 获取表格数据
        let data = Object.assign(tableData, values);
        let pramas = {
          action: "/api/v2/system/export",
          downloadSite: 'auth',
          downloadParams: JSON.stringify(data),
          method: "POST",
          onDownloaded: () => {
            window.CustomTableModal.destroy();
            Alert.info(`已成功导出${this.totalRecord}条数据。`);
          }
        };
        Download.downloadFile(pramas);
      }
    });
  };

  /**
   * 获取表头（th）和表真实数据(td)
   * 根据 Table 的 className 获取该组件的相应的 dom
   */
  _getTableData = () => {
    const { store } = this.props;
    const tableClassName = '.js-' + store.tableId; // Table 的 className 属性值
    let tHeadTrDom = document.querySelector(tableClassName + ' table thead tr');
    let tBodyDom = document.querySelector(tableClassName + ' table tbody'); // tbody dom
    // 表头
    let column = Array.from(tHeadTrDom.childNodes).map((item) => {
      return {
        title: item.innerText
      };
    });
    // 表内容
    let trArr = Array.from(tBodyDom.childNodes);
    this.totalRecord = trArr.length;
    let data = trArr.map((item) => {
      return Array.from(item.childNodes).map((subItem) => {
        return subItem.innerText;
      });
    });
    return {
      column, data
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form className={styles['export-table']} onSubmit={this.handleExport}>
        <Row>
          <Col offset={6}>
            <label className="text-danger m-b-10">注意：只能导出界面显示的数据，请确保这些数据已经满足要求！</label>
          </Col>
        </Row>
        <FormItem {...formItemLayout} label="导出文件名">
          {
            getFieldDecorator("fileName", {
              rules: [{ required: true, message: '必填' }]
            })(
              <Input size="small" type="text" addonAfter=".xls" />
              )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Sheet名称">
          {
            getFieldDecorator("sheetName")(
              <Input size="small" type="text" />
              )
          }
        </FormItem>
        <Button className="float-right" type="primary" htmlType="submit" size="small">导出</Button>
      </Form>
    );
  }
}

const ExportTable = Form.create()(ExportTableDataComponent);

export default ExportTable;
