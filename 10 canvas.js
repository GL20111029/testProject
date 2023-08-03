(function () {
	// 选择上传的文件
	let fileInput = document.getElementById('file-input')
	let img = new Image()
	let canvas = document.body.querySelector('#canvas')

	fileInput.addEventListener('change', (res) => {
		const fileReader = new FileReader()
		fileReader.onload = function (res) {
			console.log('读取完毕', res);
			img.src = res.target.result
		}
		fileReader.readAsDataURL(fileInput.files[0])
	})

	// 创建一个 Image 对象，用来加载图片

	// 当图片加载完成后执行
	img.onload = function () {
		// 创建一个 Canvas 元素
		// 计算压缩后的图片宽度和高度
		let MAX_WIDTH = 800
		let MAX_HEIGHT = 600
		let width = img.width
		let height = img.height

		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width
				width = MAX_WIDTH
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height
				height = MAX_HEIGHT
			}
		}
		console.log(`渲染图片: ${width} ${height}`);

		// 将 Canvas 元素的宽度和高度设置为压缩后的图片宽度和高度
		canvas.width = width
		canvas.height = height

		// 在 Canvas 元素上绘制图片
		let ctx = canvas.getContext('2d')
		ctx.drawImage(img, 0, 0, width, height)
	}

	// 将 Data URL 转化为 Blob 对象的函数
	function dataURLToBlob (dataURL) {
		let BASE64_MARKER = ';base64,'
		if (dataURL.indexOf(BASE64_MARKER) === -1) {
			let parts = dataURL.split(',')
			let contentType = parts[0].split(':')[1]
			let raw = parts[1]

			return new Blob([raw], {
				type: contentType,
			})
		}

		let parts = dataURL.split(BASE64_MARKER)
		let contentType = parts[0].split(':')[1]
		let raw = window.atob(parts[1])
		let rawLength = raw.length
		let uInt8Array = new Uint8Array(rawLength)

		for (let i = 0; i < rawLength; ++i) {
			uInt8Array[i] = raw.charCodeAt(i)
		}

		return new Blob([uInt8Array], {
			type: contentType,
		})
	}
})()