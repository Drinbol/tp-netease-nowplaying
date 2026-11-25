# tp-netease-nowplaying

Touch Portal 插件（Node.js）：读取网易云音乐 PC 客户端（cloudmusic.exe）的进程内存，
获取播放状态并同步到 Touch Portal 按钮。

## 原理

- 用 [memoryjs](https://github.com/Rob--/memoryjs) 打开 `cloudmusic.exe` 进程
- 定位 `cloudmusic.dll` 模块基址 + 偏移 `0x0016FC80`，读出播放状态指针
- 状态变化时通过 [touchportal-api](https://github.com/KingOfPossum/TouchPortalAPI) 更新 TP 状态
- 插件 ID：`cloudmusic`

## 注意

- **内存偏移与网易云版本强相关**：`0x0016FC80` 对应特定旧版本客户端，新版可能失效，
  需自行用 CE 重新定位播放状态地址并修改 `main.js` 中的偏移
- 仅支持 Windows（memoryjs 依赖 WinAPI）

## 使用

```bash
npm install
node main.js
```

然后在 Touch Portal 中连接该插件（需自行按 entry.tp 规范补插件定义文件）。

## 许可证

MIT
