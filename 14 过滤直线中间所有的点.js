function calculateSlope (point1, point2) {
  if (point1.x === point2.x) {
    // 处理斜率为无穷大的情况 垂直Y轴或垂直X轴
    return Infinity;
  }
  return (point2.y - point1.y) / (point2.x - point1.x);
}

function filterPointsOnLines (points) {
  const lines = {}; // 存储不同斜率的直线的起点和终点对

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const start = points[i];
      const end = points[j];
      const slope = calculateSlope(start, end);
      if (!lines[slope]) {
        lines[slope] = [start, end];
      } else {
        if (lines[slope][0] instanceof Array) {
          lines[slope].forEach(itme => {
            console.log(itme);
            const [oStart] = itme
            debugger
            if (Math.abs(start.x * slope - start.y) === Math.abs(oStart.x * slope - oStart.y)) itme[1] = end;
            else {
              // 确定为平行线
              // debugger
              itme.push([start, end])
            }
          });
        }
        else {
          const [oStart, Oend] = lines[slope]
          debugger
          if (Math.abs(start.x * slope - start.y) === Math.abs(oStart.x * slope - oStart.y)) lines[slope][1] = end;
          else {
            debugger
            lines[slope] = { slope: [] }
            lines[slope][slope].push([{ oStart, Oend }])
          }
        }
      }
    }
  }

  // 将直线的起点和终点对提取出来，组成结果数组
  const filteredPoints = Object.values(lines);

  return filteredPoints;
}
// 示例输入，每个点用{x, y}对象表示
function generateRandomData (numPoints) {
  const randomData = [];
  const maxCoordinate = 100; // 设置最大的坐标值

  for (let i = 0; i < numPoints; i++) {
    const x = Math.floor(Math.random() * (maxCoordinate + 1)); // 生成随机的 x 坐标
    const y = Math.floor(Math.random() * (maxCoordinate + 1)); // 生成随机的 y 坐标
    randomData.push({ x, y });
  }

  return randomData;
}

const numPoints = 100;
const randomData = generateRandomData(numPoints);

// const filteredPoints = filterPointsOnLines(randomData);
const filteredPoints = filterPointsOnLines([{ x: 2, y: 4 }, { x: 4, y: 8 }, { x: 2, y: 5 }, { x: 4, y: 9 }])
console.log(filteredPoints);