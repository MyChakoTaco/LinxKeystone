const { MessageEmbed } = require('discord.js')
const { getKeys } = require('./DataManager')

const DUNGEONS = {
	'375': 'Mists of Tirna Scithe',
	'376': 'The Necrotic Wake',
	'377': 'De Other Side',
	'378': 'Halls of Atonement',
	'379': 'Plaguefall',
	'380': 'Sanguine Depths',
	'381': 'Spires of Ascension',
	'382': 'Theater of Pain'
}

const getEmbed = () => {
	const keys = getKeys()

	keys.sort((a, b) => {
		const aKeyLevel = parseInt(a.key_level)
		const bKeyLevel = parseInt(b.key_level)

		if (aKeyLevel < bKeyLevel) return 1

		if (aKeyLevel > bKeyLevel) return -1

		const aDungeonID = parseInt(a.dungeon_id)
		const bDungeonID = parseInt(bKeyLevel.dungeon_id)

		return aDungeonID < bDungeonID ? 1 : -1
	})

	const characters = keys.reduce((red, cur) => {
		const charName = cur.unit.split("-")[0]
		return [...red, charName]
	}, [])

	const dungeonIDs = keys.reduce((red, cur) => {
		const charName = cur.dungeon_id
		return [...red, charName]
	}, [])

	const dungeonNames = dungeonIDs.map((id) => DUNGEONS[id])

	const levels = keys.reduce((red, cur) => {
		const charName = cur.key_level
		return [...red, charName]
	}, [])

	const keyEmbed =
		new MessageEmbed()
			.setTitle("Linx Keystone")
			.setDescription("Ready to push some keys, boss?")
			.addFields(
				{ name: 'Character', value: characters.join("\n"), inline: true },
				{ name: 'Dungeon', value: dungeonNames.join("\n"), inline: true },
				{ name: 'Level', value: levels.join("\n"), inline: true }
			)
			.setTimestamp()

	return keyEmbed
}

module.exports = { getEmbed }