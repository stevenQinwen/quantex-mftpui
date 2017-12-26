import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { debounce, isFunction, isEqual } from 'lodash';
import { API } from 'utils';
import util from './util';
import Alert from '../Alert';
import styles from './index.scss';

class ChartComponent extends React.Component {

  state = {
    chartData: []
  };
  triggerResize = debounce(() => {
    this.getEchartsInstance().resize();
  }, 200);

  constructor(props) {
    super(props);
    this.api = new API(props.site);
  }

  componentDidMount() {
    window.addEventListener("resize", this.triggerResize);
    this.fetchChartData();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.triggerResize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.shouldFetchChartDataWhenPropsChange(nextProps)) {
      this.fetchChartData(nextProps);
    }
  }

  /**
   * 当 props 发生变化时是否需要重新请求数据
   * @param nextProps
   * @returns {*|boolean}
   */
  shouldFetchChartDataWhenPropsChange = (nextProps) => {
    const { option, url, site, params } = this.props;
    if (isFunction(option)) {
      return (
        !isEqual(url, nextProps.url)
        || !isEqual(site, nextProps.site)
        || !isEqual(params, nextProps.params)
      );
    }
    return false;
  }

  /**
   * 获取组件实例的真实 Dom 节点
   */
  getEchartsInstance = () => {
    return this.reactEcharts.getEchartsInstance();
  };

  /**
   * 请求图表数据
   * @param props
     */
  fetchChartData = (props = this.props) => {
    const { url, params } = props;
    if (!url) return;
    this.api.get(url, params).then((res) => {
      if (res.code == 200) {
        this.setState({ chartData: res.data.list });
      } else {
        Alert.error(res);
      }
    });
  }

  buildOption = () => {
    const { option } = this.props;
    const { chartData } = this.state;
    return isFunction(option)
      ? chartData.length
        ? option(util.buildChartData(chartData), util)
        : {}
      : option;
  }

  render() {
    const { url, site, params, option, className, ...pureProps } = this.props;
    const props = {
      theme: 'mftp',
      className: `${styles.root} react-echarts${className ? ' ' + className : ''}`,
      ref: (comp) => { this.reactEcharts = comp; },
      option: this.buildOption(),
      notMerge: true,
    };
    return (
      <ReactEcharts {...pureProps} {...props} />
    );
  }
}

ChartComponent.propTypes = {
  url: React.PropTypes.string,
  site: React.PropTypes.string,
  params: React.PropTypes.object,
  option: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.func
  ]).isRequired,
};

ChartComponent.defaultProps = {
  site: '',
  params: {},
};

ChartComponent.util = util;
export default ChartComponent;
