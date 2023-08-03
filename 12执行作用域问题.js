// function printAny() {
//   console.log(a,'print A')
// }

function Func(){
  let a = 1;
  (function(){
    console.log(a,'print A')
  })()
  console.log('father')
  // printAny()
}

Func()