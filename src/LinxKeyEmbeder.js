const { MessageEmbed } = require('discord.js')
const _ = require('lodash')
const { getKeys } = require('./DataManager')

const DUNGEONS = {
  '375': 'Mists of Tirna Scithe',
  '376': 'The Necrotic Wake',
  '377': 'De Other Side',
  '378': 'Halls of Atonement',
  '379': 'Plaguefall',
  '380': 'Sanguine Depths',
  '381': 'Spires of Ascension',
  '382': 'Theater of Pain',
}

const getEmbed = (sort) => {
  const keys = getKeys()

  sortKeys(keys, sort)

  const characters = keys.reduce((red, cur) => {
    const charName = cur.unit.split('-')[0]
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

  const keyEmbed = new MessageEmbed()
    .setTitle('Linx Keystone')
    .setDescription('Ready to push some keys, boss?')
    .addFields(
      { name: 'Character', value: characters.join('\n'), inline: true },
      { name: 'Dungeon', value: dungeonNames.join('\n'), inline: true },
      { name: 'Level', value: levels.join('\n'), inline: true },
    )
    .setTimestamp()

  return keyEmbed
}

function sortKeys(keys, sort) {
  switch (_.toLower(sort)) {
    case 'character':
    case 'c':
      keys.sort((a, b) => {
        const aUnit = a.unit
        const bUnit = b.unit

        return aUnit === bUnit ? 0 : aUnit < bUnit ? -1 : 1
      })
      break

    case 'dungeon':
    case 'd':
      keys.sort((a, b) => {
        const aDung = DUNGEONS[a.dungeon_id]
        const bDung = DUNGEONS[b.dungeon_id]

        if (aDung === bDung) {
          const aLevel = parseInt(a.key_level)
          const bLevel = parseInt(b.key_level)
          return aLevel === bLevel ? 0 : aLevel < bLevel ? 1 : -1
        }

        return aDung === bDung ? 0 : aDung < bDung ? -1 : 1
      })
      break

    default:
      keys.sort((a, b) => {
        const aLevel = parseInt(a.key_level)
        const bLevel = parseInt(b.key_level)

        if (aLevel === bLevel) {
          const aDung = DUNGEONS[a.dungeon_id]
          const bDung = DUNGEONS[b.dungeon_id]
          return aDung === bDung ? 0 : aDung < bDung ? -1 : 1
        }

        return aLevel === bLevel ? 0 : aLevel < bLevel ? 1 : -1
      })
  }
}

module.exports = { getEmbed }
