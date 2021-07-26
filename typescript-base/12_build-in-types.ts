// global objects
const a: Array<number> = [1, 2, 3]
const date = new Date()
date.getTime()
const reg = /abc/
reg.test('abc')

// build in object
Math.pow(2, 2)


// DOM and BOM标准对象
// document 对象，返回的是一个 HTMLElement
let body = document.body
// document 上面的query 方法，返回的是一个 nodeList 类型
let allLis = document.querySelectorAll('li')
allLis.keys()

/**
 * 当然添加事件也是很重要的一部分，document 上面有 addEventListener 方法，
 * 注意这个回调函数，因为类型推断，这里面的 e 事件对象也自动获得了类型\
 * 这里是个 mouseEvent 类型，因为点击是一个鼠标事件，现在我们可以方便的使用 e 上面的方法和属性。
 */
document.addEventListener('click', (e) => {
  e.preventDefault()
})


// Utility Types
interface IPerson {
  name: string
  age: number
}

let Tom: IPerson = { name: 'tom', age: 20 }

// Partial，它可以把传入的类型都变成可选
type IPartial = Partial<IPerson>
let Lily: IPartial = { name: 'lily' }

// Omit，它返回的类型可以忽略传入类型的某个属性
type IOmit = Omit<IPerson, 'name'>
let Lucy: IOmit = { age: 26 }