const Discord = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'a simulation of an 8ball to let your questions be answered by randomness',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send("No output can occur without an input. Ask a question, dummy.");
        }

        const answers = ['Yes.', 'No.', 'Not sure.', 'You know it!', 'What? Absolutely not.', 'That\'s definitely a yes.', 'Hmm, can\'t tell', 'Sure, go for it.', 'Mmm, I have no idea.', 'No, not at all!', 'Yep.', 'Nope.', 'Maybe.', 'Maybe I shouldn\'t tell you.', 'Sorry? That\'s too hard to answer.', 'Most likely.'];

        const random = Math.floor(Math.random() * answers.length);

        const ballEmbed = new Discord.MessageEmbed()
            .setTitle('Magic 8-Ball')
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setDescription(answers[random])
            .setFooter('The answers are random.');

        return message.channel.send(ballEmbed);
    }
}