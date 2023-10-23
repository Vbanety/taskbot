const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { CLIENT_ID, GUILD_ID, DISCORD_BOT_TOKEN } = process.env;
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, '.', 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
        commands.push(command.data);
    } else {
        console.log(`[WARNING] The command in file ${file} is missing a required "data" or "execute" property.`);
    }
}

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
