const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { Discord: { Initializers: { SelectMenu, ComponentInfo } } } = require('@therealbenpai/djs-client').Utils;

module.exports = new SelectMenu(
    'NAME',
    new ComponentInfo(
        'NAME',
        'DESCRIPTION',
        'String',
    ),
    new StringSelectMenuBuilder()
        .setCustomId('NAME')
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder('Placeholder')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Label')
                .setValue('Value')
                .setDescription('Description'),
        ),
)
    .setExecute(async (client, interaction) => { /* Do Stuff Here */ });
