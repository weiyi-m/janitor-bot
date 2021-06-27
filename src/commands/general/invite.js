const Discord = require('discord.js')

module.exports = {
    name: 'invite',
    description: 'invite the bot do it do it do it',
    cooldown: 3,
    execute(message) {
        const invEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Invite the bot!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setURL('https://discord.com/api/oauth2/authorize?client_id=756866275527098438&permissions=268512310&scope=bot');
        
        return message.channel.send(invEmbed);
    }
}