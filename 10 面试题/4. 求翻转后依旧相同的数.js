
/**
 * 
 * @param {Number} range 
 * @desc  求翻转后依旧相同的数 至少两位数
 */
function getMeetsNumber (range) {
  const res = []
  let i = 10
  while (i < range) {
    if (i.toString().split('').reverse().join('') === i.toString()) res.push(i)
    i++
  }
  return res
}

const res = getMeetsNumber(10000)
console.log(res);