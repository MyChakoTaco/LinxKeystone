require('dotenv').config()

const { Client, Intents } = require('discord.js')
const AstralKeysParser = require('./src/AstralKeysParser')

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

bot.login(process.env.CLIENT_TOKEN)

bot.on('ready', () => {
    console.clear()
    console.log('Linx Keystone, ready to roll!')
    console.log('')

    AstralKeysParser.runParser()
})