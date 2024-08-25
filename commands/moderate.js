const { SlashCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { Command } } } = require('@therealbenpai/djs-client').Utils;
module.exports =
    new Command(
        'moderate',
        ['moderate', 'mod'],
        new Command.Info({
            type: 'Moderation',
            description: 'Moderation commands',
            usage: 'moderation <subcommand> [...args]',
            examples: ['moderation ban add @user#0001 spamming in chat'],
            disabled: false,
        }),
        new Command.Restrictions(),
        { slash: true, text: false },
        new SlashCommandBuilder()
            .setName('moderate')
            .setDescription('Moderation commands')
            .addSubcommandGroup(group =>
                group
                    .setName('ban')
                    .setDescription('Ban-related commands')
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName('add')
                            .setDescription('Ban a member')
                            .addUserOption(option =>
                                option
                                    .setName('member')
                                    .setDescription('The member to ban')
                                    .setRequired(true)
                            )
                            .addStringOption(option =>
                                option
                                    .setName('reason')
                                    .setDescription('The reason for the ban')
                                    .setRequired(true)
                            )
                    )
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName('remove')
                            .setDescription('Unban a member')
                            .addStringOption(option =>
                                option
                                    .setName('member')
                                    .setDescription('The member to unban')
                                    .setRequired(true)
                            )
                            .addStringOption(option =>
                                option
                                    .setName('reason')
                                    .setDescription('The reason for the unban')
                                    .setRequired(true)
                            )
                    )
            )
            .addSubcommandGroup(group =>
                group
                    .setName('kick')
                    .setDescription('Kick-related commands')
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName('add')
                            .setDescription('Kick a member')
                            .addUserOption(option =>
                                option
                                    .setName('member')
                                    .setDescription('The member to kick')
                                    .setRequired(true)
                            )
                            .addStringOption(option =>
                                option
                                    .setName('reason')
                                    .setDescription('The reason for the kick')
                                    .setRequired(true)
                            )
                    )
            )
            .addSubcommandGroup(group =>
                group
                    .setName('mute')
                    .setDescription('Mute-related commands')
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName('add')
                            .setDescription('Mute a member')
                            .addUserOption(option =>
                                option
                                    .setName('member')
                                    .setDescription('The member to mute')
                                    .setRequired(true)
                            )
                            .addStringOption(option =>
                                option
                                    .setName('duration')
                                    .setDescription('The duration of the mute')
                                    .setRequired(true)
                            )
                            .addStringOption(option =>
                                option
                                    .setName('reason')
                                    .setDescription('The reason for the mute')
                                    .setRequired(true)
                            )
                    )
            ),
    )
        .setCommand(async (client, interaction) => {
            const
                scg = interaction.options.getSubcommandGroup(),
                sc = interaction.options.getSubcommand();
            if (scg === 'ban') {
                if (sc === 'add') {
                    const user = interaction.options.getMember('member');
                    const reason = interaction.options.getString('reason');
                    const woops = new client.embed().setTitle('Whoops!').setColor(0xd1271b)
                    switch (user.id) {
                        case interaction.user.id:
                            return await interaction.reply({ embeds: [woops.setDescription("You can't ban yourself!")] });
                        case client.user.id:
                            return await interaction.reply({ embeds: [woops.setDescription("I can't ban myself!")] });
                        default:
                            try {
                                await interaction.guild.members.ban(user, { reason: reason });
                                await interaction.reply({ embeds: [client.embed().setTitle('Success!').setDescription(`${user} was successfully banned.\n\n**Reason**\n${reason}`)] })
                            } catch (error) {
                                await interaction.reply({ embeds: [woops.setDescription(`It seems we encountered an error:\n\`${error}\``)], ephemeral: true })
                            }

                    }
                    return;
                }
                if (sc === 'remove') {
                    const user = client.users.cache.get(interaction.options.getString('member'));
                    const reason = interaction.options.getString('reason');
                    const woops = new client.embed().setTitle('Whoops!').setColor(0xd1271b)
                    switch (user.id) {
                        case interaction.user.id:
                            return await interaction.reply({ embeds: [woops.setDescription("You can't unban yourself!")] });
                        case client.user.id:
                            return await interaction.reply({ embeds: [woops.setDescription("I can't unban myself!")] });
                        default:
                            try {
                                await interaction.guild.members.unban(user, { reason: reason });
                                await interaction.reply({ embeds: [client.embed().setTitle('Success!').setDescription(`${user} was successfully unbanned.\n\n**Reason**\n${reason}`)] })
                            } catch (error) {
                                await interaction.reply({ embeds: [woops.setDescription(`It seems we encountered an error:\n\`${error}\``)], ephemeral: true })
                            }
                    }
                    return;
                }
                return;
            }
            if (scg === 'kick' && sc === 'add') {
                const user = interaction.options.getMember('member');
                const reason = interaction.options.getString('reason');
                const woops = new client.embed().setTitle('Whoops!').setColor(0xd1271b)
                switch (user.id) {
                    case interaction.user.id:
                        return await interaction.reply({ embeds: [woops.setDescription("You can't kick yourself!")] });
                    case client.user.id:
                        return await interaction.reply({ embeds: [woops.setDescription("I can't kick myself!")] });
                    default:
                        try {
                            await user.kick({ reason: reason });
                            await interaction.reply({ embeds: [client.embed().setTitle('Success!').setDescription(`${user} was successfully kicked.\n\n**Reason**\n${reason}`)] })
                        } catch (error) {
                            await interaction.reply({ embeds: [woops.setDescription(`It seems we encountered an error:\n\`${error}\``)], ephemeral: true })
                        }
                }
                return;
            }
            if (scg === 'mute' && sc === 'add') {
                const member = interaction.options.getMember('member');
                const durationTime = client.Utils.Time.stringToMilliseconds(interaction.options.getString('duration'));
                const woops = new client.embed().setTitle('Whoops!').setColor(0xd1271b)
                switch (member.id) {
                    case interaction.user.id:
                        return await interaction.reply({ embeds: [woops.setDescription("You can't mute yourself!")] });
                    case client.user.id:
                        return await interaction.reply({ embeds: [woops.setDescription("I can't mute myself!")] });
                    default:
                        try {
                            await member.disableCommunicationUntil(new Date(Date.now() + durationTime));
                            await interaction.reply({ embeds: [client.embed().setTitle('Success!').setDescription(`${member} was successfully muted for ${client.Utils.Time.elapsedTime(durationTime / 1000)}`)] })
                        } catch (error) {
                            await interaction.reply({ embeds: [woops.setDescription(`It seems we encountered an error:\n\`${error}\``)], ephemeral: true })
                        }
                }
                return;
            }
        })
        .setMessage(async (_message, _client) => { /* Do Stuff Here */ })
        .setAutocomplete(async (_interaction, _client) => { /* Do Stuff Here */ });
