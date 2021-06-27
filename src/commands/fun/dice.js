const Discord = require('discord.js');

module.exports = {
    name: 'dice',
    description: 'Functions like a coinflip, only 3 times more numberish.',
    execute(message) {
        const diceNumber = Math.floor(Math.random() * 6) + 1;

        const diceEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setTitle('Here\'s the dice you rolled!')
            .setDescription(`:game_die: ${diceNumber}`);

        return message.channel.send(diceEmbed);
    },
};