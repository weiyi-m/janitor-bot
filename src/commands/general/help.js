const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Uh oh, you have no idea what to do? Don\'t worry.',
    aliases: ['commands', 'cmds'],
    usage: '<command name>',
    execute(message) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('**Command List**')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setDescription('The Janitor is a multi-purpose bot developed by foop#6142. It includes meme, fun, utility, and moderation commands.')
            .addField("Prefix", [
                `**Prefix:** j!`
            ].join('\n'))
            .addField("General", [
                `**help:** Lists a list of commands.`,
                `**info:** Displays general information about The Janitor.`,
            ].join('\n'))
            .addField("Utility", [
                `**ping:** Calculates your latency.`
            ].join('\n'))
            .addField("Fun", [
                `**8ball:** Shakes a ball that answers a question.`,
                `**coinflip:** Flips a coin.`,
                `**dice:** Rolls a die.`,
            ].join('\n'))
            .addField("Animals", [
                `**bird:** Displays a random, plumed bird.`,
                `**cat:** Displays a random, cute cat.`,
                `**dog:** Displays a random, adorable dog.`,
                `**duck:** Displays a random, splashy duck.`,
                `**fox:** Displays a random, floofy fox.`,
                `**goose:** Displays a random, feathery goose.`,
                `**koala:** Displays a random, marsupial koala.`,
                `**lizard:** Displays a random, scaly lizard.`,
                `**panda:** Displays a random, fuzzy panda`,
                `**redpanda:** Displays a random, red panda`
            ].join('\n'))

        return message.channel.send(helpEmbed);
    }
}