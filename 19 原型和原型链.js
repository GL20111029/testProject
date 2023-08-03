function checktype (val) {
  console.log(Object.prototype.toString(val));
  console.log(Object.prototype.toString.call(val));
}
const aa = new Array()
// checktype('')
// checktype([])
console.log(`111 ${aa.toString()} ${Object.toString(aa)} ${Object.prototype.toString(aa)}`);