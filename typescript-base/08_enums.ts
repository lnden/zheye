// 数字枚举，一个数字枚举可以用 enum 这个关键词来定义，我们定义一系列的方向，
// 然后这里面的值，枚举成员会被赋值为从 0 开始递增的数字,
enum Direction {
  Up = 10,
  Down,
  Left,
  Right
}
console.log(Direction.Up)
// 反向映射
console.log(Direction[0])


// 枚举字符串
enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
const value = 'UP'
if (value === Direction2.Up) {
  console.log('go up')
}
console.log(Direction2.Up)


// 常量枚举(性能较高)
const enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
const value3 = 'UP'
if (value === Direction3.Up) {
  console.log('go up')
}
console.log(Direction3.Up)