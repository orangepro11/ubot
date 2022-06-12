# ubot

ubot 由全称 uview-bot 缩写而来  
取缩写只是为了简单易记  
顾名思义当然是属于 uview 生态下的一个 bot 辣

---

# uViewUI Official Website

Visit our site: [https://www.uviewui.com/](https://www.uviewui.com/)

---

# Use

```shell
git clone https://github.com/akun2333/ubot
cd ubot
pnpm i
# change option.login
pnpm dev
```

---

# 技术选型

- nestJs
- oicq

---

# 业务设计

- ## Module

  - Message Queue

- ## Bot

  - [x] 监听指定群
  - [x] 拒绝私聊
  - [x] 拒绝好友申请

- ## 管理

  - [x] 广告警告
  - [x] 踢出刁民
  - 拒绝重复群员入群

- ## 消息

  - [x] 关键词匹配回复

- ## 功能
  - [x] 每日涩图
  - [x] 百度

---

# TODO

- nestjs+oicq 集业务协议一体调试频繁的上下线容易导致封号异常
- 短时间内如果触发大量回复事件也有可能导致封号异常
