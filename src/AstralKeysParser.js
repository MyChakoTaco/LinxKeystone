require('dotenv').config()

const fs = require('fs')

const runParser = () => {
	fs.readFile(process.env.ASTRALKEYS_FILEPATH, 'utf8', (err, data) => {
		const astralKeysRE = /AstralKeys = ([\s\S]*?)AstralCharacters = {/
		const match = data.match(astralKeysRE)

		if (!match || !match[1]) {
			console.log('Unable to parse AstralKeys file at following filepath.')
			console.log(process.env.ASTRALKEYS_FILEPATH)
			return false
		}
		console.log(match[1])
	})
}

module.exports = { runParser };