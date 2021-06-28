const { owner_id } = require('../../config.json');

const clean = text => {
    if (typeof (text) === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
};

module.exports = {
    name: 'eval',
    description: 'Why code in code editor when Discord do trick?',
    execute(message, args, details) {
        if (details.userID !== owner_id) {
            return;
        }

        if (!args.length) {
            return message.channel.send('Man, you gotta add in some code to run, you blithering fool.');
        }

        try {
            const code = args.join(' ');
            const evaled = eval(code);

            message.channel.send(clean(evaled), { code: 'xl' });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
};