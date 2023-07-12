const mongoose = require('mongoose');

const uptimeSchema = new mongoose.Schema({
    guildId: String,
    channelId: String,
    bots: [{
        botId: String,
        uptime: Number,
        lastUpdated: Number
    }]
});