const {
    Events,
    ContextMenuCommandInteraction,
    ButtonInteraction,
    StringSelectMenuInteraction,
    ModalSubmitInteraction,
} = require('discord.js');
const { Discord: { Initializers: { Event } } } = require('@therealbenpai/djs-client').Utils;

module.exports = new Event(Events.InteractionCreate)
    .setExecute(async (client, interaction) => {
        if (interaction.isAutocomplete()) return client.Commands.get(interaction.commandName).autocomplete(client, interaction);
        if (interaction.isCommand()) {
            const command = client.Commands.get(interaction.commandName);
            if (!command) return;
            client.bumpRTS('commands.slash');
            // console.dir(command, { depth: 3 });
            // console.dir(interaction.member);
            console.dir(Array.of(
                [!Boolean(command.requiredPerm), Boolean(interaction.guild), !interaction.member.permissions.has(command.requiredPerm)],
                [!Boolean(command.allowedRoles), !interaction.member.roles.cache.some(({ id }) => command.allowedRoles.includes(id))],
                [!Boolean(command.allowedUsers), !command.allowedUsers.includes(interaction.member.id)],
            ));
            const failureReason = !Boolean(command.blockDM) &&
                interaction.channel.isDMBased()
                ? 1
                : !Boolean(command.channelLimits) && command.channelLimits.includes(interaction.channel.type)
                    ? 2
                    : Array.of(
                        [!Boolean(command.requiredPerm), Boolean(interaction.guild), !interaction.member.permissions.has(command.requiredPerm)],
                        [!Boolean(command.allowedRoles), !interaction.member.roles.cache.some(({ id }) => command.allowedRoles.includes(id))],
                        [!Boolean(command.allowedUsers), !command.allowedUsers.includes(interaction.member.id)],
                    ).some((value) => value.every(Boolean))
                        ? 3
                        : command.disabled
                            ? 4
                            : 0;
            return failureReason
                ? interaction.reply({
                    content: ['dmDisabled', 'invalidChannelType', 'noPerms', 'disabled']
                        .map((e) => client.configs.defaults[e])[failureReason - 1],
                })
                : command.commandExecute(client, interaction);
        }
        // if (interaction.isContextMenu()) {
        //     const command = client.ContextMenus.get(interaction.commandName);
        //     if (!command) {
        //         return;
        //     }
        //     client.bumpRTS('components.contextMenus');
        //     return command.commandExecute(client, interaction);
        // }
        if (
            interaction.isButton() ||
            interaction.isModalSubmit() ||
            interaction.isSelectMenu()
        ) {
            const interactionType = interaction.isButton()
                ? 'buttons'
                : interaction.isModalSubmit()
                    ? 'modals'
                    : 'selectMenus';
            client.bumpRTS(`components.${interactionType}`);
            return client[interaction.isButton() ? 'Buttons' : interaction.isModalSubmit() ? 'Modals' : 'SelectMenus']
                .get(interaction.customId)
                .execute(client, interaction);
        }
        const interactionType = [
            [ButtonInteraction, 'buttons'],
            [ModalSubmitInteraction, 'modals'],
            [StringSelectMenuInteraction, 'selectMenus'],
            [ContextMenuCommandInteraction, 'contextMenus'],
            // Maps the component type to a key
        ].find(([inter]) => interaction instanceof inter);
        if (!interactionType) return await interaction.reply({ content: 'This interaction is not supported yet.', ephemeral: true });
        const InterType = interactionType[1];
        // capitalize the first letter of the "InterType" variable
        const capitalizedInterType = InterType.charAt(0).toUpperCase() + InterType.slice(1);
        client.bumpRTS(`components.${InterType}`);
        return client[capitalizedInterType]
            .get(interaction[InterType === 'contextMenus' ? 'commandName' : 'customId'])
            .execute(client, interaction);
    });
