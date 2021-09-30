require('dotenv').config()

const { Client, Intents } = require('discord.js')
const Manager = require('./src/DataManager')

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

bot.login(process.env.CLIENT_TOKEN)

bot.on('ready', () => {
    console.clear()
    console.log('Linx Keystone, ready to roll!')
    console.log('')

    const keys = Manager.getKeys()
    console.log(keys)
})