// Generator 对象由生成器函数返回并且它符合可迭代协议和迭代器协议。

// 1. 通过生成器函数，获取Generator对象
//    格式 function* xxx() {}
function* generatorMaker () {
  // 生成器内部的逻辑不会自动调用，需要调用Generator对象的next方法
  console.log('执行啦');
}

const g = generatorMaker()
/* 
next方法可以获取到一个对象: 
  {value:生成器函数内部的值, done:是否完成}
*/
console.log(g.next());
/* 
  *       对应ES6中的 async
  yield   对应ES6中的 await

  但是还是有明显区别的：ES6后无需主动触发就执行逻辑；generator则需要主动调用next方法或使用forof遍历generator对象
  也不要混淆 在此处只是做一个类比
*/


function* generatorMaker2 () {
  console.log('开始执行');
  yield '你好'
  yield '在吗？'
  yield '我有事找你！'
  yield 1 + 2 + 3 + 4
  return 'I love you'
}

const generator2 = generatorMaker2()

/* 
  每调用一次genorator对象的next方法都会执行一次yield后面的代码，并将结果作为返回对象value的值
  还有值得注意的是，yield后面的代码在生成器函数创建之后并不会执行，需要调用next去一个个的触发
*/
// console.log(generator2.next()); // { value: '你好', done: false }
// console.log(generator2.next()); // { value: '在吗？', done: false }
// console.log(generator2.next()); // { value: '我有事找你！', done: false }
// console.log(generator2.next()); // { value: 10, done: false }
// console.log(generator2.next()); // { value: 'I love you', done: true }


// -------------for of-----------
// for-of的特性就是遍历一些符合迭代器协议的数据 比如数组
// const arr = ['🦊', '🐂', '🐥', '🐦']

// for (const iterator of arr) {
//   console.log(iterator);
// }

// 这个迭代就是直接找对象身上的generator对象，
// 这个对象就是 {value:xxx, done: false/done} 形式的

// 所以，for-of还可以直接遍历generator对象而无需调用next方法
for (const iterator of generator2) {
  console.log(iterator);
}