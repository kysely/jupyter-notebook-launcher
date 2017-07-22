import config from './storage'
import list from './list'
import { updateMenu } from './menu'

let lastStateUpdate = 0
let watching = null
const watchFreq = 1000

const state = notebook => `${notebook.pid}-${notebook.token}`

const updateInternalState = notebooks => {
    const newState = []

    notebooks.forEach( notebook => newState.push(state(notebook)) )
    config.set('runningServersState', newState)
}

const stateHasChanged = newNotebooks => {
    let hasChanged = true
    const internalState = config.get('runningServersState')

    if (internalState.length !== newNotebooks.length) return true
    if ((internalState.length === newNotebooks.length) && newNotebooks.length === 0) return false

    newNotebooks.forEach(notebook => {
        if (internalState.indexOf(state(notebook)) === -1) return
        hasChanged = false
    })

    return hasChanged
}

const watchServers = () => {
    if (Date.now() - lastStateUpdate < watchFreq) return

    list(notebooks => {
        if (stateHasChanged(notebooks)) updateMenu()

        lastStateUpdate = Date.now()
        return
    })
}

const startWatching = () => {
    watching = setInterval(watchServers, watchFreq)
    return
}

const stopWatching = () => {
    if (watching) clearInterval(watching)
    return
}


export { updateInternalState, watchServers, watching, startWatching, stopWatching }
