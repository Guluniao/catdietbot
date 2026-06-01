const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ====== RPG資料（先用記憶體版，之後升級資料庫） ======
const users = {};

// 初始化玩家
function getUser(id) {
  if (!users[id]) {
    users[id] = {
      exp: 0,
      coins: 0,
      diamond: 0,
      water: 0
    };
  }
  return users[id];
}

// ====== Bot Ready ======
client.once('ready', () => {
  console.log(`🐱 ${client.user.tag} 已上線`);
});

// ====== Slash Commands ======
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const user = getUser(interaction.user.id);

  // 💧 喝水
  if (interaction.commandName === '喝水') {
    const amount = interaction.options.getInteger('ml');

    let exp = 0;
    let coins = 0;
    let diamond = 0;

    if (amount >= 2500) {
      exp = 3; coins = 20;
    } else if (amount >= 2000) {
      exp = 2; coins = 15;
    } else if (amount >= 1500) {
      exp = 1; coins = 10;
    }

    user.exp += exp;
    user.coins += coins;

    await interaction.reply(
`💧 喝水成功！

⭐ EXP +${exp}
🐟 喵幣 +${coins}

目前：
⭐ ${user.exp}
🐟 ${user.coins}
💎 ${user.diamond}`
    );
  }

  // 👤 角色
  if (interaction.commandName === '角色') {
    await interaction.reply(
`🐱 冒險者資料

⭐ EXP：${user.exp}
🐟 喵幣：${user.coins}
💎 鑽石：${user.diamond}`
    );
  }
});

// ====== 啟動 ======
client.login(process.env.DISCORD_TOKEN);
