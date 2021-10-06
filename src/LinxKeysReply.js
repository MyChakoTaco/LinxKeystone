const { MessageEmbed } = require('discord.js')
const _ = require('lodash')
const { getKeys } = require('./DataManager')

const DUNGEON_ABBRS = {
  mots: 'Mists of Tirna Scithe',
  nw: 'The Necrotic Wake',
  dos: 'De Other Side',
  hoa: 'Halls of Atonement',
  pf: 'Plaguefall',
  sd: 'Sanguine Depths',
  soa: 'Spires of Ascension',
  top: 'Theater of Pain',
}

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

const getKeysReply = ({ sort, filter, display }) => {
  const reply = {}
  const keys = getKeys()

  let replyKeys = mapKeysToDisplay(keys)

  replyKeys = filterKeys(replyKeys, filter)

  sortKeys(replyKeys, sort)

  if (display === 'text') {
    reply.content = createText(sort, filter, replyKeys, keys.length)
  } else {
    reply.embeds = [createEmbed(sort, filter, replyKeys, keys.length)]
  }

  return reply
}

function mapKeysToDisplay(keys) {
  return keys.map((key) => {
    const character = key.unit.split('-')[0]
    const dungeon = DUNGEONS[key.dungeon_id] ? DUNGEONS[key.dungeon_id] : ''
    const level = key.key_level

    return { character: character, dungeon: dungeon, level: level }
  })
}

function createEmbed(sort, filter, replyKeys, total) {
  const embed = new MessageEmbed()
    .setTitle('Linx Keystone')
    .setDescription('Ready to push some keys, boss?')
    .setTimestamp()

  const modifications = []
  if (filter) {
    modifications.push(
      `Filter by '${filter}' (${replyKeys.length}/${total} keys shown)`,
    )
  }
  if (sort) {
    modifications.push(`Sort by '${sort}'`)
  }
  if (modifications.length) {
    embed.addFields({
      name: 'Search Criteria',
      value: modifications.join('\n'),
      inline: false,
    })
  }

  const characters = replyKeys.map((key) => key.character)
  const dungeons = replyKeys.map((key) => key.dungeon)
  const levels = replyKeys.map((key) => key.level)

  if (replyKeys.length) {
    embed.addFields(
      { name: 'Character', value: characters.join('\n'), inline: true },
      { name: 'Dungeon', value: dungeons.join('\n'), inline: true },
      { name: 'Level', value: levels.join('\n'), inline: true },
    )
  } else {
    embed.addFields({
      name: 'Hrmm... no matches',
      value: 'Maybe we need more anima...',
      inline: false,
    })
  }

  return embed
}

function createText(sort, filter, replyKeys, total) {
  const maxCharacterLength = replyKeys.reduce(
    (red, cur) => Math.max(cur.character.length, red),
    0,
  )
  const maxDungeonLength = replyKeys.reduce(
    (red, cur) => Math.max(cur.dungeon.length, red),
    0,
  )
  const maxLevelLength = replyKeys.reduce(
    (red, cur) => Math.max(cur.level.length, red),
    0,
  )

  let output = ['Linx Keystone']
  output.push('Ready to push some keys, boss?')
  output.push('')

  const modifications = []
  if (filter) {
    modifications.push(
      `Filter by '${filter}' (${replyKeys.length}/${total} keys shown)`,
    )
  }

  if (sort) {
    modifications.push(`Sort by '${sort}'`)
  }

  if (modifications.length) {
    output.push('Search Criteria')
    output.push(modifications.join('\n'))
    output.push('')
  }

  const characterPad = Math.max(maxCharacterLength, 'Character'.length) + 2
  const dungeonPad = Math.max(maxDungeonLength, 'Dungeon'.length) + 2
  const levelPad = Math.max(maxLevelLength, 'Level'.length)

  if (replyKeys.length) {
    output.push(
      'Character'.padEnd(characterPad, ' ') +
        'Dungeon'.padEnd(dungeonPad, ' ') +
        'Level'.padEnd(levelPad, ' '),
    )

    replyKeys.forEach((key) => {
      output.push(
        key.character.padEnd(characterPad, ' ') +
          key.dungeon.padEnd(dungeonPad, ' ') +
          key.level.padEnd(levelPad, ' '),
      )
    })
  } else {
    output.push('Hrmm... no matches')
    output.push('Maybe we need more anima...')
  }

  return '```' + output.join('\n') + '```'
}

function filterKeys(keys, filter) {
  if (!filter) {
    return keys
  }

  const filteredKeys = keys.filter((key) => {
    filter = _.toLower(filter)

    const dungeonAbbr = DUNGEON_ABBRS[filter]

    return (
      (dungeonAbbr && dungeonAbbr === key.dungeon) ||
      _.includes(_.toLower(key.character), filter) ||
      _.includes(_.toLower(key.dungeon), filter) ||
      _.includes(_.toLower(key.level), filter)
    )
  })

  return filteredKeys
}

function sortKeys(keys, sort) {
  switch (_.toLower(sort)) {
    case 'character':
    case 'c':
      keys.sort((a, b) => {
        const aUnit = a.character
        const bUnit = b.character

        return aUnit === bUnit ? 0 : aUnit < bUnit ? -1 : 1
      })
      break

    case 'dungeon':
    case 'd':
      keys.sort((a, b) => {
        const aDung = a.dungeon
        const bDung = b.dungeon

        if (aDung === bDung) {
          const aLevel = parseInt(a.level)
          const bLevel = parseInt(b.level)
          return aLevel === bLevel ? 0 : aLevel < bLevel ? 1 : -1
        }

        return aDung === bDung ? 0 : aDung < bDung ? -1 : 1
      })
      break

    default:
      keys.sort((a, b) => {
        const aLevel = parseInt(a.level)
        const bLevel = parseInt(b.level)

        if (aLevel === bLevel) {
          const aDung = DUNGEONS[a.dungeon]
          const bDung = DUNGEONS[b.dungeon]
          return aDung === bDung ? 0 : aDung < bDung ? -1 : 1
        }

        return aLevel === bLevel ? 0 : aLevel < bLevel ? 1 : -1
      })
  }
}

module.exports = { getKeysReply }
