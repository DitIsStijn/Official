const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Verbanen gebruiker", `${bUser} with ID ${bUser.id}`)
    .addField("Verbanen door", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Verbanen in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reden", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "🔧moderatie");
    if(!incidentchannel) return message.channel.send("Kan geen 🔧moderatie channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
