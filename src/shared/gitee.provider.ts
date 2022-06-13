import { Injectable } from '@nestjs/common'
import { HttpClientService } from '@tresdoce/nestjs-httpclient'
import { QBOT } from '@option'

@Injectable()
export class GiteeProvider {
  access_token: string = QBOT.gitee.access_token
  owner: string = QBOT.gitee.owner
  repo: string = QBOT.gitee.repo
  constructor(private readonly httpClient: HttpClientService) {}
}
