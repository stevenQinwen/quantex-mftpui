/**
 * 生产环境下的服务配置
 */
const ApiConfig = {
  isDebug: false, // true：本地调试开发，false：线上版本
  base: "https://10.0.74.201",
  domain: {
    auth: "https://10.0.74.201/auth2",
    qaw: 'https://10.0.74.201/qaw2',
    qow: 'https://10.0.74.201/qow',
    qcw: 'https://10.0.74.201/qcw',
    qtw: 'https://10.0.74.201/qtw2',
    qdw: 'https://10.0.74.201/qdw2',
    redisadmin: 'https://10.0.74.201/redisadmin',
    msgcenter: 'wss://10.0.74.201/msgcenter',
    pubstorage: 'https://10.0.74.201/pubstorage'
  },
  autoUpdate: 'http://10.0.74.31:1337',
};
// export default ApiConfig;
module.exports = ApiConfig;
