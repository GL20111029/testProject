/* 
  与原型式继承的实现方式基本一致，都是利用工厂函数对对象进行浅拷贝
  1. 对传入的对象进行浅拷贝（公共属性）
  2. 为浅拷贝对象增加属性/方法（独有属性/方法）
*/

// 希望继承的对象
const father = {
  name: 'parent',
  age: 30
}

function ObjectFactory (obj) {
  // function F () { }
  // F.prototype = obj

  // 实例化这个对象 并添加独有的方法/属性
  // const res = new F()
  // 我们还可以使用create创建一个以对象的浅拷贝为原形的对象
  const res = Object.create(obj)
  res.friend = ['rose', 'lucy', 'robot']
  res.sayHi = function () {
    console.log(this.name, this.friend);
  }
  return res
}

const son = ObjectFactory(father)
const son2 = ObjectFactory(father)

son2.friend.push('张三')

console.log(son);
console.log(son.friend);

// 对父对象的属性直接进行修改还是会影响到以它创建出来的新对象
father.name = '李四'
console.log(son.friend);
console.log(son.name);