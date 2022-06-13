import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SharedModule } from './shared/module'
import { ServiceModule } from './service/module'

@Module({ imports: [SharedModule, ServiceModule] })
class AppModule {}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  await app.listen(8000)
}

bootstrap()
