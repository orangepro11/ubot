export const QBOT = {
  login: {
    account: 10001,
    password: ''
  },
  admin: {
    master: [],
    direct: ['/给爷爬']
  },
  group: {
    listen: [],
    backList: {
      keyword: ['腾讯'],
      message: ' Warning! 请不要发广告! \n你再发别逼我跪下来求你!'
    },
    direct: ['/来份涩图', '/百度']
  }
}

export const MESSAGE_LIBRARY = {
  help: `你觉得机器人能帮你什么？还不如去多百度多翻文档\nbaidu: https://baidu.com\nuview-doc: https://uviewui.com`
}

export const MESSAGE_LIBRARY_ARRAY = Object.keys(MESSAGE_LIBRARY)
