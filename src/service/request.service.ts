import { Inject, Injectable } from '@nestjs/common'
import { QbotProvider } from '@shared'

@Injectable()
export class RequestService {
  @Inject() qbot: QbotProvider

  onModuleInit = () => {
    this.qbot.client.on('request.friend', event => {
      event.approve(false)
    })
    this.qbot.client.on('request.group.invite', event => {
      event.approve(true)
    })
  }
}
