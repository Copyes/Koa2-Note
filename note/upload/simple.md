## 上传文件的简单实现

### 安装依赖

```js
npm install busboy
```

### 上传步骤

* 通过表单提交文件相关数据
* 创建对应保存文件的文件夹
* 使用 busboy 监听文件事件，通过`file.pipe(fs.createWriteStream(saveTo))`输出文件
* 使用 busboy 监听失败事件
* 使用 busboy 监听完成事件
* 使用 busboy 监听错误事件

#### 核心代码

```js
const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

const mkdirSync = dirname => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

const getExtName = fileName => {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

const uploadFile = (ctx, options) => {
  let req = ctx.req
  let res = ctx.res

  let busboy = new Busboy({
    headers: req.headers
  })

  // 获取文件类型
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)

  let mkdirResult = mkdirSync(filePath)

  return new Promise((resolve, reject) => {
    console.log('文件开始上传.......')
    let result = {
      success: true,
      formData: {}
    }

    busboy.on('file', (filedname, file, filename, encoding, mimetype) => {
      let fileName =
        Math.random()
          .toString(16)
          .substr(2) +
        '.' +
        getExtName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)
      // 文件保存到指定路径
      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', () => {
        result.success = true
        result.message = '文件上传成功'
        console.log('文件上传成功！')
      })
    })
    busboy.on(
      'filed',
      (
        filedname,
        val,
        fieldnameTruncated,
        valTruncated,
        encoding,
        mimetype
      ) => {
        console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val))
        result.formData[fieldname] = inspect(val)
      }
    )
    busboy.on('finish', () => {
      console.log('文件上结束')
      resolve(result)
    })
    busboy.on('error', () => {
      console.log('文件上出错')
      reject(result)
    })
    req.pipe(busboy)
  })
}
module.exports = uploadFile
```
