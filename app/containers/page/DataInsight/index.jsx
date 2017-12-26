import React from 'react';
import { Row, Col, Radio } from 'antd';
import { Chart } from 'components';
import { BUY_REDEEM, TIME_AMOUNT } from 'common/constants';
import option from './option';

const { sexTimeOption, sexAmountOption, ageTimeOption, ageAmountOption } = option;
// import sexTimeOption from './option/sexTimeOption';
// import sexAmountOption from './option/sexAmountOption';
// import ageTimeOption from './option/ageTimeOption';
// import ageAmountOption from './option/ageAmountOption';
// import factorSSZSBuyOption from './option/factorSSZSBuyOption';
// import factorSSZSRedeemOption from './option/factorSSZSRedeemOption';
// import factorHS300BuyOption from './option/factorHS300BuyOption';
// import factorHS300RedeemOption from './option/factorHS300RedeemOption';
// import factorP2PBuyOption from './option/factorP2PBuyOption';
// import factorP2PRedeemOption from './option/factorP2PRedeemOption';
// import factorGZBuyOption from './option/factorGZBuyOption';
// import factorGZRedeemOption from './option/factorGZRedeemOption';
// import factorSHYHJBuyOption from './option/factorSHYHJBuyOption';
// import factorSHYHJRedeemOption from './option/factorSHYHJRedeemOption';
// import factorYHJBuyOption from './option/factorYHJBuyOption';
// import factorYHJRedeemOption from './option/factorYHJRedeemOption';

// 宏观因子
const MACRO_FACTOR = {
  SSZS: 'buy_redeem_trend', // 申赎走势
  HS300: 'hs300_close', // 泸深300指数
  P2P: 'p2p_interest_index', // P2P利率指数
  GZ: 'bond204_turnoverValue', // 国债换手率
  SHYHJTY: 'Shibor_rate', // 上海银行间同业拆放利率
  YHJTY: 'Inter_bank_lending_day_turnoverValue' // 银行间同业拆借行情
};

class DataInsight extends React.Component {

  state = {
    sexType: TIME_AMOUNT.TIME,
    ageType: TIME_AMOUNT.TIME,
    feature: MACRO_FACTOR.SSZS
  }

  onSexTypeChange = (e) => {
    this.setState({
      sexType: e.target.value
    });
  }

  onAgeTypeChange = (e) => {
    this.setState({
      ageType: e.target.value
    });
  }

  onFeatureChange = (e) => {
    this.setState({
      feature: e.target.value
    });
  }

  getFactorBuyOption = (feature, type) => {
    const typeStr = type === BUY_REDEEM.BUY ? 'Buy' : 'Redeem';
    switch (feature) {
      case MACRO_FACTOR.SSZS:
        return option[`factorSSZS${typeStr}Option`];
      case MACRO_FACTOR.HS300:
        return option[`factorHS300${typeStr}Option`];
      case MACRO_FACTOR.P2P:
        return option[`factorP2P${typeStr}Option`];
      case MACRO_FACTOR.GZ:
        return option[`factorGZ${typeStr}Option`];
      case MACRO_FACTOR.SHYHJTY:
        return option[`factorSHYHJ${typeStr}Option`];
      case MACRO_FACTOR.YHJTY:
        return option[`factorYHJ${typeStr}Option`];
      default:
        return {};
    }
  }

