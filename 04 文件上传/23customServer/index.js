const express = require('express')
const path = require('path')

const app = express()

// 托管后的资源通过 /XXX访问
app.use(express.static('lib'))
app.use(express.static('src'))

app.get('/', (req, res) => {
  // 像这种是直接将具体文件发送到客户端，与暴露一整个文件夹相比这种似乎跟安全
  // res.sendFile(path.resolve(__dirname, './src/23 文件分片上传Demo.html'))

  // 而且这种托管整个文件夹的方式有个注意点，就是假如lib当中也有一个index.html 那么服务器就不知道返回哪一个资源
  // 感兴趣的可以添加看一看 所以上面的方式也不是不好 酌情使用
  res.redirect('/index.html')
})

app.use

app.listen(4000, () => {
  console.log('server running is http://localhost:4000');
})