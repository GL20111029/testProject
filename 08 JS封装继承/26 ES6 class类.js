/*
  class 是一个用来创建对象的模板
  可以看作是一个语法糖，ES5需要好多结构复杂的代码才能实现继承的方式
  使用class就只有短短几行
  class的本质还是基于原型的
    1. 属性在实例上
    2. 方法在原型上
*/

// 定义类
class Father {

  // 实例属性，直接写
  address = '湖南省长沙市'

  // 定义构造函数 new的时候会调用
  constructor(name, age) {
    // 实例属性也可以在this上面动态添加
    // 但是写在构造函数外面比较一目了然，推荐
    this.name = name
    this.age = age
  }

  sayHi () {
    console.log('你好！', this);
  }
}

// 执行new关键字的时候调用父类的constructor构造方法，如果有的话
const f = new Father('张三', 18)

console.log(f);