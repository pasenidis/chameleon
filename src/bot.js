const { Client } = require('discord.js')
const { nanoid } = require('nanoid');
const WS = require('./ws/ws')
const dotenv = require('dotenv')

let client = new Client()
let _token = nanoid()
dotenv.config()

let ws = new WS(_token, 5655, client)

client.on('ready', () => {
    console.log(`Bot is logged in as ${client.user.tag}`)
    console.log(`Nanoid Session Token: ${_token}`)
})

client.login(process.env.BOT_TOKEN)