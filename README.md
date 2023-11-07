# 使用说明

掘金自动签到脚本
[详细使用方法请看这里](https://juejin.cn/post/7021027165294559245)

## 环境变量

配置本地或者部署的环境变量
| 名称 | 描述 | 默认 |
| --- | --- | --- |
| `JUEJIN_COOKIE` | 请求头 cookie | `null` |
| `JUEJIN_AID` | aid | `null` |
| `JUEJIN_UUID` | uuid | `null` |
| `JUEJIN_SIGNATURE` | 签名 可为空 | `null` |
| `JUEJIN_SERVER_SEND_KEY` | server 酱 key | `null` |
| `CRON_EXPRESSION` | 设置每天任务时间 cron 表达式 | `null` |

## 部署

### 部署在 Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fphy-lei%2Fnetlify_juejin_auto)
