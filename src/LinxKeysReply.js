const { DiscordAPIError } = require('@discordjs/rest')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const _ = require('lodash')
const { getKeys } = require('./DataManager')
const { getImpFooterText } = require('./ImpFlavorText')

// Constants for string manipulation
const DUNGEON_ABBRS = {
  mots: 'Mists of Tirna Scithe',
  nw: 'The Necrotic Wake',
  dos: 'De Other Side',
  hoa: 'Halls of Atonement',
  pf: 'Plaguefall',
  sd: 'Sanguine Depths',
  soa: 'Spires of Ascension',
  top: 'Theater of Pain',
  'Mists of Tirna Scithe': 'mots',
  'The Necrotic Wake': 'nw',
  'De Other Side': 'dos',
  'Halls of Atonement': 'hoa',
  Plaguefall: 'pf',
  'Sanguine Depths': 'sd',
  'Spires of Ascension': 'soa',
  'Theater of Pain': 'top',
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

// Exported function to get reply to Keys command
const getKeysReply = ({ sort, filter, display }) => {
  const reply = {}
  const keys = getKeys()

  let replyKeys = mapKeysToDisplay(keys)

  replyKeys = filterKeys(replyKeys, filter)

  sortKeys(replyKeys, sort)

  switch (_.toLower(display)) {
    case 'text':
      reply.content = createText(sort, filter, replyKeys, keys.length)
      break

    case 'mobile':
      reply.content = createMobileText(sort, filter, replyKeys, keys.length)
      break

    default:
      reply.files = [new MessageAttachment('./media/imp.jpg', 'imp.jpg')]
      reply.embeds = [createEmbed(sort, filter, replyKeys, keys.length)]
  }

  return reply
}

// Creates an Embedded version
//
// Has no character truncation
// Has icons and flavor text
function createEmbed(sort, filter, replyKeys, total) {
  const embed = new MessageEmbed()
    .setTitle('Linx Keystone')
    .setDescription('Ready to push some keys, boss?')
    .setFooter(getImpFooterText(), 'attachment://imp.jpg')
    .setThumbnail('attachment://imp.jpg')
    .setTimestamp()

  const modifications = []
  if (sort) {
    modifications.push(`Sort by '${sort}'`)
  }
  if (filter) {
    modifications.push(`Filter by '${filter}'`)
    modifications.push(`${replyKeys.length}/${total} keys shown`)
  }
  if (modifications.length) {
    embed.addFields({
      name: 'Search Criteria',
      value: modifications.join('\n'),
      inline: false,
    })
  }

  if (replyKeys.length) {
    const characters = replyKeys.map((key) => key.character)
    const dungeons = replyKeys.map((key) => key.dungeon)
    const levels = replyKeys.map((key) => key.level)

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

// Creates a Text version
//
// Has no character truncation
function createText(sort, filter, replyKeys, total) {
  let output = ['Linx Keystone']
  output.push('Ready to push some keys, boss?')
  output.push('')

  const modifications = []

  if (sort) {
    modifications.push(`Sort by '${sort}'`)
  }
  if (filter) {
    modifications.push(`Filter by '${filter}'`)
    modifications.push(`${replyKeys.length}/${total} keys shown`)
  }

  if (modifications.length) {
    output.push('Search Criteria')
    output.push('---------------')
    output.push(modifications.join('\n'))
    output.push('')
  }

  if (replyKeys.length) {
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

    const characterPad = Math.max(maxCharacterLength, 'Character'.length) + 2
    const dungeonPad = Math.max(maxDungeonLength, 'Dungeon'.length) + 2
    const levelPad = Math.max(maxLevelLength, 'Level'.length)

    const totalPad = characterPad + dungeonPad + levelPad

    output.push(
      'Character'.padEnd(characterPad, ' ') +
        'Dungeon'.padEnd(dungeonPad, ' ') +
        'Level'.padEnd(levelPad, ' '),
    )

    output.push(''.padEnd(totalPad, '-'))

    replyKeys.forEach((key) => {
      output.push(
        key.character.padEnd(characterPad, ' ') +
          key.dungeon.padEnd(dungeonPad, ' ') +
          key.level.padEnd(levelPad, ' '),
      )
    })
  } else {
    output.push('Hrmm... no matches')
  }

  return '```' + output.join('\n') + '```'
}

// Creates an Mobile Text version
//
// Has character truncation
// Uses abbreviations for dungeons
function createMobileText(sort, filter, replyKeys, total) {
  let output = []

  const maxCharacterLength = replyKeys.reduce(
    (red, cur) => Math.max(cur.character.length, red),
    0,
  )
  const maxDungeonLength = replyKeys.reduce(
    (red, cur) => Math.max(DUNGEON_ABBRS[cur.dungeon].length, red),
    0,
  )
  const maxLevelLength = replyKeys.reduce(
    (red, cur) => Math.max(cur.level.length, red),
    0,
  )

  const characterPad = Math.max(maxCharacterLength, 'Character'.length) + 2
  const dungeonPad = 'Dungeon'.length

  const totalPad = characterPad + dungeonPad

  const modifications = []
  if (sort) {
    modifications.push(truncateText(`Sort: ${sort}`, totalPad))
  }
  if (filter) {
    modifications.push(truncateText(`Filter: ${filter}`, totalPad))
    modifications.push(`${replyKeys.length}/${total} keys shown`)
  }

  if (modifications.length) {
    output.push(modifications.join('\n'))
    output.push('')
  }

  if (replyKeys.length) {
    output.push(
      'Character'.padEnd(characterPad, ' ') + 'Dungeon'.padEnd(dungeonPad, ' '),
    )

    output.push(''.padEnd(totalPad, '-'))

    replyKeys.forEach((key) => {
      output.push(
        key.character.padEnd(characterPad, ' ') +
          DUNGEON_ABBRS[key.dungeon].padEnd(5, ' ') +
          key.level.padEnd(2, ' '),
      )
    })
  } else {
    output.push('No matches')
  }

  return '```' + output.join('\n') + '```'
}

// Helper to map complex keys data into display-only data
function mapKeysToDisplay(keys) {
  return keys.map((key) => {
    const character = key.unit.split('-')[0]
    const dungeon = DUNGEONS[key.dungeon_id] ? DUNGEONS[key.dungeon_id] : ''
    const level = key.key_level

    return { character: character, dungeon: dungeon, level: level }
  })
}

// Helper function to filter keys on filter text
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

// Helper function to sort keys on sort text
//
// Acceptable inputs: character, c, dungeon, d
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

// Truncates incoming text when a threshold is passed
function truncateText(text, threshold) {
  return text.length > threshold
    ? text.substring(0, threshold - 3) + '...'
    : text
}

module.exports = { getKeysReply }
