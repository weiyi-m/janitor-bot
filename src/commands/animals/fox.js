const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'fox',
    description: 'Displays a random, floofy fox.',
    aliases: ['foxy'],
    async execute(message) {
        const { image } = await fetch('https://randomfox.ca/floof').then(response => response.json());

        const foxEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('floof')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${image}`);

        return message.channel.send(foxEmbed);
    }
}