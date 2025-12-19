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

//02.OWNER MESSAGE
cmd({
    pattern: "owner",
    desc: "Get bot's owner number.",
    category: "main",
    use: '.owner',
    alias: ["head"],
    filename: __filename,
}, 

async (conn, mek, m, { from, quoted, reply }) => {
    try {
        
        const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:Sl NethuMax\n'
            + 'ORG:Sl NethuMax\n'
            + 'TEL;type=CELL;type=VOICE;waid=94704227534:+94 70 422 7534\n'
            + 'EMAIL:nethmikakaushalya10@gmail.com\n'
            + 'END:VCARD';

        await conn.sendMessage(from, {
                            contacts: {
                                displayName: "Sl NethuMax",
                                contacts: [{ vcard }]
                            }
                        }, { quoted: mek });        
    
               } catch (e) {
                 console.log(e);
                 reply(`${e}`);
               }
               });

//03.BOT'S SPEED
cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    use: ".ping",
    react: "📍",
    filename: __filename
},
async (conn, mek, m, {
    from, reply
}) => {
    try {
        const qMessage = {
  key: {
    fromMe: false,
    remoteJid: "status@broadcast",
    participant: "0@s.whatsapp.net",
  },
  message: {
    contactMessage: {
      displayName: "Nethu Max",  
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:Nethu Max Yt
TEL:+94704227534
END:VCARD` 
    }
  }
};

        const startTime = Date.now();
        const sentMsg = await conn.sendMessage(from, { text: '```Testing ping...```' }, { quoted: qMessage });
        const ping = Date.now() - startTime;

        await conn.sendMessage(from, {
            text: `*Pong :*\n*${ping}ms*`,
            edit: sentMsg.key
        });

    } catch (e) {
        console.error(e);
        reply(`*Error ❗*\n${e.message}`);
    }
});

//04.BOT'S SCRIPT 
cmd({
    pattern: "script",
    alias: ["sc","git"],
    react: '📚',
    desc: "It gives bot link.",
    category: "main",
    use: '.script',
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const qMessage = {
  key: {
    fromMe: false,
    remoteJid: "status@broadcast",
    participant: "0@s.whatsapp.net",
  },
  message: {
    productMessage: {
      product: {
        productImage: {
          mimetype: "image/jpeg",
          jpegThumbnail: Buffer.from([]) // Empty thumbnail or add a real one
        },
        title: "WhatsApp Support",
        description: "Official Service Assistance",
        currencyCode: "USD",
        priceAmount1000: "1000",
        retailerId: "WhatsApp Official",
        productImageCount: 1,
      },
      businessOwnerJid: "0@s.whatsapp.net"
    }
  }
};
        const ownerdata = (await axios.get('https://raw.githubusercontent.com/Nethmika-LK/QUEEN-NETHU-DATABASE/refs/heads/main/details.json')).data;
        const FOOTER = ownerdata.footer;
        const IMAGE_URL = ownerdata.imageurl;
        const OWNER_NUMBER = ownerdata.ownernumber;
        const BOT_REPO = ownerdata.repo;
        const CHANNEL = ownerdata.channel;
   
        const scMessage = `
*╭─「  ʙᴏᴛ'ꜱ ꜱᴄʀɪᴘᴛ  」*
*┃* \`Owner Number\` : ${OWNER_NUMBER}
*┃* 
*┃* \`Bot's Repo\` : ${BOT_REPO}
*┃*
*┃* \`Bot's Update\` : ${CHANNEL}
*┃*
*╰──────────●●►*

කැමති විදිහට ඔයාගෙ නම් දාලා edit කරගන්න පුළුවන් Full decript 🤩
Price Rs *1000* (bank & Reload) 

Buy Via wa.me/${OWNER_NUMBER}

${FOOTER}`;

        await conn.sendMessage(from, {
            document: { url: IMAGE_URL }, 
            fileName: 'Queen Nethu MD',  
            mimetype: "application/msword",
            fileLength: 99999999999999,  
            caption: scMessage,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: qMessage });

    } catch (e) {
        console.error(e);
        reply(`*Error ❗*\n${e.message}`);
    }
});


//05.BOT'S SYSTEM
cmd({
    pattern: "system",
    react: "🫟",
    alias: ["status", "os"],
    desc: "Get bot's system information.",
    category: "main",
    use: '.system',
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {

        let host = os.hostname() || "render";
        if (host.length === 12) host = 'replit';
        else if (host.length === 36) host = 'heroku';
        else if (host.length === 8) host = 'koyeb';

        const ownerdata = (await axios.get('https://raw.githubusercontent.com/Nethmika-LK/QUEEN-NETHU-DATABASE/refs/heads/main/details.json')).data;
        const FOOTER = ownerdata.footer;
        const IMAGE_URL = ownerdata.imageurl;
        const VERSION = ownerdata.version;
        const OWNER_NAME = ownerdata.ownername;
   
const systemMessage = `
*╭─「  ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ  」*
*┃*
*┃* ⏰ \`Runtime\` :- ${runtime(process.uptime())}
*┃*
*┃* 📟 \`RAM Usage\` :- ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*┃*
*┃* ⚙️ \`Platform\` :- ${host}
*┃*
*┃* 👨‍💻 \`Owner\` :- ${OWNER_NAME}
*┃*
*┃* 🧬 \`Version\` :- ${VERSION}
*┃*
*╰──────────●●►*

${FOOTER}`;

        await conn.sendMessage(from, {
            image: { url: IMAGE_URL },
            caption: systemMessage,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: false
            }
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`*Error ❗*\n${e.message}`);
    }
});

//06.BOOM MESSAGE
cmd({
    pattern: "boom",
    desc: "Send a message multiple times",
    react: "📢",
    category: "main",
    use: '.boom',
    filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    
    if (!isOwner) {
        return await conn.sendMessage(from, { text: "This command is only for the bot owner!" });
    }

    if (args.length < 2) {
        return await conn.sendMessage(from, { text: "Usage: *.boom <count> <message>*\nExample: *.boom 500 Hello!*" });
    }
    const count = parseInt(args[0]);
    if (isNaN(count) || count <= 0 || count > 500) {
        return await conn.sendMessage(from, { text: "Please provide a valid count (1-500)." });
    }
    const message = args.slice(1).join(" ");
    for (let i = 0; i < count; i++) {
        await conn.sendMessage(from, { text: message });
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }
});

//07.PARIN CODE
cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Pairing code",
    category: "main",
    use: ".pair +9476066XXXX",
    filename: __filename
}, 
async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
    
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        if (!q) {
            return await reply("*Example -* .pair +9476066XXXX");
        }

        const response = await fetch(`https://sula-md-g5sp.onrender.com/pair?number=${q}`);
        const pair = await response.json();
        if (!pair || !pair.code) {
            return await reply("Failed to retrieve pairing code. Please check the phone number and try again.");
        }

        const pairingCode = pair.code; 
        const doneMessage = "*Queen Nethu MD PAIR COMPLETED ✅*";

        await reply(`${doneMessage}\n\n*Your pairing code is:* ${pairingCode}`);

        
        await sleep(2000);

        await reply(`Code: ${pairingCode}`);
    } catch (error) {
        console.error(error);
        await reply("An error occurred. Please try again later.");
    }
});

