const express = require('express')
const path = require('path')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// 定义存放文件夹
const UPLOAD_DIRNAMR = path.resolve(__dirname, 'uploads')

app.post('/upload', function (req, res) {
  const form = new multiparty.Form()
  // form.parse会对文件上传的数据做一个分割，将普通数据和二进制源文件数据分开
  // 二进制源文件就是files，普通数据就是fields
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(401).json({
        ok: false,
        msg: '上传失败'
      })
      return
    }
    const fileHash = fields['fileHash'][0]
    const chunkHash = fields['chunkHash'][0]
    // 将切片数据临时存放到一个文件夹
    const chunkPath = path.resolve(UPLOAD_DIRNAMR, fileHash)
    // 检验有没有这个文件的上传记录 没有创建上传目录
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath)
    }
    // 将切片存放到这个文件夹下
    const oldPath = files['chunk'][0]['path']
    await fse.move(oldPath, path.resolve(chunkPath, chunkHash))
    res.status(200).json({
      ok: true,
      msg: '上传成功'
    })
  })
})

app.post('/mergechunk', function (req, res) {
  const { fileHash, fileName, size } = req.body
  console.log(fileHash, fileName, size);
  res.status(200).json({
    ok: true,
    msg: '合并成功'
  })
})

app.listen(8888, () => {
  console.log('server is running on port 8080');
})