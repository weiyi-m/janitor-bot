const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'npm',
    description: 'Searches the NPM registry for a package.',
    args: true,
    usage: "<package>",
    aliases: ['npmsearch', 'npmpkg', 'npmpackage', 'node', 'package'],
    async execute(message, args) {
        if (!args) {
            return message.reply('please enter a valid NPM package name.')
        }

        let status = 0;

        const body = await fetch(`https://registry.npmjs.com/${args[0]}`)
            .then((res => {
                status = res.status;
                return res.json();
            }))

        if (status == 404) {
            return message.reply('please enter a valid NPM package name.')
        }

        const version = body.versions[body['dist-tags'].latest];

        let deps = version.dependencies ? Object.keys(version.dependencies) : null;
        let maintainers = body.maintainers.map((user) => user.name);

        if (maintainers.length > 10) {
            const len = maintainers.length - 10;
            maintainers = maintainers.slice(0, 10);
            maintainers.push(`...${len} more.`);
        }

        if (deps && deps.length > 10) {
            const len = deps.length - 10;
            deps = deps.slice(0, 10);
            deps.push(`...${len} more.`);
        }

        const npmEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`NPM - ${args[0]}`)
            .setURL(`https://npmjs.com/package/${args[0]}`)
            .setAuthor('NPM', 'https://static.npmjs.com/c426a1116301d1fd178c51522484127a.png')
            .setDescription([
                body.description || "No description available.",
                `**Version:** ${body["dist-tags"].latest}`,
                `**Author:** ${body.author ? body.author.name : "Unknown"}`,
                `**License:** ${body.license}`,
                `**Dependencies:** ${deps && deps.length ? deps.join(", ") : "None"}`
            ].join("\n"));

        return message.channel.send(npmEmbed);
    }
}