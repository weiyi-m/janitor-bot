var Discord = require('discord.js')

module.exports = {
    name: 'earth',
    description: "Save the earth!",
    aliases: ['nature', 'world'],
    execute(message, args) {
        if (args.length == 0) {
            const generalEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("The world is dying.")
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
                .setDescription("The future seems bleak, our lands and waters are ridden with pollution, and animals are becoming more and more endangered.\n\n")

            return message.channel.send(generalEmbed);  
        }
    }
}