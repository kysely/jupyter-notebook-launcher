import config from './storage'
import updateMenu from './menu'

const clearRecents = () => {
    config.set('recentLaunches', [])
}

const addRecent = newPath => {
    const newRecents = [newPath]

    config.get('recentLaunches').forEach(launch => {
        if (newRecents.length >= 10) return
        if (launch === newPath) return
        newRecents.push(launch)
    })

    config.set('recentLaunches', newRecents)
}

export { clearRecents, addRecent }
