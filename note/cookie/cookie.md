## koa2 使用 cookie

### 使用方法

koa 提供了直接从上下文中获取、写入 cookie 的方法

* ctx.cookies.get(name, [option]) 读取上下文中的 cookie
* ctx.cookies.set(name, value, [option]) 设置上下文中的 cookie

koa2 中操作的 cookies 是使用了 npm 模块 cookie。 所以使用方法和 cookie 是一样的。

### 简单设置 cookie 的例子

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  if (ctx.url === '/index') {
    // 设置cookie
    ctx.cookies.set('cid', 'hello world', {
      domain: 'localhost', // 写cookie所在的域名
      path: '/index', // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date('2018-02-15'), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    })
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world'
  }
})

app.listen(3000, () => {
  console.log('[demo] cookie is starting at port 3000')
})
```
