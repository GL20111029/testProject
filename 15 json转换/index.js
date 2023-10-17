const originalArray = require('./song.json')

const groupedByProjectId = new Map();

// originalArray.rows.forEach((item) => {
//   const projectId = item.ProjectId;
//   if (groupedByProjectId.has(projectId)) {
//     // 如果已经有此 ProjectId 的记录，将当前对象的值添加到数组中
//     const existingItem = groupedByProjectId.get(projectId);
//     for (const key in item) {
//       if (Array.isArray(existingItem[key])) {
//         existingItem[key].push(item[key]);
//       } else {
//         existingItem[key] = [existingItem[key], item[key]];
//       }
//     }
//   } else {
//     // 如果尚未有此 ProjectId 的记录，创建一个包含当前对象值的新对象
//     const newItem = { ...item };
//     for (const key in newItem) {
//       newItem[key] = [newItem[key]];
//     }
//     groupedByProjectId.set(projectId, newItem);
//   }
// });

// // 将映射的值转换为数组
// const finalArray = Array.from(groupedByProjectId.values());

originalArray.rows.forEach((item) => {
  const projectId = item.ProjectId;
  if (groupedByProjectId.has(projectId)) {
    // 如果已经有此 ProjectId 的记录，将当前对象的值添加到数组中
    const existingItem = groupedByProjectId.get(projectId);
    for (const key in item) {
      // 判断当前项是不是一个数组，如果是的话就直接push进去，不是就创建为一个数组
      if (Array.isArray(existingItem[key])) {
        existingItem[key].push(item[key]);
      } else {
        existingItem[key] = [existingItem[key], item[key]];
      }
    }
  } else {
    // 如果尚未有此 ProjectId 的记录，创建一个包含当前对象值的新对象
    const newItem = { ...item };
    for (const key in newItem) {
      newItem[key] = [newItem[key]];
    }
    groupedByProjectId.set(projectId, newItem);
  }
});

// 将映射的值转换为数组
const finalArray = Array.from(groupedByProjectId.values());

console.log(finalArray[0]);