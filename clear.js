const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.reply("Je hebt geen toestemming");

    if (!args[0]) return message.channel.send("Gebruik: !clear <aantal>");

    if (Number.isInteger(parseInt(args[0]))){

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] == 0) {
                
                message.channel.send(`Je kunt geen 0 breichten verwijderen!`).then(msg => msg.delete(3000));

            } else if (args[0] == 1) {

                message.channel.send(`Er is 1 Bericht verwijderd.`).then(msg => msg.delete(3000));

            } else {

                message.channel.send(`Er zijn ${args[0]} Berichten verwijderd.`).then(msg => msg.delete(3000));

            }
        });

    } else {
        return message.channel.send("Geef een getal op.");
    }

}

module.exports.help = {
    name: "clear"
}