// 这种方式的实现方式原理很简单
// 就是公共的东西往父类原型上丢，私有的属性或方法就写到父类中
function Animal (name, color) {
  this.name = name
  this.color = color
}

Animal.prototype.action = function () {
  console.log('做出了一些动作', this);
}

// 这里使用构造函数继承的方式继承父类的属性
function Sun (name, color) {
  Animal.call(this, name, color)
}

// 这里使用原型链继承的方式继承父类原型上的属性或者方法
Sun.prototype = new Animal()

const s1 = new Sun('兔子', '白色')

s1.action()

// 缺点就是调用了两次父类的构造函数，且子类的身上还是会有父类的一些未经过初始化的属性或者方法