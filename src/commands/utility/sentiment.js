const Discord = require('discord.js')
const Sentiment = require('sentiment')

module.exports = {
    name: 'sentiment',
    description: 'Performs sentiment analysis on arbitrary text.',
    args: true,
    usage: "<your text here>",
    execute(message, args) {
        var sentiment = new Sentiment();

        const inputText = Object.values(args).join(" ").toString().toLowerCase()

        var result = sentiment.analyze(inputText)

        let emotion;

        if (result.score > 10) {
            emotion = "I think that was very positive."
        } else if (result.score > 0 && result.score <= 10) {
            emotion = "I think that was positive."
        } else if (result.score < 0 && result.score >= -10) {
            emotion = "I think that was negative."
        } else if (result.score < -10) {
            emotion = "I think that was very negative."
        } else {
            emotion ="I think that was neutral."
        }

        const sentimentEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Here's what I think:")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .setDescription(`${emotion}\n\n**Sentiment Score:** ${result.score || "No score found."}\n**Comparative Score:** ${result.comparative || "No comparative score found."}\n**Positive Words:** ${result.positive || "No positive words found."}\n**Negative Words:** ${result.negative || "No negative words found."}`)
            .setFooter("This command was built using the 'sentiment' Node module, which uses the AFINN-165 wordlist and Emoji Sentiment Ranking to perform sentiment analysis.")

        return message.channel.send(sentimentEmbed);
    }
}