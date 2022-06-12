import { Injectable } from '@nestjs/common'
import { wait } from '@util'
import { createClient, Client } from 'oicq'
import { QBOT } from '@option'

@Injectable()
export class QbotProvider {
  client: Client

  onModuleInit = async () => {
    const client = createClient(QBOT.login.account, {
      data_dir: `${process.cwd()}/.qbot`
    })

    client.on('system.online', () => {
      console.log('Logged in!')
    })

    for (; !client.isOnline(); ) {
      await client.login(QBOT.login.password).finally(() => wait(1000))
      !client.isOnline() && (await wait(60000))
    }

    this.client = client
  }
}
