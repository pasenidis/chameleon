const cmdSay = (msg, args) => {
    msg.channel.send(args.join(' '))
}

const cmdTest = (msg, args) => {
    msg.channel.send('I am alive!')
}

const cmdReply = (msg, args) => {
    msg.channel.send(`OK! Replying to ${msg.author}`)
    msg.author.send('I told you I would reply to you!')
}

module.exports = { cmdSay, cmdTest, cmdReply }