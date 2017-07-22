import { app } from 'electron'
import AutoLaunch from 'auto-launch'
import config from './storage'
import { throwError, R } from './respond'

const appLauncher = new AutoLaunch({ name: app.getName() })

const toggleAutoLaunch = turnOn => {
    const toggler = turnOn ? appLauncher.enable() : appLauncher.disable()

    toggler
        .then( confirm => {
            config.set('launchAtLogin', turnOn)
        })
        .catch( err => throwError(...R.ERR_GENER(R.ERR_LAL, err)) )
}

export { toggleAutoLaunch }
