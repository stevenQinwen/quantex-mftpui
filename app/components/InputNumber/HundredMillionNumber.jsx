import InputNumber from './InputNumber';

class HundredMillionNumber extends InputNumber {

}

HundredMillionNumber.defaultProps = Object.assign({}, InputNumber.defaultProps, {
  addonAfter: '亿',
  scale: 100000000,
  precision: 4
});

export default HundredMillionNumber;
