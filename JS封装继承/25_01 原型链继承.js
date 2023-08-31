function Father () {
  this.name = 'Father'
  this.likefood = ['西瓜', '香菇']
  this.sayHi = function () {
    console.log('Hi', this);
  }
  this.sayHello = () => {
    console.log('Hello', this);
  }
}

function Sun () { }

Sun.prototype = new Father()
// 维持原型三角关系
Sun.prototype.constructor = Sun

const s1 = new Sun()
const s2 = new Sun()

console.log(s1.__proto__ === s2.__proto__);

// 这种继承方式的缺点就是没有内存隔离。如果是对一个引用数据类型进行了修改，那么其它引用了该父类的其它子类的的实例也会受到影响
s1.likefood.push('黄焖鸡')
console.log(s2.likefood); // 可以看到s2中也多了黄焖鸡
