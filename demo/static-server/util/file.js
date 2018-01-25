const fs = require('fs')
/**
 * 获取文件内容方法
 * @param {*} filePath
 */
const file = filePath => {
  return fs.readFileSync(filePath, 'binary')
}
module.exports = file
