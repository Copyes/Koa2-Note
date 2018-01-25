const Koa = require('koa')
const path = require('path')
const mimes = require('./util/mimes')
const content = require('./util/content')

const app = new Koa()
const staticPath = './static'

function parseMime(url) {
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknow'
  return mimes[extName]
}

app.use(async ctx => {
  let fullStaticPath = path.resolve(__dirname, staticPath)
  let _content = await content(ctx, fullStaticPath)
  let _mime = parseMime(ctx.url)
  // 如果有对应的文件类型，就配置上下文的类型
  if (_mime) {
    ctx.type = _mime
  }
  // 图片输出
  if (_mime && _mime.indexOf('image/') > -1) {
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    ctx.body = _content
  }
})

app.listen(3000, () => {
  console.log('[demo] static-server is starting at port 3000')
})
