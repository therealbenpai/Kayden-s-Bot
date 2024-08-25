/* eslint-disable @typescript-eslint/no-unused-vars */
const { ChannelType } = require('discord.js');
const { Discord: { Initializers: { Trigger } } } = require('@therealbenpai/djs-client').Utils
module.exports =
    new Trigger(
        'example',
        new Trigger.Message(false, true, { prefixes: [], contains: [], suffixes: [], regex: [] }),
        new Trigger.Channel(false, true, { ids: [], types: [] }),
        new Trigger.Role(false, true, { ids: [] }),
        new Trigger.User(false, true, { ids: [] }),
    )
        .setExecute((client, message) => { /* Do Stuff Here */ })
        .setGlobalDisable(true);
