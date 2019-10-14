/*这里面在webpack.base.conf的基础上增加完善了开发环境下面的配置，主要包括下面几件事情：
1.将webpack的热重载客户端代码添加到每个entry对应的应用
2.合并基础的webpack配置
3.配置样式文件的处理规则，styleLoaders
4.配置Source Maps
5.配置webpack插件
*/

'use strict'
// 引入当前目录中的utils工具配置文件
const utils = require('./utils')
// 引入webpack来使用他的内置插件
const webpack = require('webpack')
// 引入config目录中的index.js配置文件
const config = require('../config')
//webpack-merge 用来合并webpack配置对象，也就是说可以把webpack配置文件拆分成几个小的模块，然后合并
const merge = require('webpack-merge')
const path = require('path')
//引入当前目录下的webpack.base.conf.js配置文件，主要配置的是打包各种文件类型的配置
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//html-webpack-plugin插件是用来生成html文件的，有很灵活的配置项
const HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-errors-webpack-plugin是用来把webpack的错误和日志收集起来，漂亮的展示给用户
/*安装 npm install friendly-errors-webpack-plugin --save-dev
 基本使用
 plugins: [
   new FriendlyErrorsWebpackPlugin(),
 ]
 注意点，使用这个插件要遵守下点
 您需要关闭所有的错误日志记录，将webpack配置静默选项设置为true
 也就是遵循以下三点即可
 在使用webpack-dev-middleware插件，设置以下内容
 app.use(require('webpack-dev-middleware')(compiler, {
   quiet: true, // 必须设置
   publicPath: config.output.publicPath,
 }));
 使用webpack-dev-server时设置如下
 {
   devServer: {
     quiet: true
   }
 }
 使用webpack-hot-middleware中间件
 app.use(require('webpack-hot-middleware')(compiler, {
   log: () => {}
 }));*/
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//下面是合并配置对象，将这个配置文件特有的配置添加到base配置文件中
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    //下面是把utils配置中的处理css类似文件的处理方法拿过来，并且不生成cssMap文件
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // debtool是开发工具选项，用来指定如何生成sourcemap文件，cheap-module-eval-source-map此款soucemap文件性价比最高
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // DefinePlugin内置webpack插件，专门用来定义全局变量的，下面定义一个全局变量 process.env 并且值是如下
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // 当webpack编译错误的时候，来中断打包进程
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',// 生成的文件的名称
      template: 'index.html',// 可以指定模块html文件
      inject: true // 设置为true表示把所有的js文件都放在body标签的屁股
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
