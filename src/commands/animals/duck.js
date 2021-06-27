const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'duck',
    description: 'Displays a random, splashy duck.',
    aliases: ['ducc', 'quack'],
    async execute(message) {
        const { url } = await fetch('https://random-d.uk/api/v1/random').then(response => response.json());

        const duckEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('quack')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${url}`);

        return message.channel.send(duckEmbed);
    }
}