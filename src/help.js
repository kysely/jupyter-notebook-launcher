import path from 'path'
import { BrowserWindow } from 'electron'

const openHelp = () => {
    const helpWindow = new BrowserWindow({
        width: 600,
        height: 650,
        useContentSize: true,
        titleBarStyle: 'hidden-inset',
        resizable: false,
        maximizable: false,
        minimizable: false,
        webPreferences: {
            devTools: false
        }
    })

    helpWindow.loadURL(`file://${path.join(__dirname, '..', 'static', 'help.html')}`)
}

export default openHelp