  render() {
    const { sexType, ageType, feature } = this.state;
    const isSexTime = sexType === TIME_AMOUNT.TIME;
    const isAgeTime = ageType === TIME_AMOUNT.TIME;
    const isBuyRedeemTrendFeature = feature === MACRO_FACTOR.SSZS;
    const sexBuyChartProps = {
      site: 'mftp',
      url: '/api/v1/feature_exploring/sex_distributed/{sexType}/buy',
      params: { sexType },
      option: isSexTime ? sexTimeOption : sexAmountOption
    };
    const sexRedeemChartProps = {
      site: 'mftp',
      url: '/api/v1/feature_exploring/sex_distributed/{sexType}/redeem',
      params: { sexType },
      option: isSexTime ? sexTimeOption : sexAmountOption
    };
    const ageBuyChartProps = {
      site: 'mftp',
      url: '/api/v1/feature_exploring/age_distributed/{ageType}/buy',
      params: { ageType },
      option: isAgeTime ? ageTimeOption : ageAmountOption
    };
    const ageRedeemChartProps = {
      site: 'mftp',
      url: '/api/v1/feature_exploring/age_distributed/{ageType}/redeem',
      params: { ageType },
      option: isAgeTime ? ageTimeOption : ageAmountOption
    };
    const factorBuyChartProps = {
      site: 'mftp',
      url: isBuyRedeemTrendFeature
        ? '/api/v1/feature_exploring/select_his_trends/buy'
        : '/api/v1/feature_exploring/select_target_and_feature/daily_buy_amounts/{feature}',
      params: isBuyRedeemTrendFeature ? {} : { feature },
      option: this.getFactorBuyOption(feature, BUY_REDEEM.BUY)
    };
    const factorRedeemChartProps = {
      site: 'mftp',
      url: isBuyRedeemTrendFeature
        ? '/api/v1/feature_exploring/select_his_trends/redeem'
        : '/api/v1/feature_exploring/select_target_and_feature/daily_redeem_amounts/{feature}',
      params: isBuyRedeemTrendFeature ? {} : { feature },
      option: this.getFactorBuyOption(feature, BUY_REDEEM.REDEEM)
    };
    return (
      <div>
        <div className="title-group m-b-10">
          性别与申赎关系
        </div>
        <div className="shadow-box">
          <Row className="title-group m-b-10">
            <Radio.Group defaultValue={TIME_AMOUNT.TIME} onChange={this.onSexTypeChange}>
              <Radio.Button value={TIME_AMOUNT.TIME}>次数</Radio.Button>
              <Radio.Button value={TIME_AMOUNT.AMOUNT}>金额</Radio.Button>
            </Radio.Group>
          </Row>
          <Row type="flex"
            style={{ height: '300px' }}
            justify="space-between">
            <Col span={12}>
              <Chart {...sexBuyChartProps} />
            </Col>
            <Col span={12}>
              <Chart {...sexRedeemChartProps} />
            </Col>
          </Row>
        </div>
        <div className="title-group m-y-10">
          年龄与申赎关系
        </div>
        <div className="shadow-box">
          <Row className="title-group m-b-10">
            <Radio.Group defaultValue={TIME_AMOUNT.TIME} onChange={this.onAgeTypeChange}>
              <Radio.Button value={TIME_AMOUNT.TIME}>次数</Radio.Button>
              <Radio.Button value={TIME_AMOUNT.AMOUNT}>金额</Radio.Button>
            </Radio.Group>
          </Row>
          <Row type="flex"
            style={{ height: '300px' }}
            justify="space-between">
            <Col span={12}>
              <Chart {...ageBuyChartProps} />
            </Col>
            <Col span={12}>
              <Chart {...ageRedeemChartProps} />
            </Col>
          </Row>
        </div>
        <div className="title-group m-y-10">
          申赎与宏观因子
        </div>
        <div className="shadow-box">
          <Row className="title-group m-b-10">
            <Radio.Group defaultValue={MACRO_FACTOR.SSZS} onChange={this.onFeatureChange}>
              <Radio.Button value={MACRO_FACTOR.SSZS}>申赎走势</Radio.Button>
              <Radio.Button value={MACRO_FACTOR.HS300}>泸深300指数</Radio.Button>
              <Radio.Button value={MACRO_FACTOR.P2P}>P2P利率指数</Radio.Button>
              <Radio.Button value={MACRO_FACTOR.GZ}>国债换手率</Radio.Button>
              <Radio.Button value={MACRO_FACTOR.SHYHJTY}>上海银行间同业拆放利率</Radio.Button>
              <Radio.Button value={MACRO_FACTOR.YHJTY}>银行间同业拆借行情</Radio.Button>
            </Radio.Group>
          </Row>
          <Row type="flex"
            justify="space-between">
            <Col span={12} style={{ height: '500px' }}>
              <Chart {...factorBuyChartProps} />
            </Col>
            <Col span={12} style={{ height: '500px' }}>
              <Chart {...factorRedeemChartProps} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default DataInsight;
