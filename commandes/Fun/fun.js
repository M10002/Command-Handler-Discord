const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    message.channel.send("Je suis bien en ligne !")
    
}

module.exports.help = {
    name: "fun",
    aliases: ["f"]
}