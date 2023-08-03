console.log(1)

new Promise((r, j) => {
	console.log(2)
	setTimeout(() => console.log(3), 0)
})

console.log(4)

setTimeout(() => {
	console.log(5)
	new Promise((r, j) => {
		console.log(6)
	})
	setTimeout(() => console.log(7), 0)
}, 0)

// 1、2、4、5、6、3、7
