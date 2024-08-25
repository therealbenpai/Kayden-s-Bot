const { Discord: { Utils: { Embed }, Initializers: { Message: Msg } } } = require('@therealbenpai/djs-client').Utils
const { EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = new Msg(
    'NAME',
    'READABLE NAME',
)
    .content(async (client) => { /* Do Stuff Here*/ });
