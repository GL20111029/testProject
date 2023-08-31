function Father (name, food) {
  this.name = name
  this.likefood = food
  this.sayHello = function () {
    console.log(`name: ${this.name}, age: ${this.age}, likefood: ${this.likefood}`);
  }
}

function Son (name, food) {
  Father.call(this, name, food)
}

const s1 = new Son('张三', ['汉堡', '黄焖鸡', '叫花鸡'])
// 这种方式就是在调用父类的构造方法的时候，用call去调用，而不是直接调用

console.log(s1);

// 这种方法的缺点就是无法共享父类原型身上的方法或者属性
Father.prototype.age = 18
const s2 = new Son('李四', ['上校鸡块', '和牛牛排', '可乐鸡翅'])

s2.sayHello() // 我们可以发现此时的this.age 是undefined

// 如果是用之前的原型继承方式，那么就不会如此
function Son2 () { }

Son2.prototype = new Father('王五', ['玉米排骨汤', '宫保鸡丁'])

const s3 = new Son2()
s3.sayHello() // 可以看到能拿到 this.age