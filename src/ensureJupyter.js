import locateExecutable from 'locate-executable'
import config from './storage'
import { throwError, R } from './respond'

const jupyter = () => config.get('jupyter')

const ensureJupyter = callback => {
    if ( jupyter() !== null ) return callback()

    locateExecutable('jupyter', (err, paths) => {
        if (err) return throwError(...R.ERR_LOCEXE(err))

        if (paths.length === 0) {
            var which = require('which')
            var resolved = which.sync('jupyter', {nothrow: true})
            if (resolved !== null) {
                paths.push(resolved)
            }
            else {
                return throwError(...R.ERR_ENOENT)
            }
        }

        config.set('jupyter', paths[0])
        callback()
        return
    })
}

export { jupyter, ensureJupyter }
