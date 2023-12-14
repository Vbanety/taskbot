const { ButtonStyle } = require("discord.js");
const { boards } = require('../models/BoardModel');

const { EmbedBuilder,ApplicationCommandOptionType, ApplicationCommandType,ComponentType,ButtonBuilder,ActionRowBuilder } = require('discord.js');
module.exports = {
    data:{
        name: 'board',
        description: 'Manage your task boards',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'create',
                description: 'Create a new board',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'board-name',
                        description: 'The name of the board',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: 'delete',
                description: 'Delete a board',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'board-name',
                        autocomplete: true,
                        description: 'The name of the board',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: 'add-task',
                description: 'Add a task to a board',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'board-name',
                        autocomplete: true,
                        description: 'The name of the board',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'task',
                        description: 'The name of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'description',
                        description: 'The description of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'priority',
                        description: 'The priority of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        choices: [
                            { name: 'Low', value: 'low' },
                            { name: 'Medium', value: 'medium' },
                            { name: 'High', value: 'high' },
                        ],
                    }
                ],
            },
            {
                name: 'remove-task',
                description: 'Remove a task from a board',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'board-name',
                        autocomplete: true,
                        description: 'The name of the board',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'task',
                        autocomplete: true,
                        description: 'The name of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: 'list-tasks',
                description: 'List all tasks from a board',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'board-name',
                        autocomplete: true,
                        description: 'The name of the board',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: 'move-task',
                description: 'Move a task to a different board',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'from',
                        description: 'The name of the board to move the task from',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'to',
                        description: 'The name of the board to move the task to',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'task',
                        description: 'The name of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: 'change-task-status',
                description: 'Change the status of a task',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'board-name',
                        autocomplete: true,
                        description: 'The name of the board',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'task',
                        autocomplete: true,
                        description: 'The name of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'status',
                        description: 'The new status of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        choices: [
                            { name: 'To Do', value: 'todo' },
                            { name: 'In Progress', value: 'in-progress' },
                            { name: 'Done', value: 'done' },
                        ],
                    },
                ],
            },
            {
                name: 'change-task-priority',
                description: 'Change the priority of a task',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'board-name',
                        autocomplete: true,
                        description: 'The name of the board',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                    {
                        name: 'task',
                        autocomplete: true,
                        description: 'The name of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
            },
                    {
                        name: 'priority',
                        description: 'The new priority of the task',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        choices: [
                            { name: 'Low', value: 'low' },
                            { name: 'Medium', value: 'medium' },
                            { name: 'High', value: 'high' },
                        ],
                    },
                ],
                
            },{
                name:'add-member',
                description:'Add a member to a board',
                type:ApplicationCommandOptionType.Subcommand,
                options:[
                    {
                        name:'board-name',
                        autocomplete:true,
                        description:'The name of the board',
                        type:ApplicationCommandOptionType.String,
                        required:true,
                    },
                    {
                        name:'member',
                        description:'The member to add',
                        type:ApplicationCommandOptionType.User,
                        required:true,
                    }
                ]
            },{
                name:'remove-member',
                description:'Remove a member from a board',
                type:ApplicationCommandOptionType.Subcommand,
                options:[
                    {
                        name:'board-name',
                        autocomplete:true,
                        description:'The name of the board',
                        type:ApplicationCommandOptionType.String,
                        required:true,
                    },
                    {
                        name:'member',
                        description:'The member to remove',
                        type:ApplicationCommandOptionType.User,
                        required:true,
                    }
                ]
            },{
                name:'list-members',
                description:'List all members from a board',
                type:ApplicationCommandOptionType.Subcommand,
                options:[
                    {
                        name:'board-name',
                        autocomplete:true,
                        description:'The name of the board',
                        type:ApplicationCommandOptionType.String,
                        required:true,
                    }
                ]
            },{
                name:'list-boards',
                description:'List all boards',
                type:ApplicationCommandOptionType.Subcommand,
            },
        ],
    },
        async execute(interaction) {
            const functions = require('../utils/functions')(interaction);
            const { createBoard,changeTaskPriority, deleteBoard, getBoard, addTaskToBoard, removeTaskFromBoard, listTasks, moveTaskBetweenBoards, changeTaskStatus, addMemberToBoard, removeMemberFromBoard, listMembers } = functions;
            const { commandName, options } = interaction;
            const subcommand = options.getSubcommand();
            const boardName = options.getString('board-name');
            const privateBoard = options.getBoolean('private') ?? false;
        
            try {
                const from = options.getString('from');
                const to = options.getString('to');
                const board = await getBoard(boardName, interaction.user.id) || await getBoard(from,interaction.user.id) || await getBoard(to,interaction.user.id) || null;
                const isAdmin = board?.user === interaction.user.id;

                const isMember = board?.members.some(member => member.id === interaction.user.id);    

                if (subcommand === 'create') {
                    await createBoard(boardName, interaction.user.id)
                        .then(() => {
                            const embed = new EmbedBuilder()
                                .setTitle('Board created!')
                                .setDescription(`Board **${boardName}** has been created!`)
                                .setColor('#00ff00');
                            interaction.reply({ embeds: [embed] });
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'delete') {
                    if (!isAdmin) {
                        const errorEmbed = new EmbedBuilder()
                            .setTitle('Error')
                            .setDescription(`You are not the owner of board **${boardName}**!`)
                            .setColor('#ff0000');
                        return interaction.reply({ embeds: [errorEmbed] });
                    }
                
                    const confirmationEmbed = new EmbedBuilder()
                        .setTitle('Are you sure?')
                        .setDescription(`Are you sure you want to delete board **${boardName}**?`)
                        .setColor('#ff0000');
                    
                    const yesButton = new ButtonBuilder()
                        .setCustomId('yes')
                        .setLabel('Yes')
                        .setStyle(ButtonStyle.Success);
                    
                    const noButton = new ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setStyle(ButtonStyle.Danger);
                    
                    const row = new ActionRowBuilder()
                        .addComponents(yesButton, noButton);
                    
                    const message = await interaction.reply({ embeds: [confirmationEmbed], components: [row] });
                
                    const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
                    collector.on('collect', async i => {
                        if (i.customId === 'yes') {
                            await deleteBoard(boardName, interaction.user.id)
                                .then(() => {
                                    const embed = new EmbedBuilder()
                                        .setTitle('Board deleted!')
                                        .setDescription(`Board **${boardName}** has been deleted!`)
                                        .setColor('#00ff00');
                                    interaction.editReply({ embeds: [embed], components: [] });
                                })
                                .catch(error => {
                                    const errorEmbed = new EmbedBuilder()
                                        .setTitle('Error')
                                        .setDescription(error.message)
                                        .setColor('#ff0000');
                                    interaction.editReply({ embeds: [errorEmbed], components: [] });
                                });
                        } else if (i.customId === 'no') {
                            const embed = new EmbedBuilder()
                                .setTitle('Board not deleted!')
                                .setDescription(`Board **${boardName}** has not been deleted!`)
                                .setColor('#00ff00');
                            interaction.editReply({ embeds: [embed], components: [] });
                        }
                    });
                }
                
                
                
                if (subcommand === 'add-task') {
                    const taskName = options.getString('task');
                    const description = options.getString('description');
                    const priority = options.getString('priority');
                
                    await addTaskToBoard(boardName, { name: taskName, description, status: 'todo', priority, last_updated: Date.now(), by: interaction.user.id },interaction.user.id)
                        .then(() => {
                            const embed = new EmbedBuilder()
                                .setTitle('Task added!')
                                .setDescription(`Task **${taskName}** has been added to board **${boardName}**!`)
                                .setColor('#00ff00');
                            interaction.reply({ embeds: [embed] });
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'remove-task') {
                    const taskName = options.getString('task');
                
                    await removeTaskFromBoard(boardName, taskName, interaction.user.id)
                        .then(() => {
                            if (!isAdmin) {
                                const errorEmbed = new EmbedBuilder()
                                    .setTitle('Error')
                                    .setDescription(`You are not the owner of board **${boardName}**! You cannot remove tasks.`)
                                    .setColor('#ff0000');
                                interaction.reply({ embeds: [errorEmbed] });
                            } else {
                                const embed = new EmbedBuilder()
                                    .setTitle('Task removed!')
                                    .setDescription(`Task **${taskName}** has been removed from board **${boardName}**!`)
                                    .setColor('#00ff00');
                                interaction.reply({ embeds: [embed] });
                            }
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'move-task') {
                    const from = options.getString('from');
                    const to = options.getString('to');
                    const task = options.getString('task');
                
                    await moveTaskBetweenBoards(from, to, task, interaction.user.id)
                        .then(() => {
                            if (!isAdmin) {
                                const errorEmbed = new EmbedBuilder()
                                    .setTitle('Error')
                                    .setDescription(`You are not the owner of board **${boardName}**!`)
                                    .setColor('#ff0000');
                                interaction.reply({ embeds: [errorEmbed] });
                            } else {
                                const embed = new EmbedBuilder()
                                    .setTitle('Task moved!')
                                    .setDescription(`Task **${task}** has been moved from board **${from}** to board **${to}**!`)
                                    .setColor('#00ff00');
                                interaction.reply({ embeds: [embed] });
                            }
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'change-task-status') {
                    const task = options.getString('task');
                    const status = options.getString('status');
                
                    await changeTaskStatus(boardName, task, status, interaction.user.id)
                        .then(() => {
                            const embed = new EmbedBuilder()
                                .setTitle('Task status changed!')
                                .setDescription(`Task **${task}** status has been changed to **${status}**!`)
                                .setColor('#00ff00');
                            interaction.reply({ embeds: [embed] });
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'change-task-priority') {
                    const task = options.getString('task');
                    const priority = options.getString('priority');
                
                    await changeTaskPriority(boardName, task, priority, interaction.user.id)
                        .then(() => {
                            const embed = new EmbedBuilder()
                                .setTitle('Task priority changed!')
                                .setDescription(`Task **${task}** priority has been changed to **${priority}**!`)
                                .setColor('#00ff00');
                            interaction.reply({ embeds: [embed] });
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'add-member') {
                    const member = options.getUser('member');
                
                    await addMemberToBoard(boardName, member, interaction.user.id)
                        .then(() => {
                            if (!isAdmin) {
                                const errorEmbed = new EmbedBuilder()
                                    .setTitle('Error')
                                    .setDescription(`You are not the owner of board **${boardName}**!`)
                                    .setColor('#ff0000');
                                interaction.reply({ embeds: [errorEmbed] });
                            } else {
                                const embed = new EmbedBuilder()
                                    .setTitle('Member added!')
                                    .setDescription(`Member **${member}** has been added to board **${boardName}**!`)
                                    .setColor('#00ff00');
                                interaction.reply({ embeds: [embed] });
                            }
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'remove-member') {
                    const member = options.getUser('member');
                
                    await removeMemberFromBoard(boardName, member, interaction.user.id)
                        .then(() => {
                            if (!isAdmin) {
                                const errorEmbed = new EmbedBuilder()
                                    .setTitle('Error')
                                    .setDescription(`You are not the owner of board **${boardName}**!`)
                                    .setColor('#ff0000');
                                interaction.reply({ embeds: [errorEmbed] });
                            } else {
                                const embed = new EmbedBuilder()
                                    .setTitle('Member removed!')
                                    .setDescription(`Member **${member}** has been removed from board **${boardName}**!`)
                                    .setColor('#00ff00');
                                interaction.reply({ embeds: [embed] });
                            }
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'list-members') {
                    await listMembers(boardName, interaction.user.id)
                        .then(members => {
                            const embed = new EmbedBuilder()
                                .setTitle(`Members from board **${boardName}**`)
                                .setDescription(members.length === 0 ? 'No members found!' : members.map((m, index) => `## Member ${index + 1}\n\n- Name: ${m.username}\n- ID: ${m.id}`).join('\n\n'))
                                .setColor('#00ff00');
                            interaction.reply({ embeds: [embed] });
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }
                
                if (subcommand === 'list-boards') {
                    const boardsList = await boards.find({ user: interaction.user.id });
                    const sharedBoards = await boards.find({ members: { $elemMatch: { id: interaction.user.id } } });
                
                    if (boardsList.length === 0 && sharedBoards.length === 0) {
                        const errorEmbed = new EmbedBuilder()
                            .setTitle('Error')
                            .setDescription('No boards found!')
                            .setColor('#ff0000');
                        interaction.reply({ embeds: [errorEmbed] });
                    } else {
                        const embed = new EmbedBuilder()
                            .setTitle(`Boards from ${interaction.user.username}`)
                            .setDescription(boardsList.map((b, index) => `## Board ${index + 1}\n\n- Name: ${b.name}\n- Tasks: ${b.tasks.length}\n- Members: ${b.members.length + 1}\n- Owner: <@${interaction.user.id}>`).join('\n\n') + '\n\n' + sharedBoards.map((b, index) => `### Shared Boards\n## Board ${index + 1}\n\n- Name: ${b.name}\n- Tasks: ${b.tasks.length}\n- Members: ${b.members.length + 1}\n- Owner: <@${b.user}>`).join('\n\n'))
                            .setColor('#00ff00');
                        interaction.reply({ embeds: [embed] });
                    }
                }    
                if(subcommand === 'list-tasks') {
                    await listTasks(boardName, interaction.user.id)
                        .then(tasks => {
                            const embed = new EmbedBuilder()
                                .setTitle(`Tasks from board **${boardName}**`)
                                .setDescription(tasks.length === 0 ? 'No tasks found!' : tasks.map((t, index) => `## Task ${index + 1}\n\n- Name: ${t.name}\n- Description: ${t.description}\n- Status: ${t.status}\n- Priority: ${t.priority}\n- Last updated: ${new Date(t.last_updated).toLocaleString()}\n- By: <@${t.by}>`).join('\n\n'))
                                .setColor('#00ff00');
                            interaction.reply({ embeds: [embed] });
                        })
                        .catch(error => {
                            const errorEmbed = new EmbedBuilder()
                                .setTitle('Error')
                                .setDescription(error.message)
                                .setColor('#ff0000');
                            interaction.reply({ embeds: [errorEmbed] });
                        });
                }            
    } catch (error) {
        console.error(error);
    }

    }
        }    