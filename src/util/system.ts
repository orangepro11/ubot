export function ping(host = 'www.uviewui.com'): Promise<string> {
  return new Promise((resolve, reject) => {
    let ping = require('child_process').spawn('ping', ['-c', '3', '-t', '3', '-W', '3', host])
    let iconv = require('iconv-lite')
    let all = ''
    ping.stdout.on('data', data => {
      all += iconv.decode(data, 'cp936')
    })
    ping.stderr.on('data', data => {
      reject(iconv.decode(data, 'cp936'))
    })
    ping.on('close', code => {
      resolve(all)
    })
  })
}
