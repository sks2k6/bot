const { bot, mode, uploadToServer,sendMenButton, sendMention } = require('../lib/');

bot({

    pattern: "mention ?(.*)",

    fromMe: true,

    desc: "custom mention reply",

    type: "user",

}, async (message, match) => {

    await sendMenButton(message, match);

});



bot({

    on: "text",

    fromMe: false,

    dontAddCommandList: true

}, async (message, match) => {

 await sendMention(message, match);

});



bot({

    pattern: "murl ?(.*)",

    fromMe: mode,

    desc: "url for mention and supports audio",

    type: "generator"

}, async (m) => {

    try {

        let res = await uploadToServer(await m.quoted.download());

        return await m.send(res);

    } catch (e) {

        m.reply('Failed to upload \n> Invalid media type');

        console.log(e);

    }

});
