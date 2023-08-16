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

// 定义提取文件名的函数
const extractExt = filename => {
  return filename.slice(filename.lastIndexOf('.'), filename.length)
}

// 取出文件夹中的所有切块的集合
const createUploadedList = async (fileHash) => {
  const pathLink = path.resolve(UPLOAD_DIRNAMR, fileHash)
  return fse.existsSync(pathLink) ? fse.readdirSync(pathLink) : []
}

// 定义校验文件是否已上传接口
app.post('/verify', async function (req, res) {
  const { fileHash, fileName } = req.body
  if (fse.existsSync(path.resolve(UPLOAD_DIRNAMR, fileHash + extractExt(fileName)))) {
    res.status(200).json({
      ok: true,
      msg: '文件已存在 停止上传',
      data: {
        showUpload: false
      }
    })
    return
  }
  // 如果不存在该文件合并后的样例存在，那么继续上传
  res.status(200).json({
    ok: true,
    data: {
      showUpload: true,
      // 已上传文件
      uploadList: await createUploadedList(fileHash)
    }
  })
})

// 定义上传接口
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
    fse.existsSync(UPLOAD_DIRNAMR) || await fse.mkdir(UPLOAD_DIRNAMR)
    // 将切片数据临时存放到一个文件夹
    const chunkPath = path.resolve(UPLOAD_DIRNAMR, fileHash)
    // 检验有没有这个文件的上传记录 没有创建上传目录
    fse.existsSync(chunkPath) || await fse.mkdir(chunkPath)
    // 将切片存放到这个文件夹下
    const oldPath = files['chunk'][0]['path']
    try {
      await fse.move(oldPath, path.resolve(chunkPath, chunkHash))
    } catch (reson) {
      console.log(`上传出现问题 问题切片： ${chunkHash},该切片可能已存在`);
      res.status(401).json({
        ok: false,
        msg: `上传出现问题 问题切片： ${chunkHash}`
      })
      return
    }
    res.status(200).json({
      ok: true,
      msg: '上传成功'
    })
  })
})

// 切片合并
app.post('/mergechunk', async function (req, res) {
  const { fileHash, fileName, size } = req.body
  // 假设已经存在该文件，那就不用合并了
  const filePath = path.resolve(UPLOAD_DIRNAMR, fileHash + extractExt(fileName))
  if (fse.existsSync(filePath)) {
    res.status(200).json({
      ok: true,
      msg: '合并成功'
    })
    return
  }

  const chunkDir = path.resolve(UPLOAD_DIRNAMR, fileHash)
  // 判断切片缓存文件夹是否存在
  if (!fse.existsSync(chunkDir)) {
    res.status(401).json({
      ok: false,
      msg: '请重新上传'
    })
  }

  // 合并操作
  const chunkPaths = await fse.readdir(chunkDir)
  // 对读取到的文件名进行排序
  chunkPaths.sort((a, b) => a.split('_')[1] - b.split('_')[1])
  const chunkList = chunkPaths.map((item, index) => {
    return new Promise((t, f) => {
      const chunkPath = path.resolve(chunkDir, item)
      const readStream = fse.createReadStream(chunkPath)
      const writeStream = fse.createWriteStream(filePath, {
        start: index * size,
        end: (index + 1) * size
      })
      readStream.on('end', () => {
        fse.unlink(chunkPath)
        t()
      })
      readStream.pipe(writeStream)
    })
  })
  await Promise.all(chunkList)
  fse.remove(chunkDir)
})

app.listen(8888, () => {
  console.log('server is running on port 8888');
})