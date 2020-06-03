const { Client } = require('discord.js')
const dotenv = require('dotenv');

let client = new Client();
dotenv.config()

client.on('ready', () => {
    console.log(`Bot is logged in as ${client.user.tag}`)
})

client.login(process.env.BOT_TOKEN)