const fs = require('fs');
const { dev_ids } = require('../../config.json');

module.exports = {
    name: 'reload',
    description: 'Special ultra cool developer command.',
    args: true,
    usage: '<command>',
    execute(message, args) {
        if (!dev_ids.includes(message.author.id)) {
            return;
        }

        if (!args.length) {
            return message.channel.send(`You didn't pass any commands to reload, ${message.author}}!`);
        }

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
        }

        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }

        return message.channel.send(`Command \`${command.name}\` was reloaded!`);
    }
}