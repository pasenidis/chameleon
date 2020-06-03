const ytdl = require("ytdl-core");
const { isWebUri } = require("valid-url");

let queue = [];
let playing = false;

const playMusic = async (msg, args) => {
    if (msg.member.voice.channel) {
        switch (args[0]) {
            case "play":
                if (!args[1] || !isWebUri(args[1])) return msg.react("❌");

                if (!playing) {
                    
                    playing = true;
                    const dispatcher = (await msg.member.voice.channel.join()).play(args[1]);

                    dispatcher.on("start", () => msg.react("✅"));
                    dispatcher.on("finish", () => msg.channel.send(`Song "${args[1]}" ended. :musical_note:`))
                    dispatcher.on("error", console.error);
                } else if (playing) {
                    queue.push(args[1])
                }

                break;
            case "ytdl":
                if (!args[1] || !isWebUri(args[1])) return msg.react("❌");

                const ytDispatcher = (await msg.member.voice.channel.join()).play(ytdl(args[1], { filter: "audioonly" }));

                ytDispatcher.on("start", () => msg.react("✅"));
                ytDispatcher.on("finish", () => msg.channel.send(`Song "${args[1]}" ended. :musical_note:`));
                ytDispatcher.on("error", console.error);

                break;
            case "stop":
                msg.guild.voice.kick();
                msg.channel.send("Stop! :octagonal_sign:");
                break;
            case "queue":
                msg.channel.send(`Current queue: \n${queue}`);
        }
    }
}

module.exports = { playMusic }