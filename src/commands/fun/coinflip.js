const Discord = require('discord.js');

module.exports = {
    name: 'coinflip',
    description: 'Flips a virtual coin for you because you\'re too broke to own a real coin',
    aliases: ['flip'],
    execute(message) {
        const rand = ['Heads!', 'Tails!'];

        const coinflipFin = rand[Math.floor(Math.random() * 2)];

        const flipEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(coinflipFin)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setTitle('Here\'s the coinflip result!');

        return message.channel.send(flipEmbed);
    }
}