const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { Discord: { Initializers: { Button, ComponentInfo } } } = require('@therealbenpai/djs-client').Utils;

module.exports = new Button(
    'customID',
    new ComponentInfo(
        'customID',
        'Button Description',
        'Primary',
    ),
    new ButtonBuilder()
        .setCustomId('customID')
        .setLabel('Button Label')
        .setStyle(ButtonStyle.Primary),
)
    .setExecute(async (client, interaction) => { /* Do Stuff Here */ });
