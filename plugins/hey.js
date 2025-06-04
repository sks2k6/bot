const { bot, isPrivate, clockString, pm2Uptime } = require("../lib");
bot(
  {
    pattern: "hi$",
    fromMe: isPrivate,
    desc: "Show All Commands",
    type: "user",
  },async (message, client) => {
await message.client.sendMessage(message.jid, {
  text: "Hello Wolrd !;", 
  footer: "© SKS",
  buttons: [
  {
    buttonId: '.ping',
    buttonText: {
      displayText: 'TESTING BOT'
    },
    type: 1,
  },
  {
    buttonId: ' ',
    buttonText: {
      displayText: 'PRIVATE SCRIPT'
    },
    type: 1,
  },
  {
    buttonId: 'action',
    buttonText: {
      displayText: 'ini pesan interactiveMeta'
    },
    type: 1,
    nativeFlowInfo: {
      name: 'single_select',
      paramsJson: JSON.stringify({
        title: 'message',
        sections: [
          {
            title: 'S Y 4 M- 2025',
            highlight_label: '🦠',
            rows: [
              {
                header: 'HEADER',
                title: 'TITLE1',
                description: 'MENU',
                id: '.menu',
              },
              {
                header: 'HEADER',
                title: 'TITLE',
                description: 'DESCRIPTION',
                id: 'YOUR ID',
              },
            ],
          },
        ],
      }),
    },
  },
  ],
  headerType: 1,
  viewOnce: true
})
});
