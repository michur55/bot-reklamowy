const {MessageEmbed} = require("discord.js");
module.exports = {
	name: "akceptuj",

	run : async (client, message, args) => {
		if (message.channel.id !== client.config.verifyChannel) return;
		if (!args[0]) {
			return error("Podaj id serwera do zaakceptowania!");
		}
		const toVerifyObject = await toVerifygetById(args[0]);

		if (!toVerifyObject) {
			return error(message.channel, "Nie znaleziono reklamy do weryfikacji z podanego serwera!");
		}
		const guild = client.guilds.cache.get(toVerifyObject.guildId);

		if(!guild) {
			error(message.channel, "Na tym serwerze nie ma bota! Usuwam reklame z bazy danych...");
			adsdb.prepare("DELETE FROM toVerify WHERE guildId = ?").run(toVerifyObject.guildId);
			return;
		}
		const adCheck = await adsdb.prepare("SELECT * FROM toVerify WHERE guildId = ?").get(args[0]);
		let nextNumber = numbersdb.get("toAdd");
		const channelFromdb = await getChannel(guild.id);
		const channelFromDiscord = client.channels.cache.get(channelFromdb)
		if(!channelFromdb || !channelFromDiscord) {
			error(message.channel, "Nie znaleziono kanału z reklamami na podanym serwerze! (Automatycznie odrzucam)")
			const embed = new MessageEmbed()
				.setAuthor("Wystapił Błąd!", "https://cdn.discordapp.com/emojis/784036532738719767.gif?v=1")
				.setColor("FF0000")
				.setDescription("Nie znaleziono kanału z reklamami / lub nie został on ustawiony na serwerze: " + guild.name)
			client.users.cache.get(toVerifyObject.memberId).send(embed)
			adsdb.prepare("DELETE FROM toVerify WHERE guildId = ?").run(toVerifyObject.guildId);
			return;
		}
		adsdb.prepare("INSERT INTO ads (guildId, ad, invite, sends, 'number') VALUES (?, ?, ?, ?, ?)").run(args[0], toVerifyObject.ad, toVerifyObject.invite, 0, nextNumber);
		/*
		if (!adCheck) {
			
		} else {
			adsdb.prepare("UPDATE ads SET ad = ?, invite = ?, 'number' = ? WHERE guildId = ?").run(toVerifyObject.ad, toVerifyObject.invite, nextNumber, args[0]);
		}*/
		adsdb.prepare("DELETE FROM toVerify WHERE guildId = ?").run(toVerifyObject.guildId);
		message.reply("Dodano pod numer" + nextNumber)
		numbersdb.add("toAdd", 1)
		const verifiedEmbed = new MessageEmbed()
			.setAuthor(`REKLAMA SERWERA ${guild.name.toUpperCase()} ZOSTAŁA ZAAKCEPTOWANA`, "https://cdn.discordapp.com/emojis/760568194963341312.gif?v=1")
			.addField("__**ZWERYFIKOWANA**__ przez:", `\`${message.author.tag}\``)
			.addField("__**DODANA**__ pod numer", `\`${nextNumber}\``)
			.setColor("#21FF01")
			client.channels.cache.get(client.config.statusChannel).send(verifiedEmbed)
			channelFromDiscord.send(verifiedEmbed)
		client.users.cache.get(toVerifyObject.memberId).send(verifiedEmbed)


	}

}
