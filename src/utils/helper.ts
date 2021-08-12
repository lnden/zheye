import { ColumnProps } from '@/store'

export function generateFitUrl (column: ColumnProps): void {
  if (!column.avatar) {
    column.avatar = {
      fitUrl: require('@/assets/column.jpg')
    }
  }
}

interface CheckCondition {
  format?: string[]
  size?: number
}
type ErrorType = 'size' | 'format' | null
interface Result {
  passed: boolean
  error: ErrorType
}

export function beforeUploadCheck (file: File, condition: CheckCondition): Result {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }

  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

interface TestProps {
  _id: string
  name: string
}
const testData: TestProps[] = [
  { _id: '1', name: 'a' },
  { _id: '2', name: 'b' }
]

/**
 * @description 格式转换 Array => Object
 * @param Array
 *  [
 *    { _id: '1', name: 'a' },
 *    { _id: '2', name: 'b' }
 *  ]
 *
 * @returns Object
 *  {
 *    1: { _id: '1', name: 'a' },
 *    2: { _id: '2', name: 'b' }
 *  }
 */
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>): { [key: string]: T } => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
const result = arrToObj(testData)
console.log('转换的结果', result)

/**
 * @description 格式转换 Object => Array
 * @param Object
 *  {
 *    1: { _id: '1', name: 'a' },
 *    2: { _id: '2', name: 'b' }
 *  }
 * @returns Array
 *  [
 *    { _id: '1', name: 'a' },
 *    { _id: '2', name: 'b' }
 *  ]
 */
export const objToArr = <T>(obj: {[key: string]: T}): T[] => {
  return Object.keys(obj).map(key => obj[key])
}
const testData2: { [key: string]:TestProps } = {
  1: { _id: '1', name: 'a' },
  2: { _id: '2', name: 'b' }
}
const result2 = objToArr(testData2)
console.log('转换的结果', result2)
