const { cmdReply, cmdSay, cmdTest } = require('./main')
const { playMusic } = require('./music')

module.exports = {
    commands: {
        say: cmdSay,
        test: cmdTest,
        reply: cmdReply,
        music: playMusic
    },
    errors: {
        403: 'Invalid token. If you are unauthorized please quit attempting to get access right now.',
        500: 'Internal Server Error. Something went wrong, please try again later.'
    }
}