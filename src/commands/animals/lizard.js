const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'lizard',
    description: 'Displays a random, scaly lizard',
    aliases: ['reptile'],
    async execute(message) {
        const { url } = await fetch('https://nekos.life/api/v2/img/lizard').then(response => response.json());

        const lizardEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setTitle('lizard')
            .setImage(`${url}`)

        return message.channel.send(lizardEmbed);
    }
}