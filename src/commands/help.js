const { ApplicationCommandType,EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data:{
    name: 'help',
    description: 'Help command',
    type: ApplicationCommandType.ChatInput,
    },
    async execute(interaction) {
        // read .md file and send it as a message
        const string = fs.readFileSync('./commands.md', 'utf8');

        const embed = new EmbedBuilder()
        .setDescription(`${string}`)
        .setColor('#0099ff');
        interaction.reply({embeds:[embed]});
    },
};
