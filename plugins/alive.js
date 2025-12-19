const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const {readEnv} = require('../lib/database')
const os = require("os");
const moment = require("moment-timezone");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    react: "👋",
    alias: ["info", "online"],
    desc: "Check bot online or no.",
    category: "main",
    use: '.alive',
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const config = await readEnv();
        
        const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");
        const time = moment().tz("Asia/Colombo").format("HH:mm:ss");

        let host = os.hostname() || "render";
        if (host.length === 12) host = 'replit';
        else if (host.length === 36) host = 'heroku';
        else if (host.length === 8) host = 'koyeb';

        const ownerdata = (await axios.get('https://raw.githubusercontent.com/Nethmika-LK/QUEEN-NETHU-DATABASE/refs/heads/main/details.json')).data;
        const ALIVE_MSG = ownerdata.alivemsg;
        const FOOTER = ownerdata.footer;
        const IMAGE_URL = ownerdata.imageurl;
        const ALIVE_VIDEO = ownerdata.alivevideo;
        const VERSION = ownerdata.version;
        const CHANNEL = ownerdata.channel;

        
let monospace = '```';    
const aliveMessage = `${monospace}👋 𝐇𝐈, ${pushname} 𝐈❜𝐀𝐌 𝐀𝐋𝐈𝐕𝐄 𝐍𝐎𝐖 👾${monospace}

*╭─「  ᴅᴀᴛᴇ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ  」*
*┃* 📅 *\`Date\`* : ${date}
*┃* ⏰ *\`Time\`* : ${time}
*╰─────────────●●►*

*╭─「  ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ  」*
*┃* 👤 *\`User\`* : ${pushname}
*┃* ✒️ *\`Prefix\`* : ${config.PREFIX}
*┃* 🧬 *\`Version\`* : ${VERSION}
*┃* 🎈 *\`Platform\`* : Linux
*┃* 📡 *\`Host\`* : ${host}
*┃* 📟 *\`Uptime\`* : ${runtime(process.uptime())}
*┃* 📂 *\`Memory\`* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*╰─────────────●●►*

*╭─「 ᴅᴇᴘʟᴏʏ ᴠɪᴅᴇᴏꜱ & ᴏᴛʜᴇʀ ɪɴꜰᴏ 」*
${ALIVE_MSG}
*╰──────────●●►*

${FOOTER}`;

    
        await conn.sendMessage(from, {
            video: { url: ALIVE_VIDEO },
            mimetype: 'video/mp4',
            ptv: true
        }, { quoted: mek });

    
        await conn.sendMessage(from, {
            image: { url: IMAGE_URL },
            caption: aliveMessage
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`*Error ❗*\n${e.message}`);
    }
});
