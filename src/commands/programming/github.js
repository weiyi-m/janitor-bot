const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    name: 'github',
    description: "View this bot's Github repository or perform a lookup on another repository or user.",
    aliases: ['git'],
    async execute(message, args) {
        if (args.length == 0) {
            const janitorBody = await fetch(`https://api.github.com/repos/weiyi-m/janitor-bot`)
                .then((response) => response.ok && response.json())
                .catch(() => null);

            const janitorSize = janitorBody.size <= 1024 ? `${janitorBody.size}KB` : Math.floor(janitorBody.size / 1024) > 1024 ? `${(janitorBody.size / 1024 / 1024).toFixed(2)}GB` : `${(janitorBody.size/1024).toFixed(2)}MB`;

            const janitorLicense = janitorBody.license && janitorBody.license.name && janitorBody.license.url ? `[${janitorBody.license.name}](${janitorBody.license.url})` : janitorBody.license && janitorBody.license.name || "None";

            const janitorFooter = []

            const janitorEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(janitorBody.full_name)
                .setAuthor('Github', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
                .setURL(janitorBody.html_url)
                .setDescription(`${janitorBody.description || "No description found."}\n\n**Language:** ${janitorBody.language}\n**Forks:** ${janitorBody.forks_count.toLocaleString()}\n**License:** ${janitorLicense}\n**Open Issues:** ${janitorBody.open_issues.toLocaleString()}\n**Watchers:** ${janitorBody.subscribers_count.toLocaleString()}\n**Stars:** ${janitorBody.stargazers_count.toLocaleString()}\n**Clone Size:** ${janitorSize}${janitorFooter.length ? `\n${janitorFooter.join('\n')}` : ""}`)
                .setFooter("There's more to this command! Run `github repository` or `github user` to learn more.")

            return message.channel.send(janitorEmbed);

        } else if (args.length != 0) {
            const action = args[0].split(' ')

            if (action == "repository" || action == "repo") {

                if (args[1] === undefined) {
                    return message.reply('your queried repository has to be in the form `username/repository`.');
                }

                const [username, repository] = args[1].split('/')

                if (!username || !repository) {
                    return message.reply('your queried repository has to be in the form `username/repository`.');
                }

                const body = await fetch(`https://api.github.com/repos/${username}/${repository}`)
                    .then((response) => response.ok && response.json())
                    .catch(() => null);

                if (!body) {
                    return message.reply("I could not fetch that repository. Are you sure it exists?");
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
            } else if (action == "user") {
                const [name] = args[1].split(" ")

                if (!name) {
                    return message.reply("I could not fetch that username. Are you sure it's valid?")
                }

                const body = await fetch(`https://api.github.com/users/${name}`)
                    .then((response) => response.ok && response.json())
                    .catch(() => null);

                if (!body) {
                    return message.reply('I could not fetch that username. Are you sure it\'s valid?')
                }

                const userEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(body.login)
                    .setAuthor('Github', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', "https://github.com")
                    .setURL(body.html_url)
                    .setThumbnail(`${body.avatar_url}`)
                    .setDescription(`${body.bio || "No bio found."}\n\n**Company:** ${body.company || "No company found."}\n**Blog:** ${body.blog || "No blog found."}\n**Location:** ${body.location || "No location found."}\n**Email:** ${body.email || "No email found."}\n**Twitter:** ${body.twitter_username || "No Twitter found."}\n\n**Public Repos:** ${body.public_repos}\n**Public Gists:** ${body.public_gists}\n**Followers:** ${body.followers}\n**Following:** ${body.following}`)
                
                return message.channel.send(userEmbed)
                    
            } else {
                return message.reply('I don\'t recognise that command. Try running `github repo <user>/<repo>` or `github user <username>`.')
            }
        } else {
            return message.reply("Something strange occurred, and I can't perform this action at the time being.")
        }
    }
}