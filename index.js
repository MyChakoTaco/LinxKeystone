const { Client, Intents } = require('discord.js')
const { token, clientId } = require('./config.json')
const Commands = require('./src/Commands.js')

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

bot.login(token)

bot.once('ready', () => {
  console.clear()
  console.log('Linx Keystone, ready to roll!')
})

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName, channel } = interaction

  await deleteBotMessagesFromChannel(channel)

  switch (commandName) {
    case 'keys':
      Commands.Keys(interaction)
      break
    default:
      console.warn('Invalid command: ' + commandName)
  }
})

async function deleteBotMessagesFromChannel(channel) {
  try {
    await channel.messages.fetch({ limit: 100 }).then((messages) => {
      const botMessages = messages.filter((m) => m.author.id === clientId)
      channel.bulkDelete(botMessages)
    })
  } catch (e) {
    console.warn('There was an issue deleting bot messages: ' + e)
  }
}
