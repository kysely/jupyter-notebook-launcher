import { M } from './respond'
import config from './storage'
import launch from './launch'
import { clearRecents } from './recents'

const generateRecents = () => {
    return config.get('recentLaunches').map(recentLaunch => {
        return {
                label: recentLaunch,
                click() { launch(recentLaunch) }
            }
    })
    .concat([
        {   type: 'separator'   },
        {
            label: M.CLEAR_RECENT,
            click() { clearRecents() }
        }
    ])
}

export default generateRecents
