import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SharedModule } from './shared/module'
import { ServiceModule } from './service/module'
import { HttpClientModule } from '@tresdoce/nestjs-httpclient'

<<<<<<< HEAD
@Module({ imports: [SharedModule, ServiceModule, HttpClientModule] })
class AppModule {}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  await app.listen(8000)
}

bootstrap()
=======
bootstrap({
  port: 8000,
  application: NestFactory.create(
    CoreModule.register({
      imports: [SharedModule, ServiceModule, HttpClientModule]
    })
  )
})
>>>>>>> origin/add-gitee
