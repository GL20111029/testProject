const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3000

app.use(express.static('/index', path.join(__dirname, './文件上传.html')))
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
	destination: uploadDir,
	filename: function (req, file, callback) {
		let ext = path.extname(file.originalname)
		let name = path.basename(file.originalname, ext)
		let chunk = req.body.chunk
		callback(null, `${name}-${chunk}${ext}`)
	},
})

const upload = multer({
	storage: storage,
})
app.post('/upload', upload.single('file'), function (req, res) {
	let chunk = parseInt(req.body.chunk)
	let totalChunks = parseInt(req.body.totalChunks)

	if (chunk === totalChunks - 1) {
		// 所有切片上传完成，将所有切片合并成一个文件
		let ext = path.extname(req.file.originalname)
		let name = path.basename(req.file.originalname, ext)
		let filePath = path.join(uploadDir, `${name}${ext}`)

		let writeStream = fs.createWriteStream(filePath)
		for (let i = 0; i < totalChunks; i++) {
			let chunkFilePath = path.join(uploadDir, `${name}-${i}${ext}`)
			let readStream = fs.createReadStream(chunkFilePath)
			readStream.pipe(writeStream)
		}

		writeStream.on('close', function () {
			// 删除所有切片文件
			for (let i = 0; i < totalChunks; i++) {
				let chunkFilePath = path.join(uploadDir, `${name}-${i}${ext}`)
				fs.unlinkSync(chunkFilePath)
			}

			res.sendStatus(200)
		})
	} else {
		res.sendStatus(200)
	}
})

app.listen(PORT, function () {
	console.log(`文件切片上传示例运行在 http://localhost:${PORT}`)
})
