const { Client } = require('discord.js')
const WS = require('./ws/ws')
const dotenv = require('dotenv')

let client = new Client();
dotenv.config()

let ws = new WS('bf56d570e62cdb573c86b18526296117', 5655, client)

client.on('ready', () => {
    console.log(`Bot is logged in as ${client.user.tag}`)
})

client.login(process.env.BOT_TOKEN)