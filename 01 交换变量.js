let a = 1
let b = 3

;[a, b] = [b, a]
// console.log(a, b)

// 利用这个来实现冒泡排序
const arr = [999, 983, 933, 956, 33, 2123, 245, 1]

//
// arr.map((item, index) => {
// 	// 正序排序
// 	if (item > arr[index + 1]) {
// 		;[arr[index], arr[index + 1]] = [arr[index + 1], item]
// 	} else if (index + 1 != arr.length) {

// 	}
// })

for (let i = 0; i < arr.length; i++) {
	for (let y = i; y < arr.length; y++) {
		if (arr[i] > arr[y + 1]) {
			;[arr[i], arr[y + 1]] = [arr[y + 1], arr[i]]
		}
	}
}

// 如果不借助双层for循环，那么该如何实现冒泡排序
arr.forEach((item, index) => {
	;[item, arr[index + 1]] = [3, 4]
})

console.log(arr)
