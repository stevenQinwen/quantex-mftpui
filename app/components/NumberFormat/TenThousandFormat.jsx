import NumberFormat from './NumberFormat';

// 万元
class TenThousandFormat extends NumberFormat {
}

TenThousandFormat.defaultProps = {
  ...NumberFormat.defaultProps,
  scale: 10000
};

export default TenThousandFormat;
