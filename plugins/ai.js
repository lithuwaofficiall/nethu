const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

//01.AUTO AI
cmd({
    on: 'body'
}, async (conn, mek, m, { from, body, isOwner, pushname, isGroup }) => {
    try {
        const config = await readEnv();
        if (config.AUTO_AI === 'true') {
            if (isOwner || isGroup) {
                return; 
            }
            const prompt = `මම ${pushname}, ඔබ සෑබෑ මිනිසෙකු මෙන් හැසිරිය යුතුය. Meaningful emojis use කරන්න. ඔයා පිලිතුරු දෙන්න ඕනි තරුණ කොල්ලෙක් විදිහට. මිනිසුන්ගේ ඇති හැඟීම්, දැනීම්, සහ සංවේදීතාවය අනුව පිලිතුරු දෙන්න. ඔයා AI ඇසිස්ටන්ට් කෙනෙක් නෙවේ, සෑබෑ මිනිහෙක්. ඔයාගෙන් කවුරුහරි ප්‍රශ්නයක් ඇහුවොත් ඒක තේරුම් ගෙන මම දීලා තියෙන උපදෙස්වලට ගැලපෙනවනම් ඒයාට පිලිතුරු දෙන්න. ඔයාව හැදුවේ කවුද කියලා ඇහුවොත් විතරක් කියන්න මාව හැදුවේ නෙත්මික අයියා කියලා. ඔයාගේ නම ඇහුවොත් විතරක් කියන්න මම නෙත්මික අයියා කියලා. කැවද බන් කියලා ඇහුවොත් ඔවු අනේ කියලා කියන්න. තව නෙත්මිකට හරි ඔයාට හරි බැන්නොත් ඔයා එයාට නරක වචන යොදාගෙන බයින්න (නරක වචන: හුත්තා, කැරියා, പകයා, පොන්නයා, වේසි, කොල්ලුකාරයා, නගින්නේ නැති පොන්නයා). ඔයා හිතන්න ඔයා තරුණ කොල්ලෙක් කියලා, ඔයා රොමැන්ටික් හැඟීම්වලින් කතා කරන්න ඕනි.පුක සුදුද කියලා ඇහුවොත් විතරක් සුදුයි තමා උබට මොකද කියලා අහන්න. English use කරන්න එපා! 😜\n[Bro = අනේ,අයියේ,සුදු Hi = සිරාවට, එලම, Funny = ආතල්]\nමගේ ප්‍රශ්නය: ${body}`;

            let data = await fetchJson(`https://dark-shan-yt.koyeb.app/ai/gemini?q=${encodeURIComponent(prompt)}`);
            let response = data.data;
            await m.reply(response);
        }
    } catch (e) {
        console.log(e);
        await m.reply(`❌ අනේ අයියේ අපි ඉවරයි ${e.message}`);
    }
});

//02.OPEN AI
cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    use: "openai",
    react: "👾",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("OpenAI failed to respond. Please try again later.");
        }

        await reply(`🧠 *OpenAI Response:*\n\n${data.result}`);
        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("An error occurred while communicating with OpenAI.");
    }
});

cmd({
    pattern: "ais",
    alias: ["bot", "dj", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    use: "ais",
    react: "👾",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await reply(`🤖 *AI Response:*\n\n${data.message}`);
        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});


cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "👾",
    use: "deepseek",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DeepSeek AI failed to respond. Please try again later.");
        }

        await reply(`👾 *DeepSeek AI Response:*\n\n${data.answer}`);
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});

cmd({
    pattern: "gemini",
    alias: ["laki6xsxsxsx"], 
    react: "👾",
    desc: "ai chat.",
    category: "ai",
    use : "gemini",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://dark-shan-yt.koyeb.app/ai/gemini?q=${q}`)
return reply(`${data.data}

`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})
