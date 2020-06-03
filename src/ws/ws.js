const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

class WebSocket {

    constructor(token, port, client) {
        this.token = token
        this.client = client

        this.app = express()
        this.app.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: __dirname + '/layouts'
        }))
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')
        this.app.use(express.static(path.join(__dirname + 'public')))
        this.app.use(bodyParser.urlencoded({ extended: false}))
        this.app.use(bodyParser.json())

        this.registerRoots()

        this.server = this.app.listen(port, () => {
            console.log(`WebSockets listening on ${this.server.address().port}`)
        })
    }

    checkToken(_token) {
        return (_token == this.token)
    }

    registerRoots() {
        this.app.get('/', (req, res) => {
            let _token = req.query.token

            if (!this.checkToken(_token)) {
                res.render('error', { error: 'INVALID TOKEN'})
                return
            }

            let chans = []
            this.client.guilds.cache.first().channels.cache
                .filter(c => c.type === 'text')
                .forEach(c => {
                    chans.push({ id: c.id, name: c.name })
            })

            res.render('index', { 
                title: 'Chameleon WebUI',
                token: _token,
                chans
            })
        })

        this.app.post('/sendMessage', (req, res) => {
            let _token = req.body.token
            let text = req.body.text;
            let channelid = req.body.channelid;
            
            if (!this.checkToken(_token))
                return

            let chan = this.client.guilds.cache.first().channels.cache.get(channelid)

            if (chan) {
                chan.send(text)
            }
        })
    }
}

module.exports = WebSocket;