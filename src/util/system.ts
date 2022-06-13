import child from 'child_process'
import iconv from 'iconv-lite'

export const ping = (host = 'www.uviewui.com'): Promise<string> => {
  return new Promise((resolve, reject, all = '') => {
    const ping = child.spawn('ping', ['-c', '3', '-t', '3', '-W', '3', host])
    ping.stdout.on('data', data => {
      all += iconv.decode(data, 'cp936')
    })
    ping.stderr.on('data', data => {
      reject(iconv.decode(data, 'cp936'))
    })
    ping.on('close', () => {
      resolve(all)
    })
  })
}
