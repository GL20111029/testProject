class Father {

  address = '湖南省长沙市'

  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayHi () {
    console.log('你好！', this);
  }
}

// 1. 使用extends继承Father类
class Lucy extends Father {
  constructor(parent, name, age) {
    // 2. 调用父类的构造函数 super必须在子类的最开始使用，通过它绑定this
    super(name, age)
    this.parent = parent
  }

  play () {
    console.log('play basketball');
  }
}

const lucy = new Lucy('Robot', 'Lucy', 10)

console.log(lucy);
lucy.sayHi()
lucy.play()