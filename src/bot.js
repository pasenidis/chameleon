const { Client } = require('discord.js')
const { nanoid } = require('nanoid');
const { cmdReply, cmdSay, cmdTest } = require('./lib/main')
const { playMusic } = require('./lib/music')
const WS = require('./ws/ws')
const dotenv = require('dotenv')

const ytdl = require('ytdl-core')

/* Startup Initialization */
let client = new Client()
let _token = nanoid()
dotenv.config()

/* Environmental Variables */
const prefix = process.env.PREFIX

/* Command Map */
const commands = {
    say: cmdSay,
    test: cmdTest,
    reply: cmdReply,
    music: playMusic
}

let ws = new WS(_token, 5655, client)

client.on('ready', () => {
    console.log(`Bot is logged in as ${client.user.tag}`)
    console.log(`Dashboard Session Token: ${_token}`)
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