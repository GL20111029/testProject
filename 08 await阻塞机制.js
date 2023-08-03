let count = 0

// await 会阻塞事件循环机制
async function Test () {
  return new Promise(t => {
    let time = Math.floor(Math.random() * 4) + 1
    let deCount = ++count
    setTimeout(() => {
      t(`第 ${deCount} 次试验，执行时间为 ${time * 1000}`)
    }, time * 1000);
  })
}
console.log('测试开始');
// Test().then(res => console.log(res))
// Test().then(res => console.log(res))
// Test().then(res => console.log(res))
// Test().then(res => console.log(res))
// Test().then(res => console.log(res))
console.log(await Test());
console.log(await Test());
console.log(await Test());
console.log(await Test());
console.log(await Test());
console.log('测试结束');