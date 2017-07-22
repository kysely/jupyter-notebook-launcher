import Store from 'electron-store'

const config = new Store({
	defaults: {
		launchAtLogin: false,
        recentLaunches: [],
		runningServersState: [],
		jupyter: null
	}
})

export default config
