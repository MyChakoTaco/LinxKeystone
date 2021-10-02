const { Client, Intents } = require('discord.js')
const { token } = require('./config.json')
const Commands = require('./src/Commands.js')

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

bot.login(token)

bot.once('ready', () => {
  console.clear()
  console.log('Linx Keystone, ready to roll!')
})

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  if (commandName === 'keys') {
    Commands.Keys(interaction)
  }
})