import { Inject, Injectable } from '@nestjs/common'
import { QbotProvider } from '@shared'

@Injectable()
export class PrivateService {
  @Inject() qbot: QbotProvider

  public onModuleInit = () => {
    this.qbot.client.on('message.private', event => {
      event.reply('有事不能群里找我嘛?')
    })
  }
}
