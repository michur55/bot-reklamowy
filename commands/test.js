//const ms = require("ms");
//const moment = require("moment");
module.exports = {
    name: "test",

    run: async (client, message, args) => {
        if(message.author.id !== "471260011666997259") return

        const number = args[0];
        const ad = await getByNumber(`${number}`) || await getByNumber(number);
        console.log(ad)
        message.reply(JSON.stringify(ad))
      //  message.reply(moment(Date.now()+ await ms(args[0])).format('LLLL'))
      //  message.reply(new Date(new Date() + ms(args[0])).getDate())
    }
}
