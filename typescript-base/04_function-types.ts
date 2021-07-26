// 约定输入，约定输出
function add(x: number, y: number): number {
  return x + y
}

// 声明式函数 - 可选参数
function add1(x: number, y: number, z?: number): number {
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}

let result = add1(1, 2)
let result1 = add1(1, 2, 3)
// add(1, '2')
// add(1, 2, 3)

// 函数表达式 - 函数本身的类型
const add2: (x: number, y: number, z?: number) => number = add

// interface 描述函数类型
const sum = (x: number, y: number) => {
  return x + y
}
interface ISum {
  (x: number, y: number, z?: number): number
}
const sum2: ISum = sum
























