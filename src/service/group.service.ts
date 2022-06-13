import { Inject, Injectable } from '@nestjs/common'
import { QbotProvider } from '@shared'
import { MESSAGE_LIBRARY, MESSAGE_LIBRARY_KEYS, QBOT } from '@option'
import { isInclude, inIndex, ping } from '@util'
import { GroupMessageEvent } from 'oicq'

@Injectable()
export class GroupService {
  @Inject() qbot: QbotProvider

  onModuleInit = () => {
    this.qbot.client.on('message.group', event => {
      this.groupMessageEvent(event).catch(console.log)
    })
  }

  groupMessageEvent = async (event: GroupMessageEvent) => {
    if (await this.listenGroup(event)) return
    if (await this.masterAction(event)) return
    if (await this.blackList(event)) return
    if (await this.commonAction(event)) return
    if (await this.keywordAction(event)) return
  }

  listenGroup = async (event: GroupMessageEvent) => {
    return !isInclude(QBOT.group.listen, [event.group_id])
  }

  masterAction = async (event: GroupMessageEvent) => {
    const isMaster = isInclude(event.sender.user_id, QBOT.admin.master)
    if (!isMaster) return false
    const direct = {
      '/给爷爬': async () => {
        if (!isAT) return
        const user_id = +isAT[1]
        const isKick = await event.group.kickMember(user_id)
        await event.reply(isKick ? '已踢走' : '没权限 踢不了', true)
      }
    }

    const isAT = event.message.find(v => v.type === 'at')
    const directKeys = Object.keys(direct)
    const isDirect = inIndex(event.raw_message, directKeys)
    if (!directKeys?.[isDirect]) return false
    await direct[directKeys[isDirect]]()
    return true
  }

  blackList = async (event: GroupMessageEvent) => {
    if (!isInclude(event.raw_message, QBOT.group.blackList.keyword)) {
      return false
    }

    await event.recall()
    await event.reply([
      { type: 'at', qq: event.sender.user_id },
      { type: 'text', text: QBOT.group.blackList.message }
    ])
    return true
  }

  commonAction = async (event: GroupMessageEvent) => {
    const direct = {
      '/来份涩图': async () => {
        await event.reply({
          type: 'image',
          file: 'https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images&method=mobile'
        })
      },
      '/百度': async () => {
        const wd = event?.source?.message.toString() || event.raw_message.split('/百度')[1].trim()
        if (!wd) return event.reply('请输入需要搜索的内容')
        await event.reply(
          `已经找到关于${wd}的解决办法\nhttps://www.baidu.com/s?wd=${encodeURI(wd)}`
        )
      },
      '/ping': async () => {
        const host = event.raw_message.split('/ping')?.[1].trim()
        const res = await ping(host.length ? host : undefined).catch((res: string) => res)
        await event.reply(res, true)
      },
      '/菜单': async () => {},
      '/下载': async () => {
        let url = `https://gitee.com/api/v5/repos/{owner}/{repo}/releases/latest`
      }
    }

    const directKeys = Object.keys(direct)
    const isDirect = inIndex(event.raw_message, directKeys)
    if (!directKeys?.[isDirect]) return false
    await direct[directKeys[isDirect]]()
    return true
  }

  keywordAction = async (event: GroupMessageEvent) => {
    const index = inIndex(event.raw_message, MESSAGE_LIBRARY_KEYS)
    if (index == -1) return false

    await event.reply(MESSAGE_LIBRARY[MESSAGE_LIBRARY_KEYS[index]], true)
    return true
  }
}
