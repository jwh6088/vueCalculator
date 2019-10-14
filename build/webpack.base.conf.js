//webpack基础配置
'use strict'
//引入nodejs路径模块
const path = require('path')
//引入utils模块
const utils = require('./utils')
//引入config目录下的index.js配置文件，主要用来定义一些开发和生产环境的属性
const config = require('../config')
//此文件用来解决各种css文件，定义了诸如css，less，sass之类的样式和有关的loader
const vueLoaderConfig = require('./vue-loader.conf')

//此函数是用来返回当前目录的平行目录的路径，因为有个'..'
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    //入口文件是src目录下的main.js
    app: ['babel-polyfill','./src/main.js']
  },
  output: {
    //路径是config目录下的index.js中的build配置中的assetsRoot，也就是dist目录
    path: config.build.assetsRoot,
    //文件名称这里使用默认的name也就是main
    filename: '[name].js',
    //上线地址，也就是真正的文件引用路径，如果是production生产环境，其实这里都是 '/'
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    //resolve是webpack的内置选项，顾名思义，决定要做的事情，也就是说当使用import "jquery"，
    //该如何去执行这件事情就是resolve配置项要做的，
    //import jQuery from "./additional/dist/js/jquery"
    //这样会很麻烦，可以起个别名简化操作
    extensions: ['.js', '.vue', '.json'],
    alias: {
      //后面的$符号指精确匹配，
      //也就是说只能使用 import vuejs from "vue"
      //这样的方式导入vue.esm.js文件，不能在后面跟上 vue/vue.js
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  //module用来解析不同的模块
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        // 也就是说，对.js和.vue文件在编译之前进行检测，检查有没有语法错误'eslint-loader'
        // enforce: 'pre'选项可以确保，eslint插件能够在编译之前检测，如果不添加此项，就要把这个配置项放到末尾，确保第一个执行
        // 对vue文件使用vue-loader，该loader是vue单文件组件的实现核心，专门用来解析.vue文件的
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // 对js文件使用babel-loader转码,该插件是用来解析es6等代码
        loader: 'babel-loader',
        // 指明src和test目录下的js文件要使用该loader
        include: [
          resolve('src'), 
          resolve('test'), 
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/element-ui/src'),
          resolve('node_modules/element-ui/package/input/src'),
          resolve('node_modules/vue-echarts'),
          resolve('node_modules/resize-detector')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // 对图片相关的文件使用 url-loader 插件，这个插件的作用是将一个足够小的文件生成一个64位的DataURL
        // 可能有些老铁还不知道 DataURL 是啥，当一个图片足够小，为了避免单独请求可以把图片的二进制代码变成64位的
        // DataURL，使用src加载，也就是把图片当成一串代码，避免请求
        loader: 'url-loader',
        options: {
          // 限制 10000 个字节一下的图片才使用DataURL
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        // 文件处理
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        // 字体处理
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
