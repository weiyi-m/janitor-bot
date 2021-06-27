const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'panda',
    description: 'Displays a random, fuzzy panda.',
    async execute(message) {
        const { link } = await fetch('https://some-random-api.ml/img/panda').then(response => response.json());

        const pandaEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('panda')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${link}`);

        return message.channel.send(pandaEmbed);
    }
}