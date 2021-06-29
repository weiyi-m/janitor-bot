const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name: 'github',
    description: 'View a Github repository.',
    args: true,
    usage: '<user>/<repo>',
    aliases: ['git', 'repo'],
    async execute(message, args) {
        if (args.length == 0) {
            return message.reply('please use a proper repository name.');
        }

        const [username, repository] = args[0].split("/");

        if (!username || !repository) {
            return message.reply('your queried repository has to be in the form `username/repository`.');
        }

        const body = await fetch(`https://api.github.com/repos/${username}/${repository}`)
            .then((response) => response.ok && response.json())
            .catch(() => null);

        if (!body) {
            return message.reply('I could not fetch that repository. Are you sure it exists?');
        }

        const size = body.size <= 1024 ? `${body.size}KB` : Math.floor(body.size / 1024) > 1024 ? `${(body.size / 1024 / 1024).toFixed(2)}GB` : `${(body.size/1024).toFixed(2)}MB`;
        const license = body.license && body.license.name && body.license.url ? `[${body.license.name}](${body.license.url})` : body.license && body.license.name || "None";
        const footer = []

        if (body.fork) {
            footer.push(`**Forked** from [${body.parent.full_name}](${body.parent.html_url}).`)
        }

        if (body.archived) {
            footer.push("This repository is **archived**.")
        }

        const githubEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(body.full_name)
            .setAuthor('Github', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
            .setURL(body.html_url)
            .setDescription(`${body.description || "No description found."}\n\n**Language:** ${body.language}\n**Forks:** ${body.forks_count.toLocaleString()}\n**License:** ${license}\n**Open Issues:** ${body.open_issues.toLocaleString()}\n**Watchers:** ${body.subscribers_count.toLocaleString()}\n**Stars:** ${body.stargazers_count.toLocaleString()}\n**Clone Size:** ${size}${footer.length ? `\n${footer.join('\n')}` : ""}`);
        
        return message.channel.send(githubEmbed);
    }
}