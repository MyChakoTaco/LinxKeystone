const fs = require('fs')
const { getKeysReply } = require('../LinxKeysReply.js')

const KEYS_FILEPATH = 'data/CommandKeys.json'

const Keys = async (interaction) => {
  const sort = interaction.options.getString('sort')
  const filter = interaction.options.getString('filter')
  const display = interaction.options.getString('display')
    ? interaction.options.getString('display')
    : 'embed'

  const keysReply = getKeysReply({
    sort: sort,
    filter: filter,
    display: display,
  })

  await interaction.reply(keysReply).catch((e) => {
    console.warn('Issue replying to Keys command: ' + e)
  })
}

module.exports = { Keys }
