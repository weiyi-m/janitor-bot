const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'cat',
    description: 'Displays a random, cute cat.',
    aliases: ['neko', 'meow'],
    async execute(message) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

        const catEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('meow')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${file}`);

        return message.channel.send(catEmbed);
    }
}