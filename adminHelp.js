const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANNAGE_SERVER")) return message.reply("Je hebt geen Permissie om dat te doen");

    try{

        var text = "**{} Help Menu** \n\n **__Commands__** \n !help - krijg dit menu \n !prefix - verander de prefix \n !clear - verwijder berichten \n !ping - krijg pong met de ms terug \n !hallo - stuurt hallo terug \n !kick - kick een speler \n !ban - ban een speler";

        message.author.send(text);

        message.channel.send("Het help menu word nu naar je toe gestuurd");

    }catch (error){
        message.channel.send("Er is iets fout gegaan");
    }

}

module.exports.help = {
    name: "Adminhelp"
}