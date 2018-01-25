const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  let url = ctx.url
  let request = ctx.request
  let req_query = request.query
  let req_query_str = request.queryString

  let ctx_query = ctx.query
  let ctx_query_str = ctx.queryString

  ctx.body = {
    url,
    req_query,
    req_query_str,
    ctx_query,
    ctx_query_str
  }
})

app.listen(3000, () => {
  console.log('[demo] test get request')
})
