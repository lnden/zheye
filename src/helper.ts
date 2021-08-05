import { ColumnProps } from './store'

export function generateFitUrl (column: ColumnProps, width: number, height: number, format = ['m_pad']): void {
  if (column.avatar) {
    column.avatar.fitUrl = column.avatar.url + `?x-oss-process=image/resize,${format},h_${height},w_${width}`
  } else {
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
