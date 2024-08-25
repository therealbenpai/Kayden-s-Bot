const { ApplicationCommandType, ContextMenuCommandBuilder } = require('discord.js');
const { Discord: { Initializers: { ContextMenu, ComponentInfo } } } = require('@therealbenpai/djs-client').Utils;

module.exports = new ContextMenu(
    'NAME',
    new ComponentInfo(
        'NAME',
        'DESCRIPTION',
        'User',
    ),
    new ContextMenuCommandBuilder()
        .setName('NAME')
        .setType(ApplicationCommandType.User),
)
    .setExecute(async (client, interaction) => { /* Do Stuff Here */ });
