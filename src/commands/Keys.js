const fs = require('fs')
const { getEmbed } = require('../LinxKeyEmbeder.js')

const KEYS_FILEPATH = 'data/CommandKeys.json'

let _PrevKeysInteractions = []
let _IsFirstTimeLoad = true

const Keys = async (interaction) => {
  await deletePrevKeysInteractions()
    .then(() => {
      interaction.reply({ embeds: [getEmbed()] })
    })
    .then(() => {
      _PrevKeysInteractions.push(interaction)
    })

  savePrevKeysInteractions()
}

async function deletePrevKeysInteractions() {
  try {
    if (_IsFirstTimeLoad) {
      _PrevKeysInteractions = getPrevKeysInteractions()
      _IsFirstTimeLoad = false
    }

    _PrevKeysInteractions.forEach((interaction) => {
      interaction.deleteReply()
    })
  } catch (e) {
    console.warn('Keys Command: failed to delete previous interactions')
  } finally {
    _PrevKeysInteractions = []
  }
}

function getPrevKeysInteractions() {
  if (!fs.existsSync(KEYS_FILEPATH)) return []

  const content = fs.readFileSync(KEYS_FILEPATH)
  const interactions = JSON.parse(content)

  return interactions
}

function savePrevKeysInteractions() {
  const json = JSON.stringify(_PrevKeysInteractions)
  fs.writeFileSync(KEYS_FILEPATH, json, 'utf8')
}

module.exports = { Keys }
