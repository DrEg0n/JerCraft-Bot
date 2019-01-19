const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var icon = message.guild.iconURL;

    var serverEmbed = new discord.RichEmbed()
        .setDescription("discord server info")
        .setColor("#5900ff")
        .setThumbnail(icon)
        .addField("Server Naam", message.guild.name)
        .addField("Gemaakt op", message.guild.createdAt)
        .addField("Je bent gejoind op", message.member.joinedAt)
        .addField("Totaal Members", message.guild.memberCount);

    return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "serverinfo"
}