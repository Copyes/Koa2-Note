const Koa = require('koa')
const log = require('./middleware/log')

const app = new Koa()

app.use(log())
app.use(ctx => {
  ctx.body = 'hello world'
})
app.listen(3000, () => {
  console.log('test middleware')
})
