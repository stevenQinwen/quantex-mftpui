export default function option(data, commonConfig) {
  const buildSeries = () => {
    const series = commonConfig.buildSeries(data, 'line');
    series[1].yAxisIndex = 1;
    return series;
  };
  return {
    backgroundColor: "#fff",
    title: {
      text: '申购金额与银行间同业拆借行情（周平滑）',
      subtext: '纵轴：左边-申购金额 / 右边-银行间同业拆借行情',
      padding: 18,
      textStyle: {
        fontWeight: "normal",
        fontSize: 16
      },
      subtextStyle: {
        color: '#666',
        fontSize: 14
      }
    },
    legend: {
      top: 65,
      data: commonConfig.buildLegendData(data[1])
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        return commonConfig.buildTooltipData(params, { precision: 2, unitPrefix: ' ' });
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
    grid: {
      left: "3%",
      right: "4%",
      bottom: "40",
      top: 95,
      containLabel: true
    },
    series: buildSeries(),
    dataZoom: commonConfig.buildDataZoom(data[0])
  };
}
