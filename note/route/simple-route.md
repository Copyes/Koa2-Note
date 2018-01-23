## koa2 原生路由实现

### 简单例子

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  let url = ctx.request.url
  ctx.body = url
})
app.listen(3000)
```

当我们访问 http://localhost:3000/hello 的时候页面会输出 /hello 也就是说上下文的请求 request 对象中 url 之就是当前访问的路径名称，可以根据 ctx.request.url 通过一定的判断或者正则匹配就可以定制出所需要的路由。

### 简单定制路由

页面结构：

```js
├── index.js
└── views
    ├── 404.html
    ├── error.html
    ├── index.html
    └── todo.html
```

```js
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
```

### 运行代码

```js
node demo/route/simple-route/index.js
```

浏览器访问：http://localhost:3000/index.html
