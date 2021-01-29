const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "ready",
    run: async (client) => {



        setInterval(async () => {

            let number = numbersdb.get("adsQueue");

            const ad = await getByNumber(number) || await getByNumber(Number(number)) || await getByNumber(`${number}`);

            if(!ad) {
                numbersdb.set("adsQueue",1)
                    return


                // return error(errorChannel, `Wystąpił błąd podczas wysyłania reklamy o id \`${ad.guildId}\` Prawdopodobnie błąd dotyczy numerku reklamy... (${number})`);
            }


            adsdb.prepare("SELECT adsChannel FROM ads WHERE adsChannel IS NOT NULL").all().forEach(output => {
                let adsChannel = client.channels.cache.get(output.adsChannel)


                if(!adsChannel) {
/*
                    let info;
                    const guild = client.guilds.cache.get(output.guildId)
                    if (!guild) {
                        info = {
                            name : "Brak Informacji (prawdopodobnie wyrzucono bota)",
                            id : output.guildId,

                        }
                    }  else {
                        info = {
                            name : guild.name,
                            id : guild.id
                        }
                    }
                    const embed = new MessageEmbed()

                        .setAuthor("Brak kanału!")
                        .addField("Serwer:", info.name + " | " + info.id)
                        .addField("Numerek reklamy pochodzącej z tego serwera (bez kanału):", output.number)
                        .setColor("FF0000")
                    client.channels.cache.get(client.config.logsChannel).send(embed)
                    */
                } else {
                    adsChannel.send(`\`${ad.guildId};\` \`${ad.number}\` \n\n${ad.ad}\n\nhttps://discord.gg/${ad.invite}`)
                    numbersdb.set("errors", 1)
                }

            })
            adsdb.prepare("UPDATE ads SET sends = sends + 1 WHERE guildId = ?").run(ad.guildId);
            numbersdb.add("adsQueue", 1);


        }, 4 * 60 * 1000)

    }
}
