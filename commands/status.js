const { SlashCommandBuilder, ActivityType } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
module.exports =
    new Command(
        'status',
        ['status'],
        new Command.Info({
            type: 'Administration',
            description: 'Control the rich presence of the bot',
            usage: 'status <add|list|remove> <type> <name>',
            examples: ['status add 1 the community server', 'status list', 'status remove 1'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: false },
        new SlashCommandBuilder()
            .setName('status')
            .setDescription('Control the rich presence of the bot')
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('add')
                    .setDescription('Add a status')
                    .addStringOption((option) =>
                        option
                            .setName('type')
                            .setDescription('The type of status')
                            .setRequired(true)
                            .setAutocomplete(true)
                    )
                    .addStringOption((option) =>
                        option
                            .setName('text')
                            .setDescription('The text of the status')
                            .setRequired(true)
                    )
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('list')
                    .setDescription('List all statuses')
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('remove')
                    .setDescription('Remove a status')
                    .addIntegerOption((option) =>
                        option
                            .setName('id')
                            .setDescription('The ID of the status')
                            .setRequired(true)
                    )
            )
    )
        .setCommand(async (client, interaction) => {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === 'add') {
                const type = interaction.options.getString('type');
                const text = interaction.options.getString('text');
                const index = client.Statuses.lastKey() + 1;
                const formattedType = ({
                    [ActivityType.Playing]: 'Playing',
                    [ActivityType.Listening]: 'Listening',
                    [ActivityType.Watching]: 'Watching',
                    [ActivityType.Competing]: 'Competing',
                    [ActivityType.Streaming]: 'Streaming',
                }[type]);
                client.Statuses.set(index, { type, name: text });
                const embed = client.embed()
                    .setTitle('Status Added')
                    .addFields(
                        { name: 'Type', value: formattedType, inline: true },
                        { name: 'Text', value: text, inline: true },
                        { name: 'ID', value: `${index}`, inline: true },
                    )
                    .setFooter({ text: 'Statuses can be removed with /status remove <id>' })
                    .setColor(0x22ff33);
                interaction.reply({ embeds: [embed] });
            }
            if (subcommand === 'list') {
                const embed = client.embed()
                    .setTitle('Statuses')
                    .addFields(
                        client.Statuses.map((status, id) => ({ name: `ID: ${id}`, value: `Type: ${status.type}\nText: ${status.name}` })),
                    )
                    .setFooter({ text: 'Statuses can be removed with /status remove <id>' })
                    .setColor(0x2F3136);
                interaction.reply({ embeds: [embed] });
            }
            if (subcommand === 'remove') {
                const id = interaction.options.getInteger('id');
                if (!client.Statuses.has(id)) return interaction.reply('That status does not exist');
                const deleted = client.Statuses.delete(id);
                const embed = client.embed()    
                    .setTitle(deleted ? 'Status Removed' : 'Status Removal Failed')
                    .setDescription(deleted ? `Deleted status ${id}` : `Failed to delete status ${id}`)
                    .setColor(deleted ? 0x22ff33 : 0xff2233);
                interaction.reply({ embeds: [embed] });
            }
        })
        .setAutocomplete(async (client, interaction) => {
            interaction.respond([
                { name: 'Playing', value: ActivityType.Playing },
                { name: 'Listening', value: ActivityType.Listening },
                { name: 'Watching', value: ActivityType.Watching },
                { name: 'Competing', value: ActivityType.Competing },
                { name: 'Streaming', value: ActivityType.Streaming },
            ].map(({ name, value }) => ({ name, value: value.toString() })));
        });
