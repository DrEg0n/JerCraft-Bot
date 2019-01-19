const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send(`Hallo ${message.author}. Hoe gaat het met u.`);

}

module.exports.help = {
    name: "hallo"
}