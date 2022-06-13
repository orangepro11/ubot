interface IQBotOptions {
  /* 登录相关配置 */
  login: {
    /* QQ号 */
    account: number
    /* QQ密码，可选，如不填则扫码登录 */
    password?: string
  }
  /* 管理员相关 */
  admin: {
    /* 管理员QQ号 */
    master: number[]
  }
  /* 群相关 */
  group: {
    /* 监听群 */
    listen: number[]
    /* 关键字黑名单 */
    blackList?: {
      keyword: string[]
      message: string
    }
  }
  /* gitee相关 */
  gitee?: {
    /* 自己去 https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoStargazers?ex=no 登录获取 */
    access_token: string
    /* 组织名 */
    owner: string
    /* 仓库名 */
    repo: string
  }
}

export const QBOT: IQBotOptions = {
  login: {
    account: 3289446362,
    password: 'xk987321'
  },
  admin: {
    master: [22528850]
  },
  group: {
    listen: [744080406, 965190918, 723562060, 1049576293],
    blackList: {
      keyword: ['腾讯'],
      message: ' Warning! 请不要发广告! \n你再发别逼我跪下来求你!'
    }
  }
}

export const MESSAGE_LIBRARY = {
  help: `你觉得机器人能帮你什么？还不如去多百度多翻文档\nbaidu: https://baidu.com\nuview-doc: https://uviewui.com`
}

export const MESSAGE_LIBRARY_KEYS = Object.keys(MESSAGE_LIBRARY)
