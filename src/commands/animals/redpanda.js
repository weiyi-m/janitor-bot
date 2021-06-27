const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'redpanda',
    description: 'Displays a random, red panda.',
    async execute(message) {
        const { link } = await fetch('https://some-random-api.ml/img/red_panda').then(response => response.json());

        const redpandaEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('red panda')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${link}`);

        return message.channel.send(redpandaEmbed);
    }
}