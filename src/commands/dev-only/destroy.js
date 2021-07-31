const { dev_ids } = require('../../config.json')
const chalk = require('chalk')

module.exports = {
    name: 'destroy',
    description: 'Shuts down the bot',
    execute(message, args) {
        if (!dev_ids.includes(message.author.id)) {
            return
        }

        message.channel.send('Destroying client... goodbye!')
        console.log(chalk.redBright("BOT OFFLINE"))

        process.exit()
    }
}