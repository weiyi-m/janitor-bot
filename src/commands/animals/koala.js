const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'koala',
    description: 'Displays a random, marsupial koala.',
    async execute(message) {
        const { link } = await fetch('https://some-random-api.ml/img/koala').then(response => response.json());

        const koalaEmbed = new Discord.MessageEmbed() 
            .setColor('RANDOM')
            .setTitle('australia')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${link}`);

        return message.channel.send(koalaEmbed);
    }
}