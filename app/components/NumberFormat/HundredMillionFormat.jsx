import NumberFormat from './NumberFormat';

// 亿元
class HundredMillionFormat extends NumberFormat {
}

HundredMillionFormat.defaultProps = {
  ...NumberFormat.defaultProps,
  scale: 100000000,
  precision: 4,
};

export default HundredMillionFormat;
