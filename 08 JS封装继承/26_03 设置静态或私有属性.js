class Person {
  // 私有属性通过加#作为前缀将添加的属性变为私有
  // 使用的时候#也不能落下，且只能在本类内部使用
  #name = '张三'
  #age = 40
  constructor(name, age) {
    // console.log(this.#name);
    this.#name = name
    this.#age = age
  }

  // 静态方法则通过static关键字来定义，通过类直接访问
  static sayHi () {
    console.log(`hi!`);
  }
  static grandfather = '乔尔三世'
}

const man = new Person('张三', 40)

// 在代码中调用私有属性会直接报语法错误，但是浏览器控制台中可以使用
// console.log(man.#name);

// 直接调用类的静态方法以及属性
Person.sayHi()
console.log(Person.grandfather);

