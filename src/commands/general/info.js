const Discord = require('discord.js')
const { version } = require('discord.js')
const { janitor } = require('../../janitor')

module.exports = {
    name: 'stats',
    description: 'view stats and information for the bot',
    cooldown: 5,
    aliases: ['info', 'stats', 'statistics'],
    execute(message) {
        const secs = Math.floor(janitor.uptime / 1000) % 60;
        const mins = Math.floor(janitor.uptime / (1000 * 60)) % 60;
        const hrs = Math.floor(janitor.uptime / (1000 * 60 * 60)) % 24;
        const days = Math.floor(janitor.uptime / (1000 * 60 * 60 * 24)) % 7;
        const uptime = `${days} days, ${hrs} hours, ${mins} minutes, and ${secs} seconds`

        const statsEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Statistics for The Janitor')
            .setDescription('The Janitor is a multi-purpose bot developed by foop#6142. It includes meme, fun, utility, and moderation commands.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
            .addField("Bot Stats", [
                `**Server Count:** ${janitor.guilds.cache.size}`,
                `**User Count:** ${janitor.guilds.cache.reduce((sum, guild) => sum + (guild.available ? guild.memberCount : 0), 0)}`,
                `**Channel Count:** ${janitor.channels.cache.size}`,
                `**Uptime:** ${uptime}`,
                `**Total Memory Usage:** ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB`,
                `**Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`
            ].join('\n'))
            .addField('Bot Versions', [
                `**Node.js Version:** ${process.version}`,
                `**Discord.js Version:** v${version}`,
                `**Janitor Version:** v0.4-alpha`
            ].join('\n'))
            .addField('Links', [
                "**Source Code:** [Github Repo](https://github.com/weiyi-m/janitor-bot)",
            ]);
        
        return message.channel.send(statsEmbed);
    }
}