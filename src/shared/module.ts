import { Global, Module } from '@nestjs/common'
import { QbotProvider } from './qbot.provider'

@Global()
@Module({
  providers: [QbotProvider],
  exports: [QbotProvider]
})
export class SharedModule {}
