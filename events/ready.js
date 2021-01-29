
module.exports = {
    name: "ready",
    run: async (client) => {
        global.error = require("../client-utils/embeds/embeds");
        console.log(`Succesfull logged as ${client.user.tag}`);
        client.color = client.config.color;
        client.user.setActivity(",pomoc ● #TeamMarky")
    }
}


