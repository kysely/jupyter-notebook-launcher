import { spawn } from 'child_process'
import { throwError, R } from './respond'
import updateMenu from './menu'

const shutdown = notebook => {
    const process = spawn('kill', [notebook.pid])

    process.on('error', (err) => {
        throwError(...R.ERR_GENER(R.ERR_KILL, err))
    })
}

export default shutdown
