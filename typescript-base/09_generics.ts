// 这时候我们发现了一个问题，我们传入了数字，但是返回了 any
function echos(arg) {
  return arg
}
const results = echos(123)


// 泛型
function echo<T>(arg: T): T {
  return arg
}
const result = echo('str')

// 泛型也可以传入多个值
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123])


// 约束泛型
function echoWithArr<T>(arg: T): T {
  console.log(arr.length)
  return arg
}
// 上例中，泛型 T 不一定包含属性 length，我们可以给他传入任意类型，当然有些不包括 length 属性，那样就会报错
function echoWithArr1<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const arrs = echoWithArr1([1, 2, 3, 4])


interface IWithLength {
  length: number
}
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
const str1 = echoWithLength('string')
const obj = echoWithLength({
  length: 10,
  width: 10
})
const arr2 = echoWithLength([1, 2, 3, 4])
// echoWithLength(123)



class Queue {
  private data = []
  push(item) {
    return this.data.push(item)
  }
  pop() {
    return this.data.shift()
  }
}
const queue = new Queue()
queue.push(1)
queue.push('string')
console.log(queue.pop().toFixed())


//在上述代码中存在一个问题，它允许你向队列中添加任何类型的数据，当然，当数据被弹出队列时，也可以是任意类型。在上面的示例中，看起来人们可以向队列中添加string 类型的数据，但是那么在使用的过程中，就会出现我们无法捕捉到的错误。
class Queue1<T> {
  private data = []
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queue1 = new Queue1<number>()



interface KeyPair<T, U> {
  key: T
  value: U
}
let kp1: KeyPair<number, string> = { key: 1, value: 'string' }
let key2: KeyPair<string, number> = { key: 'string', value: 2 }

let arr: number[] = [1, 2, 3]
let arrTwo: Array<number> = [1, 2, 3]