import InputNumber from './InputNumber';

class HundredNumber extends InputNumber {

}

HundredNumber.defaultProps = Object.assign({}, InputNumber.defaultProps, {
  scale: 100
});

export default HundredNumber;
