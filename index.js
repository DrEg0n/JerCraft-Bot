const discord = require("discord.js");
const botConfig = require("./botConfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsfiles = files.filter(f => f.split(".").pop() === "js");

    if(jsfiles.length <0){
        console.log("Kon geen files vinden!");
        return;
    }

    jsfiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is in geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is Online!`);

    bot.user.setActivity("Test de Server", { type: "PLAYING" });

});

// bot.on("guildMemberAdd", member => {

//     var role = member.guild.roles.find("name", "Member");

//     if (!role) return message.channel.send("Deze rol bestaat niet");

//     member.addRole(role);

//     const channel = member.guild.channels.find("name", "administratie");

//     if (!channel) return message.channel.send("Dit kanaal bestaat niet");

//     channel.send(`Welkom op de Officiele Akara Craft Server ${member}`);

// })


bot.on("message", async message => {

    //Als bot een bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes : botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot, message, arguments);


});


bot.login(botConfig.token);