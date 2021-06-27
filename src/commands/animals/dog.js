const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'dog',
    description: 'Displays a random, adorable dog.',
    aliases: ['woof', 'bark', 'doggo'],
    async execute(message) {
        const { url } = await fetch("https://random.dog/woof.json").then(response => response.json());

        const dogEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('woof')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setImage(`${url}`);

        return message.channel.send(dogEmbed);
    }
}