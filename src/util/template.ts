const ejs = require('ejs')
import { readFile } from 'fs'
import path from 'path'

export async function render(templateName: string, data: any): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path.resolve(__dirname, `../templates/${templateName}`), 'utf8', async (err, temp) => {
      if (err) {
        reject(err)
      }
      const res = ejs.render(temp, data)
      resolve(res)
    })
  })
}
