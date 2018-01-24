#### koa-router 的使用

如果依靠 ctx.request.url 去手动处理路由，将会写很多处理代码，这时候就需要对应的路由的中间件对路由进行控制，这里介绍一个比较好用的路由中间件 koa-router

#### 安装 koa-router

```js
npm install koa-router
```

#### 快速使用 koa-router

```js
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

let home = new Router()

home.get('/', async ctx => {
  ctx.body = `
    <a href="/page/404">page 404</a>
    <a href="/page/test">page 404</a>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  `
})

let page = new Router()

page
  .get('/404', async ctx => {
    ctx.body = '404'
  })
  .get('/test', async ctx => {
    ctx.body = 'test'
  })

// 挂载路由
let router = new Router()
router
  .use('/', home.routes(), home.allowedMethods())
  .use('/page', page.routes(), page.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('test route')
})
```
