const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once('ready', () => {
  console.log(`🐱 ${client.user.tag} 已上線`);
});

client.login(process.env.DISCORD_TOKEN);
