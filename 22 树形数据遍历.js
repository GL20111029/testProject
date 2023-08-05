/* 
  arr 原始数据
  id  一级字段
*/
function getTreeData (arr, id) {
  // 第一步筛选出一级字段
  const tree =  arr.filter(item => item.id === id)
  // 第二步 为一级字段添加children节点 依据是 看子节点的paraent_id 是否等于传入id
  .map(item => {
    arr.map(item2=>{
      if (item2.parent_id === id) {
        return item.children = getTreeData(arr, item2.id)
      }
    })
    return
  })
}