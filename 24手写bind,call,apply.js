Function.prototype.mycall = function (thisArg, ...arg) {
  const MYCALL = Symbol('mycall')
  thisArg.__proto__[MYCALL] = this
  res = thisArg[MYCALL](...arg)
  delete thisArg.__proto__[MYCALL]
  return res
}

Function.prototype.myapply = function (thisArg, arg) {
  const MYAPPLY = Symbol('mybind')
  thisArg.__proto__[MYAPPLY] = this
  res = thisArg[MYAPPLY](...arg)
  delete thisArg.__proto__[MYAPPLY]
  return res
}

Function.prototype.mybind = function (thisArg, ...arg) {
  const MYBIND = Symbol('mybind')
  thisArg.__proto__[MYBIND] = this
  return function (...arg2) {
    thisArg[MYBIND](...arg, ...arg2)
    delete thisArg.__proto__[MYBIND]
  }
}

function test (something) {
  console.log(this);
  console.log('this', something);
}
function test2 (a, b, c, d) {
  console.log(this);
  console.log('this', a, b, c, d);
}

const obj = { name: "张三" }

// test.mycall(obj, '仙剑')
// test.call(obj, '仙剑')

// test.myapply(obj, ['仙剑'])
// test.apply(obj, ['仙剑'])

test2.mybind(obj, 'a', 'b')('c', 'd')
// test2.bind(obj, 'a', 'b')('c', 'd')