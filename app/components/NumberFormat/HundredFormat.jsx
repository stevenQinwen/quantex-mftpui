import NumberFormat from './NumberFormat';

// 百元
class HundredFormat extends NumberFormat {
}

HundredFormat.defaultProps = {
  ...NumberFormat.defaultProps,
  scale: 100
};

export default HundredFormat;
