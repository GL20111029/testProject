const express = require('express')
const path = require('path')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/upload', function (req, res) {
  const form = new multiparty.Form()
  // form.parse会对文件上传的数据做一个分割，将普通数据和二进制源文件数据分开
  // 二进制源文件就是files，普通数据就是fields
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(401).json({
        ok: false,
        msg: '上传失败'
      })
    }

    // 将切片数据临时存放到一个文件夹
    
    res.status(200).json({
      ok: true,
      msg: '上传成功'
    })
  })
})

app.listen(8888, () => {
  console.log('server is running on port 8080');
})