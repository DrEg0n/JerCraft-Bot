const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANNAGE_SERVER")) return message.reply("Je hebt geen Permissie om dat te doen");

    if (!args[0]) return message.reply("Gebruik: !prefix <nieuwe prefix>");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err);
    });

    var stringEmbed = new discord.RichEmbed()
        .setColor("#5900")
        .setTitle("Prefix")
        .setDescription(`Prefix is aan gepast naar ${args[0]}`);

    message.channel.send(stringEmbed);

}

module.exports.help = {
    name: "prefix"
}