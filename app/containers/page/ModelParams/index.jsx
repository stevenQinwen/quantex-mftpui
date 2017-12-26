import React from 'react';
import { Row, Col, Radio, Popover } from 'antd';
import { Chart, NumberFormat, Table } from 'components';
import { API } from 'utils';
import { BUY_REDEEM } from 'common/constants';
import buyOption from './buyOption';
import redeemOption from './redeemOption';

const { FixedTable } = Table;

class ModelParams extends React.Component {

  api = new API('mftp');
  state = {
    type: BUY_REDEEM.BUY,
    tableData: []
  }

  componentDidMount() {
    this.fetchTableData(BUY_REDEEM.BUY);
  }

  fetchTableData = (type) => {
    this.api.get('/api/v1/model_param/model_fit_param/{type}', { type })
      .then((res) => {
        if (res.code === 200) {
          this.setState({
            tableData: res.data.list
          });
        }
      });
  }

  onTypeChange = (e) => {
    this.setState({
      type: e.target.value
    }, () => {
      this.fetchTableData(BUY_REDEEM.BUY);
    });
  }

  render() {
    const { type, tableData } = this.state;
    const isBuySide = type === BUY_REDEEM.BUY;
    const chartProps = {
      site: 'mftp',
      url: '/api/v1/model_param/model_fit_data/{type}',
      params: { type },
      option: isBuySide ? buyOption : redeemOption
    };
    const tableProps = {
      size: 'small',
      pagination: false,
      dataSource: tableData,
      columns: [{
        title: "参数名",
        dataIndex: "name"
      }, {
        title: isBuySide ? "申购模型参数值" : '赎回模型参数值',
        dataIndex: "value",
        className: "text-right",
        render: (text, record) => {
          const content = (
            <div>
              <div>参数说明：{record.beanNameDetail}</div>
              <div>{isBuySide ? '申购' : '赎回'}模型参考值：<NumberFormat value={text} precision={4} /></div>
            </div>
          );
          return (
            <Popover content={content} placement="bottom">
              <span><NumberFormat value={text} precision={4} /></span>
            </Popover>
          );
        }
      }],
      scroll: {
        y: {
          getValueWay: 'calcWithParent',
          padBottom: 75
        }
      },
    };
    return (
      <div className="shadow-box">
        <Row className="title-group m-b-10">
          <Radio.Group defaultValue={BUY_REDEEM.BUY} onChange={this.onTypeChange}>
            <Radio.Button value={BUY_REDEEM.BUY}>申购</Radio.Button>
            <Radio.Button value={BUY_REDEEM.REDEEM}>赎回</Radio.Button>
          </Radio.Group>
        </Row>
        <Row type="flex"
          style={{ height: '300px' }}
          className="performance-content"
          justify="space-between">
          <Col span="15">
            <Chart {...chartProps} />
          </Col>
          <Col span="8" offset="1">
            <Row className="primary-title m-b-10">
              {isBuySide ? '申购' : '赎回'}预测参数表
            </Row>
            <FixedTable {...tableProps} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModelParams;
