const { Client } = require('discord.js')
const { nanoid } = require('nanoid');
const dotenv     = require('dotenv')
const boxen      = require('boxen')

/* Lib Modules */
const WS = require('./ws/ws')

/* Startup Initialization */
let client = new Client()
let _token = nanoid()
dotenv.config()

/* Environmental Variables */
const prefix = process.env.PREFIX

/* Command Map */
const {commands} = require('./lib/constants')

let ws = new WS(_token, process.env.PORT, client)

client.on('ready', () => {
    const _text = boxen(`Bot is logged in as ${client.user.tag}\n\nDashboard Session Token: ${_token}\nDashboard Link: http://localhost:${process.env.PORT}`, { 
        padding: 1,
        borderStyle: "round",
        borderColor: "green"
    })
    console.log(_text)
    client.user.setActivity('with colors', { type: 'PLAYING' })
})

client.on('message', (msg) => {
    let content = msg.content,
        author  = msg.member || msg.author,
        chan    = msg.channel,
        guild   = msg.guild

    if (author.id != client.user.id && content.startsWith(prefix)) {

        let invoke = content.split(' ')[0].substr(prefix.length),
            args   = content.split(' ').slice(1)

        if (invoke in commands) {
            commands[invoke](msg, args)
        }
    }
})

client.login(process.env.BOT_TOKEN)