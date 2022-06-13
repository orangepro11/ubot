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
      .on('system.online', () => {
        console.log('Logged in!')
      })
      .on('system.offline', () => {
        console.log('Account logged out! Please restart service')
      })

    await client.login(QBOT.login.password)

    for (; !client.isOnline(); ) await wait(1000)

    this.client = client
  }
}
