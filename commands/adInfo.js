const {MessageEmbed} = require("discord.js");
module.exports = {
	name: "reklamainfo",
	aliases: ["info"],

	run: async (client, message, args) => {

		if(!args[0]) {
			let info;
			const ad = await getById(message.guild.id);
			const embed = new MessageEmbed()
			if(!ad) {

				info = {
					status: "<a:nie:784357919512068136> **NIE** zweryfikowana"
				}
				if(await toVerifygetById(message.guild.id)) info.status = "<a:timer:784695841931788298> W trakcie **WERFYIKACJI**"
			} else {
				info = {
				status: "<a:tak:784529017516326913> **ZWERYFIKOWANA**",
				}
				embed.addField("<a:anonimowy_link:785896715165106256> __**NUMER**__ w kolejce:", ad.number || "\`Brak Informacji\`")
					.addField("<a:dev:785066213515460608> Została __**WYSŁANA**__", ad.sends > 1 ? `\`${`${ad.sends}\`` || "\`0\`"} razy` : `${ad.sends || "\`0\`"} raz` || "Brak Informacji")

				}


				embed.setAuthor("INFORMACJE NA TEMAT SERWERA " + message.guild.name.toUpperCase(), client.user.displayAvatarURL({dynamic: true}))
				.setColor("BLACK")
				.setThumbnail(message.guild.iconURL({dynamic: true}))
					.addField("`●` __**STATUS**__ reklamy", info.status)
					.setDescription(ad.ad || "\`»\` **BRAK REKLAMY**")
				message.channel.send(embed)

		}

		if(args[0] && client.config.access.includes(message.author.id)) {



			let ad = await getByNumber(`${args[0]}.0`)
				|| await getByNumber(args[0])
				|| await getByNumber(Number(args[0]))
				|| await getById(args[0])
				|| await toVerifygetById(message.guild.id)
				|| await toVerifygetByNumber(`${args[0]}`)
				|| await toVerifygetByNumber(Number(args[0]))
				|| await toVerifygetByNumber(args[0]);
			if(!ad) return message.reply("Nie znaleziono!")
			const guild = client.guilds.cache.get(ad.guildId)
			if(!guild) return message.reply("Nie znaleziono!")
			const embed = new MessageEmbed()
				.setAuthor("Informacje o serwerze " + guild.name)
				.setDescription(ad.ad || "Brak Reklamy")
				.addField("Numer:", ad.number || "Brak Informacji")
				.addField("Wysłano:", ad.sends > 1 ? `${ad.sends} razy` : `${ad.sends} raz` || "Brak informacji")
				.addField("Zaproszenie", `https://discord.gg/${ad.invite}`)
				.setColor("RANDOM")
				.setThumbnail(guild.iconURL({dynamic: true}))
				message.channel.send(embed)
		}


	}
}
