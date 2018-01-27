## 前言

koa2 原生功能只提供了 cookie 的操作，但是没有提供 session 操作。session 就只用自己实现或者通过第三方中间件实现。在 koa2 中实现 session 的方案有一下几种

* 如果 session 数据量很小，可以直接存在内存中
* 如果 session 数据量很大，则需要存储介质存放 session 数据

### 数据库存储方案

* 将 session 存放在 MySQL 数据库中
* 需要用到中间件
  * koa-session-minimal 适用于 koa2 的 session 中间件，提供存储介质的读写接口 。
  * koa-mysql-session 为 koa-session-minimal 中间件提供 MySQL 数据库的 session 数据读写操作。
  * 将 sessionId 和对于的数据存到数据库
* 将数据库的存储的 sessionId 存到页面的 cookie 中
* 根据 cookie 的 sessionId 去获取对于的 session 信息

### 例子

```js
const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

let store = new MysqlSession({
  user: 'root',
  password: '123456',
  database: 'douban',
  host: '127.0.0.1'
})

// 存放sessionId的cookie配置
let cookie = {
  maxAge: '', // cookie有效时长
  expires: '', // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '', // 是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}

// 使用session中间件
app.use(
  session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
  })
)

app.use(async ctx => {
  if (ctx.url === '/set') {
    ctx.session = {
      uid: Math.random()
        .toString(36)
        .substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if (ctx.url === '/') {
    // 读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  }
})

app.listen(3000)
console.log('[demo] session is starting at port 3000')
```
