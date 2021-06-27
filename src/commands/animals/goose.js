const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'goose',
    description: 'Displays a random, feathery goose.',
    aliases: ['geese', 'honk'],
    async execute(message) {
        const { url } = await fetch('https://nekos.life/api/v2/img/goose').then(response => response.json());

        const gooseEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('honk')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${url}`)

        return message.channel.send(gooseEmbed);
    }
}