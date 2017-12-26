export default function option(data, commonConfig) {
  return {
    backgroundColor: "#fff",
    title: {
      text: '用户性别分布',
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
        return commonConfig.buildTooltipData(params, { precision: 0, unitPrefix: ' ' });
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
        name: "单位：人",
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
            return commonConfig.beautyNumber(value, { precision: 2, unitPrefix: ' ' });
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
      top: 80,
      containLabel: true
    },
    series: commonConfig.buildSeries(data, 'bar').map((serie) => {
      serie.barWidth = 50;
      return serie;
    }),
    dataZoom: commonConfig.buildDataZoom(data[0])
  };
}
