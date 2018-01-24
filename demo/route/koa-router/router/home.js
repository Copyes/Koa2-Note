const router = require('koa-router')

module.exports = router.get('/', async ctx => {
  let html = `
    <ul>
      <li><a href="/api/get/data.json">/api/get/data.json</a></li>
      <li><a href="/api/get/user.json">/api/get/user.json</a></li>
    </ul>
  `
  ctx.body = html
})
