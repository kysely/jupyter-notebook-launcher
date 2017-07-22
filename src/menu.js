import { Menu } from 'electron'
import { M } from './respond'
import launch from './launch'
import list from './list'
import shutdown from './shutdown'
import openInBrowser from './open'
import portImage from './portImage'
import getTray from './app'
import { updateInternalState } from './state'
import STATIC from './menu_template_static'

const generateRunningHeader = amount => {
    if (amount > 0) return []

    return [
        {
            label: M.LIST_NONE,
            enabled: false
        },
    ]
}

const serverClick = (notebook, altKey) => {
    if (altKey === true) return shutdown(notebook)

    openInBrowser(notebook)
    return
}

const generateRunningServer = (notebook, cb) => {
    portImage(notebook.port, iconPath => {
        cb([
            {
                label: `${notebook.notebook_dir}`,
                icon: iconPath,
                click(mi, bw, event) { serverClick(notebook, event.altKey) }
            },
        ])
        return
    })
}

const sendTemplate = (template, callback) => {
    callback( template.concat(STATIC.FOOTER) )
}

const buildTemplate = callback => {
    list(notebooks => {
        let added = 0
        updateInternalState(notebooks)

        const template = STATIC.HEADER()
                        .concat( generateRunningHeader(notebooks.length) )

        if (notebooks.length < 1) return sendTemplate(template, callback)

        notebooks.forEach(notebook => {
            generateRunningServer(notebook, menuItem => {
                template.push(...menuItem)

                if (++added === notebooks.length) {
                    sendTemplate(template, callback)
                    return
                }
            })
        })

    })
}

const updateMenu = () => {
    buildTemplate(template => {
        getTray().setContextMenu( Menu.buildFromTemplate(template) )
    })
}

const loadingMenu = tray => {
    tray.setContextMenu( Menu.buildFromTemplate(STATIC.FOOTER) )
}

export { updateMenu, loadingMenu }
