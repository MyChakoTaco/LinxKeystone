const fs = require('fs')
const { getKeysReply } = require('../LinxKeysReply.js')

const KEYS_FILEPATH = 'data/CommandKeys.json'

let _PrevKeysInteraction

const Keys = async (interaction) => {
  const sort = interaction.options.getString('sort')
  const filter = interaction.options.getString('filter')
  const display = interaction.options.getString('display')
    ? interaction.options.getString('display')
    : 'embed'

  const reply = getKeysReply({
    sort: sort,
    filter: filter,
    display: display,
  })

  await interaction
    .reply(reply)
    .catch((e) => {
      console.warn('Issue replying to Keys command: ' + e)
    })
}

module.exports = { Keys }
