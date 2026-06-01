client.once('ready', async () => {
  console.log(`🐱 ${client.user.tag} 已上線`);

  const commands = [
    {
      name: '喝水',
      description: '喝水獲得獎勵',
      options: [
        {
          name: 'ml',
          type: 4,
          description: '喝水量',
          required: true
        }
      ]
    },
    {
      name: '角色',
      description: '查看角色'
    }
  ];

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Slash Commands 已註冊成功');
  } catch (err) {
    console.error('❌ 註冊失敗:', err);
  }
});
