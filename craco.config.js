/* craco.config.js */
const path = require(`path`)

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
			'@game': path.resolve(__dirname, 'src/game'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@utils': path.resolve(__dirname, 'src/utils')
		}
	}
}
