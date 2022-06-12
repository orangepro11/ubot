import { Inject, Injectable } from '@nestjs/common'
import { QbotProvider } from '@shared'
import { MESSAGE_LIBRARY, MESSAGE_LIBRARY_ARRAY, QBOT } from '@option'
import { isInclude, inIndex } from '@util'
import { GroupMessageEvent } from 'oicq'
import { ping } from '../util/system'

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
    if (await this.backList(event)) return
    if (await this.commonAction(event)) return
    if (await this.keywordAction(event)) return
  }

  listenGroup = async (event: GroupMessageEvent) => {
    return !isInclude(QBOT.group.listen, [event.group_id])
  }

  masterAction = async (event: GroupMessageEvent) => {
    const isMaster = isInclude(event.sender.user_id, QBOT.admin.master)
    if (!isMaster) return false

    const isAT = event.message.find(v => v.type === 'at')
    const isDirect = inIndex(event.raw_message, QBOT.admin.direct)
    const direct = QBOT.admin.direct?.[isDirect]
    if (!direct) return false

    const action = {
      '/给爷爬': async () => {
        if (!isAT) return
        const user_id = +isAT[1]
        const isKick = await event.group.kickMember(user_id)
        await event.reply(isKick ? '已踢走' : '没权限 踢不了', true)
      }
    }?.[direct]

    if (!action) return false
    await action()
    return true
  }

  backList = async (event: GroupMessageEvent) => {
    if (!isInclude(event.raw_message, QBOT.group.backList.keyword)) {
      return false
    }

    await event.recall()
    await event.reply([
      { type: 'at', qq: event.sender.user_id },
      { type: 'text', text: QBOT.group.backList.message }
    ])
    return true
  }

  commonAction = async (event: GroupMessageEvent) => {
    const isDirect = inIndex(event.raw_message, QBOT.group.direct)
    const direct = QBOT.group.direct?.[isDirect]
    if (!direct) return false

    const action = {
      '/来份涩图': async () => {
        await event.group.sendMsg({
          type: 'image',
          file: 'https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images&method=mobile'
        })
      },
      '/百度': async () => {
        const wd = event?.source?.message.toString()
        if (!wd) return
        await event.reply(
          `已经找到关于 '${wd}' 的解决办法\nhttps://www.baidu.com/s?wd=${encodeURI(wd)}`
        )
      },
      '/ping': async () => {
        const host = event?.source?.message.toString()
        await event.reply(await ping(host))
      }
    }?.[direct]

    if (!action) return false
    await action()
    return true
  }

  keywordAction = async (event: GroupMessageEvent) => {
    const index = inIndex(event.raw_message, MESSAGE_LIBRARY_ARRAY)
    if (index == -1) return false

    await event.reply(MESSAGE_LIBRARY[MESSAGE_LIBRARY_ARRAY[index]], true)
    return true
  }
}
