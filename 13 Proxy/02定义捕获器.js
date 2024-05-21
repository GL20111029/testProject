// 前文关于Proxy的一些基础

const student = {
  name: '张三',
  age: '17',
  classez: '高二（2）班'
}

const proxy = new Proxy(student, {
  set (obj, p, nv) {
    return obj[p] = nv
  },
  get () {
    console.log('get触发了');
  }
})

proxy.age = 18
console.log(proxy.age);