const constants = {
  axisLineColor: '#ccc', // 坐标轴线颜色
  axisLabelColor: '#444', // 坐标轴文字颜色
};

const thousand = (input) => {
  if (isNaN(input)) return input;

  let num = input + "";
  if (num.trim() == "") return input;

  let intPart = null;
  const pointIndex = num.indexOf(".");
  if (pointIndex > -1) {
    intPart = num.slice(0, pointIndex); // 整数部分
    const precision = num.slice(pointIndex); // 小数部分
    const abs = Math.abs(Number(intPart)); // 数值的绝对值
    if (abs >= 1000) {
      intPart = Number(intPart).toLocaleString();
    }
    num = intPart.concat(precision);
  } else {
    num = Number(num).toLocaleString();
  }
  return num;
};

const beautyNumber = (value, config) => {
  // 如果字符串则直接返回
  if (!(/^[+-]?\d+(\.\d+)?$/.test(value))) {
    return value;
  }

  let number = Number(value);
  const precision = config.precision || 0; // 精度
  let dUnit = null; // 数字单位
  const mUnit = config.unit || ''; // 计量单位
  const style = config.unitStyle || ''; // 单位样式类
  const prefix = (config.unitPrefix != null) ? config.unitPrefix : ''; // 数值与单位间的连接符号
  const isRedGreen = config.isRedGreen || false;
  const multiple = config.multiple;
  const abs = Math.abs(value); // 数值的绝对值
  const textStyle = config.textStyle || '';  // 数字样式,主要是font-family
  // 使用绝对值计算出最接近值的度量
  if (abs < 10000) { // 小于1万
    dUnit = '';
  } else if (abs < 100000000) { // 小于1亿
    dUnit = '万';
    number /= 10000;
  } else {
    dUnit = '亿';
    number /= 100000000;
  }

  // 如果存在倍数的配置，则乘以相应的倍数
  if (multiple != null && multiple != 0) {
    number *= Number(multiple);
  }

  // 如果小数位数多于两位，则保留两位小数
  const splitArr = (number + "").split('.');
  if (splitArr[1] && splitArr[1].length > precision) {
    number = number.toFixed(precision);
  }

  // 千万位显示格式化
  number = thousand(number);

  // 涨跌样式正数前加+
  if (isRedGreen && value > 0) {
    number = '+' + number;
  }

  // 拼凑对应的字符串并返回
  const dm = dUnit + mUnit;
  if (dm != '') {
    if (style) {
      return '<span class="' + textStyle + '">' + number + '</span>' + '<span class="' + style + '">' + prefix + dm + '</span>';
    } else {
      return number + prefix + dm;
    }
  } else {
    return number;
  }
};
/**
 * 处理‘tooltip’数据，根据需求显示百分比数据
 * @param params 图例数组或对象
 * @param config: {
 *  precision: 0, // 最多保留的精度，默认0位
 *  textStyle: '',// 文本样式，例如 <span class='xx'>12.3<span>万元</span></span>
 *  //
 *  unit: '', // 计量单位，例如 元、户、人、...
 *  unitStyle: '', // 单位的样式， 例如 <span class='xx'>万元</span>
 *  unitPrefix: '', // 单位的前缀, 例如 <span class='xx'>&nbsp;万元</span>
 * }
 * @returns {string}
 */
const buildTooltipData = (params, config) => {
  params = params || []; // 容空
  config = config || {}; // 容空
  config.unitStyle = config.unitStyle || 'digit-unit';

  let label = '';
  let paramsArr = [];
  const isPieChart = params.length == undefined; // 是否是饼图
  if (isPieChart) { // 饼状图返回的参数为对象
    paramsArr.push(params);
  } else {
    paramsArr = params;
  }

  paramsArr.forEach((series, index) => {
    const value = beautyNumber(series.value, config) || '暂无信息';
    // const value = series.value;
    const name = series.name;
    const serieName = series.seriesName;
    // tooltip 颜色圆点
    const icon = '<div style="width: 9px;height: 9px;display: inline-block;border-radius: 50%;vertical-align:middle;margin-right: 6px;background-color: ' + series.color + '"></div>';

    // 如果不是饼图，仅添加一次“数据名，类目名”
    if (!isPieChart) {
      if (index == 0) {
        label += name + '<br>';
      }
    }

    label += icon;
    if (isPieChart) {
      label += name;
    } else {
      label += serieName;
    }
    label += ' : ' + value + '</br>';
  });
  return label;
};

/**
 * 处理‘图例’数据，设置其的icon为‘circle’类型
 * @param data
 * @returns {Array}
 */
const buildLegendData = (data) => {
  data = data || []; // 容空
  const _data = [];
  data.forEach((item) => {
    const _item = {
      name: item,
      icon: 'circle'
    };
    _data.push(_item);
  });
  return _data;
};


/**
 * 构建图表底部拖放条
 * @param axis
 * @returns {*[]}
 */
const buildDataZoom = () => {
  const dataZoom = [{
    type: 'inside'
  }, {
    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    handleStyle: {
      color: '#fff',
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2
    }
  }];
  // 显示最近一个月
  // if (axis && axis.length >= 12) {
  //   const length = axis.length;
  //   dataZoom[0].startValue = length - 12;
  //   dataZoom[0].endValue = length;
  // } else {
  //   dataZoom[0].start = 0;
  //   dataZoom[0].end = 100;
  // }
  return dataZoom;
};

const buildJsonData = (data) => {
  const jsonData = [];
  data[2].forEach((item, i) => {
    jsonData.push({
      name: data[0][i],
      value: item
    });
  });
  return jsonData;
};

/**
   * 组装基础series data
   * @param data
   * @param type
   * @returns {Array}
   */
const buildSeries = (data, type) => {
  const legendData = data[1] || [];
  return legendData.map((name, index) => {
    return {
      name: name,
      type: type,
      data: data[index + 2]
    };
  });
};

/**
   * 处理后台返回的数据，格式化成统一的格式
   * data: [
       ['2016-07-01','2016-07-02'],
       ['点击','够买'],
       [200,300],
       [10,2]
    ],
   * @param type
   */
const buildChartData = (oriData = []) => {
  const legendData = []; // 图例数据
  const axisData = []; // 维度数据（X轴 or Y轴）
  const data = [legendData, axisData];
  for (let i = 0; i < oriData.length; i++) {
    const item = oriData[i];
    legendData.push(item.name);
    for (let j = 0; j < item.value.length; j++) {
      const vItem = item.value[j];
      let seriesData = null;
      if (i == 0) {
        seriesData = [];
        data.push(seriesData);
      } else {
        seriesData = data[j + 2];
      }
      seriesData.push(vItem.value);
      // 仅以第一项为准
      if (i == 0) {
        axisData.push(vItem.name);
      }
    }
  }
  // 针对饼图、地图等特殊图形，特殊处理
  if (data[1].length == 1) {
    data.push(buildJsonData(data));
  }
  return data;
};

export default {
  constants,
  thousand,
  beautyNumber,
  buildTooltipData,
  buildLegendData,
  buildDataZoom,
  buildJsonData,
  buildSeries,
  buildChartData
};
