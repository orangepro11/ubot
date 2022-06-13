import { Global, Module } from '@nestjs/common'
import { GiteeProvider } from './gitee.provider'
import { QbotProvider } from './qbot.provider'

@Global()
@Module({
  providers: [QbotProvider, GiteeProvider],
  exports: [QbotProvider, GiteeProvider]
})
export class SharedModule {}
