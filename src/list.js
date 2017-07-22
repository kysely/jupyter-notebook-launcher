import { spawn } from 'child_process'
import { throwError, R } from './respond'
import { dialog } from 'electron'
import { jupyter } from './ensureJupyter'

const formatList = data => {
    const arrayFromData = data.toString().match(/{.*}/g)
    return arrayFromData ? arrayFromData : []
}

const list = callback => {
    const process = spawn(jupyter(), ['notebook', 'list', '--json'])

    const processTimeOut = setTimeout(() => callback([]), 2000)

    process.stdout.on('data', notebooksList => {
        clearTimeout(processTimeOut)
        const notebooks = []

        formatList(notebooksList).forEach(notebook => {
            notebooks.push(JSON.parse(notebook))
        })

        return callback(notebooks)
    })

    process.on('error', (err) => {
        if (err.message.indexOf('ENOENT') !== -1) {
            throwError(...R.ERR_ENOENT)
        } else {
            throwError(...R.ERR_GENER(R.ERR_LIST, err))
        }
    })
}

export default list
