import { shell, app } from 'electron'
import { autoUpdater } from "electron-updater"
import { askDialog, R } from './respond'

const downloadUpdate = () => shell.openExternal('https://github.com/kysely/jupyter-notebook-launcher/releases/latest')

const checkForUpdates = () => {
    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdates()

    autoUpdater.on('update-available', update => {
        askDialog(R.UPD_AVA(update), R.UPD_AVA_B, index => {
            if (index === 0) {
                downloadUpdate()
                app.quit()
            }
        })
    })
}

export default checkForUpdates
