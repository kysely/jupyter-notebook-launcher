import os from 'os'
import { spawn } from 'child_process'
import { throwError, R } from './respond'
import { addRecent } from './recents'
import updateMenu from './menu'
import { jupyter } from './ensureJupyter'

const launch = (directory = os.homedir(), port = null) => {
    const customPort = port ? ['--port', port] : []

    const process = spawn(jupyter(), ['notebook', directory, ...customPort])
    addRecent(directory)

    process.stderr.on('data', (err) => {
        if (err.toString().indexOf('No such') !== -1) {
            throwError(...R.ERR_LNOPATH)
        }
    })

    process.on('error', (err) => {
        if (err.message.indexOf('ENOENT') !== -1) {
            throwError(...R.ERR_ENOENT)
        } else {
            throwError(...R.ERR_GENER(R.ERR_LAUNCH, err))
        }
    })
}

export default launch
