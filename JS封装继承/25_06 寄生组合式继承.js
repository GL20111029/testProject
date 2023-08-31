/* 
  1. 通过构造函数继承属性
  2. 通过原型链来继承方法
*/

// 继承原型函数
function inheritPrototype (son, parent) {
  // 基于父类的原型创建新的对象
  const prototype = Object.create(parent.prototype)
  // 保证了原型三角关系 构造函数要指回son
  prototype.constructor = son
  // 设置了子类的原型
  son.prototype = prototype
}

// 实例属性，写在构造函数中
function Person (callname, age) {
  this.callname = callname
  this.age = age
}

Person.prototype.eat = function () {
  console.log('eating');
}

Person.prototype.swim = function () {
  console.log('swiming');
}

function Man (name, age) {
  Person.call(this, name, age)
}

// 调用函数继承父类原型中的属性/方法
inheritPrototype(Man, Person)

const man = new Man('张三', 40)

console.log(man);
console.log(Man.prototype);

man.swim()
man.eat()


/* 
  以上6种，就是ES5中的6种继承方法
    原型链继承
    构造函数继承
    组合世继承
    原型式继承
    寄生式继承
    寄生组合式继承
*/