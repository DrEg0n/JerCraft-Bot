const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANNAGE_SERVER")) return message.reply("Je hebt geen Permissie om dat te doen");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!args[0]) return message.reply("Gebruik: !warn <Gebruiker> <Reden>");

    if (!user) return message.channel.send("De gebruiker is niet op de server!");

    //if (user.hasPermission("MANNAGE_SERVER")) return message.reply("Je kunt deze persoon niet waarschuwen!");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.reply("Geef een reden op!");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) =>{
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("warn")
        .setColor("#5900ff")
        .addField("warned gebruiker", user)
        .addField("Gewarned door", message.author)
        .addField("Reden", reason)
        .addField("Aantal Warns", warns[user.id].warns)

    var warnChannel = message.guild.channels.find(`name`, "straffen");
    if (!warnChannel) return message.guild.send("Kan het kanaal niet vinden");

    warnChannel.send(warnEmbed);

    if(warns[user.id].warns == 4){

    var warnWarn = new discord.RichEmbed()
        .setDescription("Pas Op " + User + "!")
        .setColor("#5900ff")
        .addField("Bericht", "Nog 1 warn en je krijgt een Ban!");

        warnChannel.send(warnWarn);

    } else if(warns[user.id].warns == 5){

        message.guild.member(User).ban(reason);
        message.channel.send(`${user} is Gebanned! omdat hij zich niet aan de regels hield.`);

    }


}

module.exports.help = {
    name: "warn"
}