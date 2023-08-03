function calculateSlope(point1, point2) {
  if (point1.x === point2.x) {
    // 处理斜率为无穷大的情况
    return Infinity;
  }
  return (point2.y - point1.y) / (point2.x - point1.x);
}

function filterPointsOnLines(points) {
  const lines = {}; // 存储不同斜率的直线的开始点和结束点

  for (let i = 0; i < points.length; i++) {
    const currentPoint = points[i];

    // 遍历已存储的直线，查找是否有相同斜率的直线
    let foundLine = false;
    for (const key in lines) {
      const lineSlope = Number(key);
      const start = lines[key][0];
      const end = lines[key][1];

      if (calculateSlope(start, currentPoint) === lineSlope) {
        // 如果找到相同斜率的直线，更新结束点
        lines[key][1] = currentPoint;
        foundLine = true;
        break;
      }
    }

    if (!foundLine) {
      // 如果没有找到相同斜率的直线，将当前点作为新的直线开始点
      lines[calculateSlope(points[0], currentPoint)] = [currentPoint, currentPoint];
    }
  }

  // 将直线的开始点和结束点提取出来，组成结果数组
  const filteredPoints = Object.values(lines).flatMap(line => line);

  return filteredPoints;
}

// 示例输入，每个点用{x, y}对象表示
const points = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 6 },
  { x: 4, y: 8 },
  { x: 5, y: 10 },
  { x: 6, y: 12 },
  { x: 7, y: 14 },
  { x: 8, y: 16 },
  { x: 9, y: 18 },
  { x: 10, y: 20 }
];

const filteredPoints = filterPointsOnLines(points);
console.log(filteredPoints);
