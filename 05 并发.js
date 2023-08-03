const useSyncFunction = (max, array) => {
	const promiseList = []

	const syncyFunction = i => {
		return new Promise((resolve, reject) => {
			let time = Math.floor(Math.random() * 10 + 1)
			if (time > 5) {
				setTimeout(() => {
					reject(`第${i}次请求超时了    time: ${time}`)
				}, time)
			} else {
				setTimeout(() => {
					resolve(`第${i}次请求成功了   time: ${time}`)
				}, time)
			}
		})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {})
	}

	for (let i = 0; i < max; i++) {
		syncyFunction(i)
	}
}

const list = []

