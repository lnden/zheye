// 1.类型别名  type aliase
let sum: (x: number, y: number) => number
const result = sum(1, 2)

type PlusType = (x: number, y: number) => number
let sum2: PlusType
const result2 = sum2(2, 3)

type StrOrNumber = string | number
let result3: StrOrNumber = '123'
result3 = 123
result3 = 'lily'
// result3 = true

// 2.字变量
const str: 'name' = 'name'
const number: 1 = 1


// 3.联合类型
type Directions = 'Up' | 'Donw' | 'Left' | 'Right'
let woWhere: Directions = 'Donw'


// 4.交叉类型
interface IName {
  name: string
}
type IPerson = IName & { age: number }
let person: IPerson = { name: '123', age: 123 }