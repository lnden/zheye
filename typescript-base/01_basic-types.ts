/**
 * @description 原始数据类型 - primitive values
 * 
 *  1.Boolean
 *  2.Number
 *  3.String
 *  4.Undefined
 *  5.Null
 *  6.Symbol
 *  7.BigInt
 */

let isDone: boolean = false

let age: number = 10

let firstName: string = 'tom'
let message: string = `hello, ${firstName}`

let u: undefined = undefined
let n: null = null

// undefined and null 是所有类似的子类
let num: number = undefined

// any 类型
let notSure: any = 4
notSure = 'maybe a string'
notSure = true

// 在任意值上访问任何属性都是允许的：
notSure.myName = 'lily'
// 也允许调用任何方法：
notSure.getName()