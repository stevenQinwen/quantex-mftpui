const path = require('path');
const webpack = require('webpack');

const vendors = [
  'antd',
  'echarts',
  'lodash',
  'mobx',
  'mobx-react',
  'react',
  'react-dom',
  'react-router',
  // ...其它库
];

module.exports = {
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    "lib": vendors,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname,
    }),
  ],
};
