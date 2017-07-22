import path from 'path'
import os from 'os'
import { app, Tray, dialog } from 'electron'
import { R, M } from './respond'
import { updateMenu, loadingMenu } from './menu'
import launch from './launch'
import { ensureJupyter } from './ensureJupyter'
import { startWatching } from './state'
import checkForUpdates from './update'
import packagejson from '../package.json'

const trayIcon = {
    app: null,
    iconPath: path.join(__dirname, '..', 'static', 'iconTemplate@2x.png'),
    setDefaultImage: function() {
        this.setTitle('')
    },
    setDragImage: function() {
        this.setTitle(R.DRAG_ONTO)
    },
    openDropped: function(event, files) {
        launch(files[0])
    },
}

app.setName('Jupyter Notebook Launcher')

app
    .on('ready', () => {
        trayIcon.app = new Tray(trayIcon.iconPath)
        trayIcon.app.setTitle(M.LOOKING)
        loadingMenu(trayIcon.app)

        ensureJupyter(() => {
            trayIcon.app.setTitle('')
            trayIcon.app
                .on('drag-enter', trayIcon.setDragImage)
                .on('drag-leave', trayIcon.setDefaultImage)
                .on('drag-end',   trayIcon.setDefaultImage)
                .on('drop-files', trayIcon.openDropped)

            updateMenu()
            startWatching()
            checkForUpdates()
        })
    })
    .on('window-all-closed', () => {}) // Prevent app.quit() when help window closes
    .dock.hide()


const getTray = () => trayIcon.app
export default getTray
