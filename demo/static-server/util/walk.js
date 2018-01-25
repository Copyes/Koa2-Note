const fs = require('fs')
const mimes = require('./mimes')
/**
 * 遍历目录内容
 * @param {*} reqPath
 */
const walk = reqPath => {
  let files = fs.readdirSync(reqPath)
  let dirList = [],
    fileList = []
  for (let i = 0; i < files.length; ++i) {
    let item = files[i]
    let itemArr = item.split('.')
    let itemMime =
      itemArr.length > 1 ? itemArr[itemArr.length - 1] : 'undefined'
    if (typeof itemMime === 'undefined') {
      dirList.push(item)
    } else {
      fileList.push(item)
    }
  }

  return dirList.concat(fileList)
}
module.exports = walk
