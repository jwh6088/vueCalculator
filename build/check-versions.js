//此文件用来检测node和npm版本
'use strict'
// 下面的插件是chalk插件，他的作用是在控制台中输出不同的颜色的字
// 例：chalk.blue('Hello world')，这款插件只能改变命令行中的字体颜色
const chalk = require('chalk')
// 下面这个是semver插件，是用来对特定的版本号做判断的
const semver = require('semver')
// 下面是导入package.json文件,要使用里面的engines选项
const packageConfig = require('../package.json')
// shelljs插件，作用是用来执行Unix系统命令
const shell = require('shelljs')

// 脚本可以通过 child_process 模块新建子进程，从而执行 Unix 系统命令
// 下面这段代码实际就是把cmd这个参数传递的值转化成前后没有空格的字符串，也就是版本号
// require('child_process') node的模块，execSync(cmd)创建同步进程
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    // node版本的信息
    name: 'node',
    // 使用semver插件吧版本信息转化成规定格式，也就是 ' =v1.2.3 ' -> '1.2.3' 这种功能
    currentVersion: semver.clean(process.version),
    // 这是规定的pakage.json中engines选项的node版本信息 "node":">= 4.0.0"
    versionRequirement: packageConfig.engines.node
  }
]

//shell.which('npm')  返回：C:\PROGRAM FILES\NODEJS\NPM.CMD 返回绝对路径，否则返回null
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}
module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
//上面这个判断就是如果版本号不符合package.json文件中指定的版本号，就执行下面的代码

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
        // 把当前版本号用红色字体 符合要求的版本号用绿色字体 给用户提示具体合适的版本
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
  // 提示用户更新版本
}
