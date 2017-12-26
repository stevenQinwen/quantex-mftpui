import React from 'react';
import { Row, Col, Radio } from 'antd';
import { Chart, NumberFormat, Table } from 'components';
import { API } from 'utils';
import { BUY_REDEEM } from 'common/constants';
import buyOption from './buyOption';
import redeemOption from './redeemOption';

const { PercentFormat } = NumberFormat;
const { FixedTable } = Table;

class ModelPerformance extends React.Component {

  api = new API('mftp');
  state = {
    type: BUY_REDEEM.BUY,
    tableData: []
  }

  componentDidMount() {
    this.fetchTableData(BUY_REDEEM.BUY);
  }

  fetchTableData = (type) => {
    this.api.get('/api/v1/model_perform/table/{type}', { type })
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
      url: '/api/v1/model_perform/graph/{type}',
      params: { type },
      option: isBuySide ? buyOption : redeemOption
    };
    const tableProps = {
      size: 'small',
      pagination: false,
      dataSource: tableData,
      columns: [{
        title: "日期",
        dataIndex: "date"
      }, {
        title: isBuySide ? "实际申购" : '实际赎回',
        dataIndex: "actualBuyAmounts",
        className: "text-right",
        render: (text) => {
          return <NumberFormat value={text} />;
        }
      }, {
        title: isBuySide ? '申购金额预测' : "赎回金额预测",
        dataIndex: "predictBuyAmounts",
        className: "text-right",
        render: (text) => {
          return <NumberFormat value={text} />;
        }
      }, {
        title: isBuySide ? "申购预测精度" : '赎回预测精度',
        dataIndex: "bias",
        className: "text-right",
        render: (text) => {
          return <PercentFormat value={text} />;
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
              {isBuySide ? '申购' : '赎回'}预测表
            </Row>
            <FixedTable {...tableProps} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModelPerformance;
