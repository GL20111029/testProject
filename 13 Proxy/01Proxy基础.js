/* 
  为什么要使用代理？
    因为我们需要对目标对象的基本操作进行拦截，以作出一些反应，如Vue的双向绑定，通过Object.defineProperty和Proxy来对目标对象的基本操作来进
    行监听，并根据变化作出视图更新。
    Proxy相较于Object.defineProperty具有天然的性能优势，因为它无需遍历对象的每一个属性为其添加get和set的监听
*/

// 代理是目标对象的抽象，我们既可以直接操作目标对象，也可以通过代理来操作。要注意，直接操作目标对象会绕过代理施予的行为
// 01 创建空代理
const student = {
  name: '张三',
  age: '17',
  classez: '高二（2）班'
}

// 代理通过Proxy构造函数来创建，该构造函数接收两个参数，二者缺一不可：
// new Proxy(目标对象, 处理程序对象)  要创建空代理，处理程序对象传个对象字面量即可
const proxy = new Proxy(student, {})

// 对目标对属性的操作都会反应到代理身上
student.age = 19

console.log(student.age);   // 19
console.log(proxy.age);     // 19

// 同样的 对proxy对象的操作也会反应到目标对象上
proxy.age = 17

console.log(student.age);   // 17
console.log(proxy.age);     // 17

// Proxy还有一个特点，就是Proxy的prototype是undefined,因此不能够使用instanceof操作符
// console.log(Proxy.prototype);
// console.log(proxy instanceof Proxy);  // 会报错`

// 全等号可以用来区分proxy对象和目标对象  （ps：红宝书这么写的，但其实‘==’貌似也能区分，看不懂）
console.log(proxy == student);
console.log(proxy === student);


