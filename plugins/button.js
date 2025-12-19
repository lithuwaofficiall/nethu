const { cmd, commands } = require('../command');
const fs = require('fs');
const config = require('../config');

cmd({
    pattern: "button",
    desc: "Bot's Online or No.",
    react: "👋",
    category: "main",
    filename: __filename
},
async(conn, mek, m, {from, reply}) => {
    try {
        const aliveMessage = `He He 🌚`;

        if (config.BUTTON === 'true') {
            await conn.sendMessage(from, {
                footer: '© 2025 Queen Nthu MD',
                buttons: [
                    {
                        buttonId: `.system`,
                        buttonText: { displayText: 'System 📟' },
                        type: 1
                    },
                    {
                        buttonId: `.ping`,
                        buttonText: { displayText: 'Ping 📍' },
                        type: 1
                    }
                ],
                headerType: 1,
                viewOnce: true,
                image: {url: "https://i.ibb.co/wsRfxsf/IMG-20241220-WA0008.jpg" },
                caption: aliveMessage,
                contextInfo: {
                    isForwarded: true,
                    mentionedJid: [m.sender],
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363322195409882@newsletter",
                        newsletterName: "Queen Nethu MD V2"
                    }
                }
            }, {quoted: mek})
        } else {
            await conn.sendMessage(from, {
                image: {url: "https://i.ibb.co/wsRfxsf/IMG-20241220-WA0008.jpg" },
                caption: aliveMessage
            }, {quoted: mek})
        }
    } catch(e) {
        console.log(e)
        reply(`*ERROR ❗❗*`);
    }
})


/*
cmd({
    pattern: "alive1",
    react: "⚡",
    use: ".alive",
    desc: "Send alive message and react to trigger commands",
    category: "general",
    filename: __filename,
},
async (client, mek, m, { reply, prefix, commands }) => { // Use client instead of conn
    try {
        const aliveMessage = `
💀 - Menu
🫵 - Ping
🤖 - Help`;

        // Send the alive message
        const sent = await client.sendMessage(m.chat, { text: aliveMessage });

        // Attach a global listener
        client.aliveMessageId = sent.key.id; // Save sent message id globally

        // React with emoji (optional)
        await client.sendMessage(m.chat, { react: { text: '💀', key: sent.key } });

    } catch (e) {
        console.error(e);
        reply("Error: " + e.message);
    }
});

// Reaction event listener (global place, not inside cmd)
client.ev.on('messages.reaction', async (reactionEvent) => { // Use client instead of conn
    try {
        if (!reactionEvent || !reactionEvent.key || !reactionEvent.reaction || !reactionEvent.reaction.text) return;
        
        const { key, reaction } = reactionEvent;
        
        if (!client.aliveMessageId) return; // No alive message yet
        if (key.id !== client.aliveMessageId) return; // Only react to our alive message

        const reactedEmoji = reaction.text;

        if (reactedEmoji === "💀") {
            await client.sendMessage(key.remoteJid, { text: ".menu" });
        } 
        else if (reactedEmoji === "🫵") {
            await client.sendMessage(key.remoteJid, { text: ".ping" });
        } 
        else if (reactedEmoji === "🤖") {
            await client.sendMessage(key.remoteJid, { text: ".help" });
        }
    } catch (err) {
        console.error("Reaction Handling Error:", err);
    }
});

    */            





cmd({
  pattern: "push",
  alias: [],
  use: ".push <message>",
  react: "✉️",
  desc: "Group එකේ හැමෝටම inbox msg/Media යවන්න",
  category: "group",
  filename: __filename
}, async (conn, m, mek, { participants, reply }) => {
  try {
      const qMessage = { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" },
    message: {
        contactMessage: {
            displayName: "Nethmika", 
            vcard: 
                'BEGIN:VCARD\n' +
                'VERSION:3.0\n' +
                'FN:Nethmika\n' +
                'ORG:Nethmika\n' +
                'TEL;type=CELL;type=VOICE;waid=94787072548:+94 78 707 2548\n' +
                'EMAIL:nethmikakaushalya10@gmail.com\n' +
                'END:VCARD'
        }
    }
                       };
    


      
    if (!m.isGroup) 
        return await reply("මෙම command එක group එකක් තුළ විතරයි භාවිතා කරන්න.");

    const mentionedJids = participants.map(u => u.id);
    const caption = (m.message?.extendedTextMessage?.text || m.body || "").replace(/^\.push\s+/i, "").trim();

    if (m.mtype === 'imageMessage' || m.mtype === 'videoMessage' || m.mtype === 'audioMessage') {
      const buffer = await m.download();

      for (let jid of mentionedJids) {
        if (m.mtype === 'imageMessage') {
          await conn.sendMessage(jid, { image: buffer, caption });
        } else if (m.mtype === 'videoMessage') {
          await conn.sendMessage(jid, { video: buffer, caption });
        } else if (m.mtype === 'audioMessage') {
          await conn.sendMessage(jid, { audio: buffer, mimetype: 'audio/mp4', ptt: true });
        }
      }

    } else if (caption) {
      for (let jid of mentionedJids) {
        await conn.sendMessage(jid, { text: caption }, { quoted: qMessage });
      }
    } else {
      return await reply("කරුණාකර `.push <message>` format එකක් භාවිතා කරන්න හෝ media එකක් attach කරන්න.");
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: mek.key } });

  } catch (err) {
    console.error("*ERROR* :", err);
    await reply("*ERROR*");
    await conn.sendMessage(m.chat, { react: { text: '❌', key: mek.key } });
  }
});
