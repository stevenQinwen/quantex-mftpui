/**
 * 生产模式下打包 dev(10.0.74.200) 环境的服务配置
 */
const ApiConfig = {
  isDebug: false, // true：本地调试开发，false：线上版本
  base: "/",
  domain: {
    auth: "/auth2",
    qaw: '/qaw2',
    qow: '/qow',
    qcw: '/qcw',
    qtw: '/qtw2',
    qdw: '/qdw2',
    redisadmin: '/redisadmin',
    msgcenter: '/msgcenter',
    pubstorage: '/pubstorage'
  }
};
// export default ApiConfig;
module.exports = ApiConfig;
