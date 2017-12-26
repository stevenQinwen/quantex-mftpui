export default function option(data, commonConfig) {
  const buildSeries = () => {
    const series = commonConfig.buildSeries(data, 'line');
    series[0].yAxisIndex = 1;
    series[0].xAxisIndex = 1;
    series[1].yAxisIndex = 0;
    series[1].xAxisIndex = 0;
    return series;
  };
  const buildDataZoom = () => {
    const dataZoom = commonConfig.buildDataZoom(data[0]);
    dataZoom[0].xAxisIndex = [0, 1];
    dataZoom[1].xAxisIndex = [0, 1];
    return dataZoom;
  };
  return {
    backgroundColor: "#fff",
    title: {
      text: '每日申购金额与次数',
      padding: 18,
      textStyle: {
        fontWeight: "normal",
        fontSize: 16
      }
    },
    legend: {
      top: 45,
      data: commonConfig.buildLegendData(data[1])
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        return commonConfig.buildTooltipData(params, { precision: 2, unitPrefix: ' ' });
      }
    },
    axisPointer: {
      link: {
        xAxisIndex: 'all'
      }
    },
    xAxis: [
      {
        type: "category",
        data: data[0],
        axisLine: {
          lineStyle: {
            color: commonConfig.constants.axisLineColor
          }
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: commonConfig.constants.axisLabelColor
          }
        },
        axisTick: {
          show: false
        }
      }, {
        gridIndex: 1,
        type: "category",
        data: data[0],
        axisLine: {
          lineStyle: {
            color: commonConfig.constants.axisLineColor
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: commonConfig.constants.axisLabelColor
          }
        },
        axisTick: {
          show: false
        }
      }],
    yAxis: [
      {
        type: "value",
        nameTextStyle: {
          color: commonConfig.constants.axisLabelColor
        },

        axisLine: {
          lineStyle: {
            color: commonConfig.constants.axisLineColor
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: commonConfig.constants.axisLabelColor
          },
          formatter: function (value) {
            return commonConfig.beautyNumber(value, { precision: 0, unitPrefix: ' ' });
          }
        },
        axisTick: {
          show: false
        }
      }, {
        gridIndex: 1,
        type: "value",
        nameTextStyle: {
          color: commonConfig.constants.axisLabelColor
        },

        axisLine: {
          lineStyle: {
            color: commonConfig.constants.axisLineColor
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: commonConfig.constants.axisLabelColor
          },
          formatter: function (value) {
            return commonConfig.beautyNumber(value, { precision: 0, unitPrefix: ' ' });
          }
        },
        axisTick: {
          show: false
        }
      }],
    grid: [{
      left: "3%",
      right: "4%",
      top: 80,
      height: '38%',
      containLabel: true
    }, {
      left: "3%",
      right: "4%",
      bottom: "40",
      top: '54%',
      height: '38%',
      containLabel: true
    }],
    series: buildSeries(),
    dataZoom: buildDataZoom()
  };
}
