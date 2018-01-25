## 使用 GET 请求数据

### 使用方法

在 koa 中，获取 GET 请求数据源头是 koa 中 request 对象中的 query 方法或 querystring 方法，query 返回是格式化好的参数对象，querystring 返回的是请求字符串，由于 ctx 对 request 的 API 有直接引用的方式，所以获取 GET 请求数据有两个途径。

* 1、是直接从上下文中获取
  * 请求对象 ctx.query, 返回对象 {a:1, b:2}
  * 请求对象 ctx.queryString, 返回字符串 a=1&b=2
* 2、是从上下文中的 request 对象中获取
  * 请求对象 ctx.request.query,返回对象 {a:1,b:2}
  * 请求对象 ctx.request.queryString, 返回字符串 a=1&b=2

### 使用例子

```js
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
```
