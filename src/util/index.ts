export * from './system'

export const inIndex = (
  content: string | string[] | number | number[],
  keyword: string[] | number[]
) => {
  return keyword
    .map((v: string | number) => v.toString())
    .findIndex(value => (content + '').includes(value))
}

export const isInclude = (
  content: string | string[] | number | number[],
  keyword: string[] | number[]
) => {
  return !!keyword
    .map((v: string | number) => v.toString())
    .find(value => (content + '').includes(value))
}

export const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
