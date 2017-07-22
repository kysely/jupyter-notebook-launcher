import { dialog } from 'electron'
import { M } from './respond'
import config from './storage'
import launch from './launch'
import { toggleAutoLaunch } from './automatization'
import openHelp from './help'
import generateRecents from './menu_template_recents'

const STATIC = {
    HEADER: () => [
        {
            label: M.SERVE_NEW,
            accelerator: 'Cmd+N',
            click() {
                dialog.showOpenDialog({ properties: ['openDirectory'], message: M.SERVE_DIALOG },
                    (directories) => {
                        if (directories) launch(directories[0])
                    }
                )
            }
        },
        {
            label: M.SERVE_RECENT,
            submenu: generateRecents()
        },
        { type: 'separator' },
    ],
    FOOTER: [
        { type: 'separator' },
        {
            label: M.LAL,
            type: 'checkbox',
            checked: config.get('launchAtLogin'),
            click(menuItem) { toggleAutoLaunch(menuItem.checked) }
        },
        {
            label: M.HELP,
            click() { openHelp() }
        },
        {
            label: M.QUIT,
            role: 'quit',
            accelerator: 'Cmd+Q',
        }
    ]
}

export default STATIC
