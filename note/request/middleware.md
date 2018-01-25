## koa-bodyparser 中间件

### 原理

对于 POST 请求的处理，koa-bodyparser 中间件可以把 koa2 上下文的 formData 数据解析到 ctx.request.body 中

### 例子

```js
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())
app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    ctx.body = '404'
  }
})
app.listen(3000, () => {
  console.log('[demo] test middleware koa-bodyparser')
})
```
