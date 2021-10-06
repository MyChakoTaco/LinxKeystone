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

  await deletePrevKeysInteractions()
    .catch((e) => {
      console.warn('There was an error deleting previous messages: ' + e)
    })
    .then(() => {
      const reply = getKeysReply({
        sort: sort,
        filter: filter,
        display: display,
      })

      interaction.reply(reply)
    })
    .catch((e) => {
      console.warn('There was an error replying to command: ' + e)
    })
    .then(() => {
      _PrevKeysInteraction = interaction
    })
}

async function deletePrevKeysInteractions() {
  // if (_PrevKeysInteraction) _PrevKeysInteraction.deleteReply()
}

module.exports = { Keys }
