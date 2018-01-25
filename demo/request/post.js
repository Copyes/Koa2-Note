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
