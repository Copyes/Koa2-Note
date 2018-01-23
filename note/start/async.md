## async/await 快速使用

### 首先运行下面代码

```js
function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve(data)
      }, 500)
    } catch (err) {
      reject(err)
    }
  })
}

async function getSyncData() {
  let time = await getSyncTime()
  let data = `endTime - startTime = ${time}`
  return data
}

async function getData() {
  let data = await getSyncData()
  console.log(data)
}

getData()
```

### async/await 特点

* 可以让异步逻辑用同步写法实现
* 最底层的 await 返回需要是 Promise 对象
* 可以通过多层 async function 的同步写法代替传统的 callback 嵌套