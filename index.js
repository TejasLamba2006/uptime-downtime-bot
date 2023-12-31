require('dotenv').config();
const Discord = require("discord.js");
const config = require(`./botconfig/config.js`);
const settings = require(`./botconfig/settings.js`);
const colors = require("colors");
const client = new Discord.Client({
  fetchAllMembers: false,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  failIfNotExists: false,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessages
  ],
  presence: {
    status: "online"
  }
});
//DataBase stuff
if (config.MONGOtype === "MONGOOSE") {
    const mongoose = require('mongoose');

    main().catch(err => console.log(err));

    async function main() {
      await mongoose.connect(config.MongoURL);
    }
    new Promise((res) => {
      mongo.connection.once("connected", () => {
        console.log("MongoDB connected!");
        res();
      });
    });
  } else {
    console.log('Invalid MongoType, MONGOOSE Accepted')
    process.exit(1)
  }

//Define some Global Collections
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./slashCommands`);
client.allEmojis = require("./botconfig/emojis.js");
client.maps = new Map();

client.setMaxListeners(100); require('events').defaultMaxListeners = 100;


//Require the Handlers Add the antiCrash file too, if its enabled
["events", "slashCommands", settings.antiCrash ? "antiCrash" : null]
  .filter(Boolean)
  .forEach(h => {
    require(`./handlers/${h}`)(client);
  })
//Start the Bot
client.login(config.token)
//End of the File

