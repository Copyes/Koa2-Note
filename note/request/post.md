## 使用 post 请求数据

对于 POST 请求的处理，koa2 没有封装获取参数的方法，需要通过解析上下文 context 中的原生 node.js 请求对象 req，将 POST 表单数据解析成 query string（例如：a=1&b=2&c=3），再将 query string 解析成 JSON 格式（例如：{"a":"1", "b":"2", "c":"3"}）

> 注意：ctx.request 是 context 经过封装的请求对象，ctx.req 是 context 提供的 node.js 原生 HTTP 请求对象，同理 ctx.response 是 context 经过封装的响应对象，ctx.res 是 context 提供的 node.js 原生 HTTP 请求对象

### 解析 post 请求上下文中的参数

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.body = `
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
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = await parsePostData(ctx)
    ctx.body = postData
  } else {
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ''
      ctx.req.addListener('data', data => {
        postData += data
      })
      ctx.req.addListener('end', () => {
        let parseData = parseQueryStr(postData)
        resolve(parseData)
      })
    } catch (e) {
      reject(e)
    }
  })
}

function parseQueryStr(str) {
  let queryData = {}
  let queryStringList = str.split('&')
  console.log(queryStringList)
  for (let [index, queryStr] of queryStringList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('[demo] test post request')
})
```
