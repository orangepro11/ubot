import { Injectable } from '@nestjs/common'
import { HttpClientService } from '@tresdoce/nestjs-httpclient'
import { QBOT } from '@option'

@Injectable()
export class GiteeProvider {
  access_token: string
  owner: string
  repo: string

  // Inject HttpClientService with required arguments constructor
  constructor(private readonly httpClient: HttpClientService) {}

  onModuleInit() {
    this.access_token = QBOT.gitee.access_token || ''
    this.owner = QBOT.gitee.owner || ''
    this.repo = QBOT.gitee.repo || ''
  }

  async getLatestRelease() {
    const url = `https://gitee.com/api/v5/repos/${this.owner}/${this.repo}/releases/latest?access_token=${this.access_token}`
    console.log(url)
    const response = await this.httpClient.get(url)
    return response.data
  }

  async getReadMe() {
    const url = `https://gitee.com/umicro/uView2.0/raw/master/uni_modules/uview-ui/changelog.md`
    const response = await this.httpClient.get(url)
    console.log(response)
    return response.data
  }
}
