const { ApplicationCommandType } = require('discord.js');

module.exports = {
    data:{
    name: 'ping',
    description: 'Ping pong command',
    type: ApplicationCommandType.ChatInput,
    },
    async execute(interaction) {
        const ping = await interaction.reply({ content: 'Pinging...', fetchReply: true });

        const latency = ping.createdTimestamp - interaction.createdTimestamp;
        interaction.editReply(`Pong! Latency: ${latency} ms`);
    },
};
