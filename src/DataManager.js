require('dotenv').config()

const fs = require('fs')

const LINXKEYS_FILEPATH = "data/LinxKeys.json"
const ASTRALKEYS_FILEPATH = process.env.ASTRALKEYS_FILEPATH

const getKeys = () => {
	let keys = []

	try {
		keys = pullAstralKeys()
	} catch (err) {
		console.log("There was an error pulling AstralKeys data:")
		console.error(err)
		console.log("Loading from backup LinxKeys")
		
		keys = pullLinxKeys()
	}

	return keys
}

function pullLinxKeys() {
	const content = fs.readFileSync(LINXKEYS_FILEPATH)	
	const keys = JSON.parse(content)

	return keys
}

function pullAstralKeys() {
	let keys = []

	try {
		const data = fs.readFileSync(ASTRALKEYS_FILEPATH, 'utf8')
		keys = parseAstralKeysData(data)
	}
	catch {
		const data = fs.readFileSync(ASTRALKEYS_FILEPATH.replace(".bak", ""), 'utf-8')
		keys = parseAstralKeysData(data)
	}

	saveLinxKeys(keys)

	return keys
}

function saveLinxKeys(keys) {
	const json = JSON.stringify(keys)
	fs.writeFileSync(LINXKEYS_FILEPATH, json, 'utf8')
}

function parseAstralKeysData(data) {
	const keys = []

	const re = /AstralKeys = {([\s\S]*?)\n}/
	const matchGrps = data.match(re)

	// split by each AstralKey
	const unparseds = matchGrps[1].split(", --")

	for (let i = 0; i < unparseds.length - 1; i++) {
		const re2 = /{([\s\S]*?)}/
		const matchGrps2 = unparseds[i].match(re2)

		const key = {}

		// get field keys and values
		const fields = matchGrps2[1].split(",")

		for (let j = 0; j < fields.length - 1; j++) {
			const re2 = /\[\"(\w+)\"\] = "?([\w\d#-`]+)"?/
			const fieldMatch = fields[j].match(re2)

			const keyStr = fieldMatch[1]
			const val = fieldMatch[2]

			key[keyStr] = val
		}

		keys.push(key)
	}

	return keys
}

module.exports = { getKeys };