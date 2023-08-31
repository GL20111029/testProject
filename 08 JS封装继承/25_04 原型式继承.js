// 原理：将某个对象进行浅拷贝作为原型 使用工厂函数或者 Object.create
// 缺点也和之前的原型链继承一致，父类中的引用数据类型会被共享

// 那么原型链继承与原型式继承的不同点是什么呢？
//  不同点是：原型链继承是基于构造函数的，而原型式继承是基于实例的

// 定义要继承的对象
const father = {
  name: 'parent',
  friend: ['rose', 'lucy', 'robot'],
  sayHi () {
    console.log(this.name, this.friend);
  }
}

function ObjectFactory (obj) {
  function F () { }
  F.prototype = obj
  return new F()
}

const son = ObjectFactory(father)
const son2 = ObjectFactory(father)

son2.friend.push('张三')

console.log(son);
console.log(son.friend);