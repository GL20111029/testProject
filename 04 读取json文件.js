const { readFile } = require('fs')
const path = require('path')

let obj = {}
readFile(path.join(__dirname, './test/01.json'), 'utf8', (err, data) => {
  if (err) throw ('读取文件出错，请检查路径或文件名是否正确')
  // obj = { ...JSON.parse(data) }
  console.log(obj);
  console.log(JSON.parse(data));
})