//08.BOT'S MENU
cmd({
    pattern: "menu",
    react: "📜",
    alias: ["panel", "commands"],
    desc: "Get Bot Menu",
    category: "main",
    use: '.menu',
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const config = await readEnv();

        const qMessage = {
  key: {
    fromMe: false,
    remoteJid: "status@broadcast",
    participant: "0@s.whatsapp.net",
  },
  message: {
    locationMessage: {
      degreesLatitude: 40.7128, 
      degreesLongitude: -74.0060, 
      name: "Monaragala",  
      address: "Siyambalanduwa", 
    }
  }
};

        
        const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");
        const time = moment().tz("Asia/Colombo").format("HH:mm:ss");

        let host = os.hostname() || "render";
        if (host.length === 12) host = 'replit';
        else if (host.length === 36) host = 'heroku';
        else if (host.length === 8) host = 'koyeb';
        
        const ownerdata = (await axios.get('https://raw.githubusercontent.com/Nethmika-LK/QUEEN-NETHU-DATABASE/refs/heads/main/details.json')).data;
        const OWNER_NUMBER = ownerdata.ownernumber;
        const FOOTER = ownerdata.footer;
        const IMAGE_URL = ownerdata.imageurl;
        const ALIVE_VIDEO = ownerdata.alivevideo;
        const OWNER_NAME = ownerdata.ownername;
        
        const selectionMessage = `👋 *Hello, ${pushname}*
*🫟 Wᴇʟᴄᴏᴍᴇ Tᴏ Qᴜᴇᴇɴ-ɴᴇᴛʜᴜ-Mᴅ*🫟*
        
*╭─「 ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ 」*
*│* 🤵 *\`Owner\`* : ${OWNER_NAME}
*│* 📞 *\`Owner Number\`* : ${OWNER_NUMBER}
*│* 🚀 *\`Prefix\`* : ${config.PREFIX}
*│* 🕒 *\`Time\`* : ${time}
*│* 📅 *\`Date\`* : ${date}
*│* 📋 *\`Categories\`* : 9
*╰──────────●●►*


*\`Reply Below Number 🔢\`*

│ ◦ *1* \`\`\`OWNER MENU\`\`\`
│ ◦ *2* \`\`\`AI MENU\`\`\`
│ ◦ *3* \`\`\`SEARCH MENU\`\`\`
│ ◦ *4* \`\`\`DOWNLOAD MENU\`\`\`
│ ◦ *5* \`\`\`MAIN MENU\`\`\`
│ ◦ *6* \`\`\`CONVERT MENU\`\`\`
│ ◦ *7* \`\`\`OTHER MENU\`\`\`
│ ◦ *8* \`\`\`LOGO MENU\`\`\`
│ ◦ *9* \`\`\`GROUP MENU\`\`\`

${FOOTER}`;

        await conn.sendMessage(from, {
            video: { url: ALIVE_VIDEO },
            mimetype: 'video/mp4',
            ptv: true
        }, { quoted: mek });

        const sentMsg = await conn.sendMessage(from, {
            image: { url: IMAGE_URL },
            caption: selectionMessage,
            contextInfo: { forwardingScore: 999, isForwarded: false }
        }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userResponse = msg.message.extendedTextMessage.text.trim();
            if (msg.message.extendedTextMessage.contextInfo &&
                msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {

                const menuCategories = {
                    '1': 'owner',
                    '2': 'ai',
                    '3': 'search',
                    '4': 'download',
                    '5': 'main',
                    '6': 'convert',
                    '7': 'other',
                    '8': 'auto',
                    '9': 'group'
                };

                if (!menuCategories[userResponse]) {
                    await reply("*Please Reply The Number ❗❗*");
                    return;
                }

                const selectedCategory = menuCategories[userResponse];
                let menu = '';

                for (let i = 0; i < commands.length; i++) {
                    if (commands[i].category === selectedCategory && !commands[i].dontAddCommandList) {
                        menu += `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Desc:* ${commands[i].desc}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`;
                    }
                }

                const madeMenu = `*◈ ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Command List ◈*\n\n${menu}─────────────────────────\n${FOOTER}`;

                await conn.sendMessage(from, {
                    image: { url: IMAGE_URL },
                    caption: madeMenu
                }, { quoted: qMessage });
            }
        });

    } catch (err) {
        console.error(err);
        await reply('*ERROR ❗❗*');
    }
}); 
