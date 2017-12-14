import NumberFormat from './NumberFormat';

class PercentFormat extends NumberFormat {
}

PercentFormat.defaultProps = {
  ...NumberFormat.defaultProps,
  scale: 0.01,
  suffix: '%'
};

export default PercentFormat;
