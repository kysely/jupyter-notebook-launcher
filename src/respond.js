import { dialog } from 'electron'

// Response messages
const R = {
    DRAG_ONTO:  'Drop to serve notebooks',
    ERR_LAL:    'Oops! Couldn\'t set the app to launch at login',
    ERR_LAUNCH: 'Couldn\'t launch the Notebook',
    ERR_LIST:   'Couldn\'t get the list of running Notebooks',
    ERR_KILL:   'Couldn\'t shut down the Notebook',
    ERR_JIMP:   'Oops! Couldn\'t read an image to generate port label',
    ERR_LNOPATH:['Can\'t launch server on this directory',
                'Are you sure it is accessible?'],
    ERR_ENOENT: ['Do you have Jupyter Notebook installed?',
                'It seems the starting \'jupyter\' command wasn\'t found on your computer.'],
    ERR_GENER:  (title, err) => [title, `Here's what we know: ${err.message}`],
    ERR_LOCEXE: (err) => ['Can\'t find Jupyter Notebook', `Here's what we know: ${err}`],
    ERR_WRONG:  'Oops, something went wrong'
}


// Menu labels
const M = {
    SERVE_NEW: 'Launch New Notebook',
    SERVE_RECENT: 'Launch Recent...',
    SERVE_DIALOG: 'Serve notebooks from',
    CLEAR_RECENT: 'Clear Recent Servers',
    LAL: 'Start at Login',
    HELP: 'About && Help',
    QUIT: 'Quit',
    LOOKING: 'Looking for Jupyter',

    //LIST: (n) => `Running ${n} Notebook Server${n === 1 ? '' : 's'}`,
    LIST_NONE: 'No Notebooks Running...',
}

const openDialog = (type, title = R.ERR_WRONG, body = '') => {
    if (type === 'err') {
        dialog.showErrorBox(title, body)
    }
}

const throwError = (title, body) => openDialog('err', title, body)

export { throwError, R, M }
