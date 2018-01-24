const Koa = require('koa')
const fs = require('fs')
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
