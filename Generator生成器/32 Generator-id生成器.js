// function* idGenrator () {
//   let id = 1
//   /* 
//     基本逻辑  
//     外部可以一致调用 next yield
//   */
//   while (true) {
//     yield id++
//   }
// }

// const idgenrator = idGenrator()

// setInterval(() => {
//   let { value: id } = idgenrator.next()
//   console.log(id);
// }, 1000)

// `````````` 不用generator 实现id生成器
function idGenrator2 () {
  let id = 1
  // 利用函数的闭包特性
  return function () {
    return id++
  }
}

const idgenrator2 = idGenrator2()

setInterval(() => {
  let id = idgenrator2()
  console.log(id);
}, 1000)



