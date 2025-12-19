const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "lithu=P4wwEBZL#ZHaTlV1dPp_w85femow4BcuVBA8YfLBbs4aJKUMgDO8", // ඔයාගේ session id එක දාන්න
MONGODB: process.env.MONGODB || "mongodb://mongo:jUZBPbznsHkbJWTDmevvEFdrpGCxcEpa@metro.proxy.rlwy.net:46411", // ඔයාගේ mongodb url එක දාන්න
LANG: process.env.LANG || "EN",
BUTTON: process.env.BUTTON || "true",
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39",
DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO,
};
