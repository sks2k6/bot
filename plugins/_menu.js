const plugins = require("../lib/plugins");
const { bot, isPrivate, clockString, pm2Uptime } = require("../lib");
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname } = require("os");

bot(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match) => {
    const contextInfo = {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363332700909499@newsletter',
        newsletterName: BOT_NAME,
        serverMessageId: -1
      }
    };
    if (match) {
      for (let i of plugins.commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(message.prefix + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}`);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `╭━━━━━ᆫ ${BOT_NAME} ᄀ━━━
┃ ✈︎  *OWNER*:  ${OWNER_NAME}
┃ ✈︎  *PREFIX*: ${prefix}
┃ ✈︎  *DATE*: ${date}
┃ ✈︎  *TIME*: ${time}
┃ ✈︎  *COMMANDS*: ${plugins.commands.length} 
╰━━━━━━━━━━━━━━━\n`;
      let cmnd = [];
      let cmd;
      let category = [];
      plugins.commands.map((command, num) => {
        if (command.pattern instanceof RegExp) {
          cmd = command.pattern.toString().split(/\W+/)[1];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type = command.type ? command.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n⛥  _${cmd.trim()}_ `;
        });
      });

       return await message.client.sendMessage(
        message.jid,
        {
          text: menu,
          footer: "ㅤㅤS Y 4 M",
         buttons: [
          {
            buttonId: '.ping',
            buttonText: { displayText: 'PING'},
           type: 1,
         }
     ],
         headerType: 1,
         viewOnce: true,
          contextInfo
        },
        {
          quoted: {
            key: message.key,
            message: {
              conversation: message.text || message.body || ''
            }
          }
        }
      );
    }
  }
);
