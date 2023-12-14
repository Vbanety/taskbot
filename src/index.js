const { Client,Collection, GatewayIntentBits, Events,ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');
const { boards } = require("./models/BoardModel");

dotenv.config();
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const MONGO_URI = process.env.MONGO_URI;
const GUILD_ID = process.env.GUILD_ID;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();


client.once(Events.ClientReady, () => {
    console.log(`${client.user.username}: Im Ready, And That's My ID: ${client.user.id}`); 
    
    if(!GUILD_ID) {
        console.log(`[WARNING] No guild id provided in your .env file, global commands will be registered.`);
    }
    if(!CLIENT_ID) {
        console.error(`[ERROR] No client id provided, please add it to your .env file as CLIENT_ID=[your client id].`);
        process.exit(1);
    }
    if(!MONGO_URI) {
        console.log(`[ERROR] No mongo uri provided, please add it to your .env file as MONGO_URI=[your mongo uri].`);
        process.exit(1);
    }

    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log(`${client.user?.username}: Im Connected to MongoDB!`);
    });    

    client.user.setActivity('your tasks', { type: ActivityType.Watching });
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isCommand()) {

    const { commandName, options } = interaction;

    const commandFiles = await fs.readdir(path.join(__dirname, 'commands'));

    for (const file of commandFiles) {
        if (file.endsWith('.js')) {
            const command = require(`./commands/${file}`);
            if (command.data.name === commandName) {
                command.execute(interaction, options);
                break;
            }
        }
    }
}

if(interaction.isAutocomplete()) {
    const { commandName } = interaction;
    const focusedOption = interaction.options.getFocused(true);
    let choices;
    if (focusedOption.name === 'board-name') {
        const board = await boards.find({ user: interaction.user.id });
        choices = board.map((board) => {return {name: board.name, value: board.name}});
    
    }
     if (focusedOption.name === 'task') {
        const boardName = interaction.options._hoistedOptions[0].value;
        const board = await boards.findOne({ user: interaction.user.id, name: boardName });
        const tasks = board?.tasks;
        const options = tasks.map((task) => {
            return {
                name: task.name,
                value: task.name,
            };
        });
        choices = options;
    }

    const filtered = choices.filter((option) => option.name.includes(focusedOption.value));
    await interaction.respond(
        filtered.map((option) => ({name: option.name, value: option.value}))
    );
    }
});

client.login(TOKEN);
