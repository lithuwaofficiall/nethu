const { cmd ,commands } = require('../command');

cmd({
    pattern: "emojis",
    react: "💝",
    use: ".emojis",
    desc: "Send random emoji and edit it every 2 seconds for 30 minutes",
    category: "fun",
    filename: __filename,
},
async (conn, mek, m, { reply }) => {
    try {
        const emojis = [
            "🩷", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "🩶", "🤍",
            "🤎", "❤‍🔥", "💞", "💓", "💖", "💘", "💝"
        ]; 

        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const sent = await conn.sendMessage(m.chat, { text: randomEmoji });

        const totalDurationMs = 120 * 60 * 1000; // 30 minutes
        const editIntervalMs = 1000; // 2 seconds
        const totalEdits = Math.floor(totalDurationMs / editIntervalMs);

        for (let i = 0; i < totalEdits; i++) {
            await new Promise(res => setTimeout(res, editIntervalMs));

            const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            await conn.sendMessage(m.chat, {
                edit: sent.key,
                text: newEmoji
            });
        }

    } catch (e) {
        console.error(e);
        reply("Error: " + e.message);
    }
});
