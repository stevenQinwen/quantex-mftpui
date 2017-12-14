/**
 * 将金额转为大写金额显示(将数值大写显示)
 */
export default function uppercaseDigit(num) {
  if (num == '' || num == undefined) return ''; // 当输入为空时，不显示
  if (isNaN(num) || num >= 1000000000000) return '无效数值！';
  const capDgtArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unitArr = ['仟', '佰', '拾', '亿', '仟', '佰', '拾', '万', '仟', '佰', '拾', '元', '角', '分'];
  let strPrefix = ''; // 字符串前缀
  if (num < 0) strPrefix = '(负)';
  num = getNumWithFraction(num);
  unitArr = unitArr.slice(unitArr.length - num.length); // 获取数值中每位数字对应的单位 list
  let outPutTemp = simplifyStr(mixinCapDgtAndUnit(num, capDgtArr, unitArr));
  return strPrefix + outPutTemp;
}

/**
  * 获取带 角、分 的数值
  * @param {*} number
  */
function getNumWithFraction(number) {
  number = Math.abs(number);
  number += '00'; // 零角零分
  const intPos = number.indexOf('.'); // 小数点位
  // 若存在小数点，将整数部分与小数部分连接，即去掉小数点
  if (intPos >= 0) {
    number = number.substring(0, intPos) + number.substr(intPos + 1, 2);
  }
  return number;
}

/**
 * 混合数值对应的中文数字 & 中文单位，得到该数值对饮改的大写中文字串，如 101010 -> 壹拾零万壹仟零佰壹拾零元零角零分
 * @param {*} number
 * @param {*} capDgtArr
 * @param {*} unitArr
 */
function mixinCapDgtAndUnit(number, capDgtArr, unitArr) {
  const numLen = number.length;
  let outPutTemp = [];
  for (let i = 0; i < numLen; i++) {
    outPutTemp.push(capDgtArr[number.substr(i, 1)]);
    outPutTemp.push(unitArr[i]);
  }
  return outPutTemp;
}

/**
 * 精简中文字串(即去除无意义的中文字,如“零万”等)，如：壹拾零万壹仟零佰壹拾零元零角零分 -> 壹拾万壹仟零壹拾元整
 * @param {*} numberArr
 */
function simplifyStr(numberArr) {
  return numberArr.join("").replace(/零角零分$/, '整')
  .replace(/零[仟佰拾]/g, '零')
  .replace(/零{2,}/g, '零')
  .replace(/零([亿|万])/g, '$1')
  .replace(/零+元/, '元')
  .replace(/亿零{0,3}万/, '亿')
  .replace(/^元/, "零元");
}
