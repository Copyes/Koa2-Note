const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('[quick] koa is listening at port 3000')
})
