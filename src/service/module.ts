import { Module } from '@nestjs/common'
import { GroupService } from './group.service'
import { PrivateService } from './private.service'
import { RequestService } from './request.service'

@Module({
  providers: [RequestService, GroupService, PrivateService]
})
export class ServiceModule {}
