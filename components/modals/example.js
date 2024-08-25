const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { Discord: { Initializers: { Modal, ComponentInfo } } } = require('@therealbenpai/djs-client').Utils;

module.exports = new Modal(
    'NAME',
    new ComponentInfo(
        'NAME',
        'DESCRIPTION',
        'Base Modal',
    ),
    new ModalBuilder()
        .setCustomId('NAME')
        .setTitle('TITLE')
        .addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('INPUT')
                        .setPlaceholder('Placeholder')
                        .setStyle(TextInputStyle.Short)
                        .setLabel('Label'),
                ),
        ),
)
    .setExecute(async (client, interaction) => { /* Do Stuff Here */ });
