// 定义了一个接口 Person
interface Person {
  name: string
  age: number
}
// 接着定义了一个变量 Tom，它的类型是 Person。这样，我们就约束了 Tom 的形状必须和接口 Person 一致。
let Tom: Person = {
  name: 'tom',
  age: 20
}

//有时我们希望不要完全匹配一个形状，那么可以用可选属性：
interface Person1 {
  name: string;
  age?: number;
}
let Lily: Person1 = {
  name: 'Lily'
}

//接下来还有只读属性，有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
interface Person2 {
  readonly id: number
  name: string
  age?: number
}

let Lucy: Person2 = {
  id: 1,
  name: 'Lucy',
}
tom.id = 9527