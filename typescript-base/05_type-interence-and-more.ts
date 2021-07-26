// union types - 联合类型 - 需要用中竖线来分割两个类型
let numberOrString: number | string

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
numberOrString.toString()
numberOrString.valueOf()
numberOrString.length

/**
 * 
 * @description 类型断言 - 告诉ts推导是什么类型 
 *  这里我们可以用 as 关键字，告诉typescript 编译器，你没法判断我的代码
 *  但是我本人很清楚，这里我就把它看作是一个 string，你可以给他用 string 的方法
 */
function getLength(input: string | number): number {
  const str = input as string;
  if (str.length) {
    return str.length
  } else {
    const number = input as number
    return number.toString().length
  }
}


// 类型守卫 - type guard
function getLength2(input: string | number): number {
  if (typeof input === 'string') {
    return input.length
  } else {
    return input.toString().length
  }
}