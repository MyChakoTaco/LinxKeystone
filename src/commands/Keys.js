const fs = require('fs')
const { getEmbed } = require('../LinxKeyEmbeder.js')

const KEYS_FILEPATH = 'data/CommandKeys.json'

let _PrevKeysInteraction

const Keys = async (interaction) => {
  const sort = interaction.options.getString('sort')

  await deletePrevKeysInteractions()
    .then(() => {
      interaction.reply({ embeds: [getEmbed(sort)] })
    })
    .then(() => {
      _PrevKeysInteraction = interaction
    })
}

async function deletePrevKeysInteractions() {
  if (_PrevKeysInteraction) _PrevKeysInteraction.deleteReply()
}

module.exports = { Keys }
