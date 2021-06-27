const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'bird',
    description: 'Displays a random, plumed bird.',
    aliases: ['birb'],
    async execute(message) {
        const { link } = await fetch('https://some-random-api.ml/img/birb').then(response => response.json());

        const birdEmbed = new Discord.MessageEmbed() 
            .setColor('RANDOM')
            .setTitle('birb')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${link}`);

        return message.channel.send(birdEmbed);
    }
}