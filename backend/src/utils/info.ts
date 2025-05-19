import packageDetails from '../../package.json'

function logInfo() {
	console.clear()

	console.log(
		'\tNode',
		process.version,
		'Express',
		packageDetails.dependencies.express,
		process.platform,
		process.arch
	)
}

export default logInfo
