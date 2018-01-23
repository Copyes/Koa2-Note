## koa2 快速起步

#### 环境准备

* 因为 node.js v7.6.0 开始完全支持 async/await，所以 node.js 环境都要 7.6.0 以上
* npm 或者 yarn

#### 快速开始

```js
npm init

npm install koa
或
yarn add koa
```

#### hello world

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('[quick] koa is listening at port 3000')
})
```

#### 启动 demo

```js
node demo/start/quick.js
```

访问 http:localhost:3000
