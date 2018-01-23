const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()

function render(page) {
  return new Promise((resolve, reject) => {
    let filePath = `./views/${page}`
    fs.readFile(path.resolve(__dirname, filePath), 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function route(url) {
  let view = '404.html'
  switch (url) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/error':
      view = 'error.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
  }
  let html = render(view)
  return html
}

app.use(async function(ctx) {
  let url = ctx.request.url
  let html = await route(url)
  ctx.body = html
})
app.listen(3000)
console.log('[demo] route-simple is starting at port 3000')
