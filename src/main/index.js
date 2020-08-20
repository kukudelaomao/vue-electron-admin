import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minHeight: 770,
    height: 770,
    useContentSize: true,
    minWidth: 1280,
    width: 1280,
    center: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
    // electron 5 之后，为了安全 nodeIntegration 会默认 false，但会出现require not defined错误，需要手动改为true。
    // webSecurity是什么意思呢？顾名思义，他是设置web安全性，如果参数设置为 false，它将禁用相同地方的规则 (通常测试服), 并且如果有2个非用户设置的参数，就设置 allowDisplayingInsecureContent 和 allowRunningInsecureContent的值为true。 （webSecurity的默认值为true）
    // allowDisplayingInsecureContent表示是否允许一个使用 https的界面来展示由 http URLs 传过来的资源。默认false。
    // allowRunningInsecureContent表示是否允许一个使用 https的界面来渲染由 http URLs 提交的html，css，javascript。默认为 false。
    // frame: false
    // frame: false 参数用来设置无边框；
    // resizable: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
