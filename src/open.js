import { shell } from 'electron'

const openInBrowser = notebook => {
    if (typeof notebook !== 'object') return
    shell.openExternal(`${notebook.url}?token=${notebook.token}`)
    return
}

export default openInBrowser
