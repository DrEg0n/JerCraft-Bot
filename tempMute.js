const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANNAGE_SERVER")) return message.reply("Je hebt geen Permissie om dat te doen");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!args[0]) return message.reply("Gebruik: !tempmute <Gebruiker> <Tijd> {Uur=H, Minuten=M, Seconde=S}");

    if (!user) return message.channel.send("De gebruiker is niet op de server!");

    // if (user.hasPermission("MANNAGE_SERVER")) return message.reply("Je kunt deze persoon niet muten!");

    var muteRole = message.guild.roles.find("name", "Muted");

    if (!muteRole) return message.reply("De rol Muted bestaad niet");

    var muteTime = args[1];

    if (!muteTime) return message.reply("Gebruik: !tempmute <Gebruiker> <Tijd> {Uur=H, Minuten=M, Seconde=S}");

}

module.exports.help = {
    name: "tempmute"
}