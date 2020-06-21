const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://47.105.60.116:8002/', // target是api服务器地址
      changeOrigin: true, // 这个是是否替换这里一定要写true
      secure: false,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
  app.use(
    proxy('/api', {
      target: 'https://appweb.tijianbao.com/api',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
