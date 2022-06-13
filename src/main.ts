import { NestFactory } from '@nestjs/core'
import { CoreModule, bootstrap } from '@akunx/nest-core'
import { SharedModule } from './shared/module'
import { ServiceModule } from './service/module'
import { HttpClientModule } from '@tresdoce/nestjs-httpclient'

bootstrap({
  port: 8000,
  application: NestFactory.create(
    CoreModule.register({
      imports: [SharedModule, ServiceModule, HttpClientModule]
    })
  )
})
