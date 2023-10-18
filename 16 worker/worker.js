// 外部脚本引入有先后顺序，如果在引用之前使用了外部脚本内部的变量以及函数就会报not defined错误
// self.importScripts('./test.js')
// importScripts 等价于 self.importScripts
importScripts('./test.js')

func('test')
// self.importScripts('./test.js')

self.onmessage = (e) => {
  console.log('收到消息', e);
  func(e.data)
}

