const
    { Client } = require('@therealbenpai/djs-client'),
    { ActivityType, GatewayIntentBits } = require('discord.js'),
    { config } = require('dotenv'),
    fs = require('fs'),
    { default: _fuseType } = require('fuse.js'),
    Fuse = require('fuse.js');
config({ path: [`${__dirname}/.env`, `${process.cwd()}/.env`, './.env'].find((f) => fs.existsSync(f)) });

const mainClient = new Client(
    process.env.PREFIX,
    process.env.TOKEN,
    process.env.CLIENT_ID,
    {
        buttonsDir: `${__dirname}/components/buttons`,
        commandsDir: `${__dirname}/commands`,
        contextMenusDir: `${__dirname}/components/contextMenus`,
        eventsDir: `${__dirname}/events`,
        modalComponentsDir: `${__dirname}/components/modals`,
        predefinedMessagesDir: `${__dirname}/messages`,
        selectMenusDir: `${__dirname}/components/selectMenus`,
        triggersDir: `${__dirname}/triggers`,
    },
)

mainClient.Statuses
    .set(1, { type: ActivityType.Watching, name: 'the community server' })
    .set(2, { type: ActivityType.Listening, name: 'to the community' })
    .set(3, { type: ActivityType.Playing, name: 'with the community' });

mainClient
    .setBranding({ footer: { text: 'Made with ❤️ by the Pronouns.page' }, color: 0x2F3136 });

const client = Object.assign(mainClient, { /** @type {_fuseType} */ Fuse });

client.start();

module.exports = client;
