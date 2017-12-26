import React from 'react';
import { Row, Col } from 'antd';
import { Chart } from 'components';
import sexOption from './sexOption';
import ageOption from './ageOption';

class UserAnalysis extends React.Component {

  render() {
    const sexChartProps = {
      site: 'mftp',
      url: '/api/v1/user_analysis/sex_distributed',
      option: sexOption
    };
    const ageChartProps = {
      site: 'mftp',
      url: '/api/v1/user_analysis/age_distributed',
      option: ageOption
    };
    return (
      <Row gutter={16}>
        <Col span={12}>
          <div className="shadow-box">
            <Row className="title-group m-b-10">
              性别划分
            </Row>
            <Row type="flex"
              style={{ height: '300px' }}
              justify="space-between">
              <Chart {...sexChartProps} />
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <div className="shadow-box">
            <Row className="title-group m-b-10">
              年龄划分
            </Row>
            <Row type="flex"
              style={{ height: '300px' }}
              justify="space-between">
              <Chart {...ageChartProps} />
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default UserAnalysis;
