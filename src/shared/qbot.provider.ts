import { Injectable } from '@nestjs/common'
import { wait } from '@util'
import { createClient, Client, Platform } from 'oicq'
import { QBOT } from '@option'

@Injectable()
export class QbotProvider {
  client: Client

  onModuleInit = async () => {
    const client = createClient(QBOT.login.account, {
      data_dir: `${process.cwd()}/.qbot`,
      platform: Platform.aPad
    })

    client
      .on('system.login.qrcode', function (e) {
        //扫码后按回车登录
        process.stdin.once('data', () => {
          this.login()
        })
      })
      .login()

    // client
    //   .on('system.login.slider', function (e) {
    //     console.log('输入ticket：')
    //     process.stdin.once('data', ticket => this.submitSlider(String(ticket).trim()))
    //   })
    //   .login('password')

    client.on('system.online', () => {
      console.log('Logged in!')
    })

    // for (; !client.isOnline(); ) {
    //   await client.login(QBOT.login.password).finally(() => wait(1000))
    //   !client.isOnline() && (await wait(60000))
    // }

    this.client = client
  }
}
