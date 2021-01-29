const { MessageEmbed } = require("discord.js");
module.exports = {
	name : "reklama",
	aliases : ["r"],

	run : async (client, message, args, prefix) => {

		if (!args[0]) return error(message.channel, "Podaj treść reklamy!");
		const waitingOutput = await adsdb.prepare("SELECT waiting FROM toVerify WHERE guildId = ?").get(message.guild.id)
		if(waitingOutput && waitingOutput.waiting === "true") {
			return error(message.channel, "Juz **wyslano** reklame do **werfikacji**")
		}

		const inviteRegExp = /(https?:\/\/)?(www\.)?(discord\.(gg)|discordapp\.com\/invite)\/[\w\-\._~:?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
		if(inviteRegExp.test(args.join(" ").replace(/\s+/g, ''))) {
			return error(message.channel, "Nie musisz **podawac linku** z zaproszeniem do **serwera**!")
		}
		if(args.join(" ").includes("discord.gg/")) {
			return error(message.channel, "Nie musisz **podawac linku** z zaproszeniem do **serwera**!")
		}
		if(args.join(" ").includes("@everyone") || args.join(" ").includes("@everyone")) {
			return error(message.channel, "W reklamie nie moze byc **wzmianek**")
		}
/*
		let invite;
		const guildInvites = await message.guild.fetchInvites();
		guildInvites.forEach(invite => {
			if (invite.expiresAt === null || invite.expiresAt === 0 && invite.inviter.id === client.user.id) {
				invite = invite;
				return;
			}
		})

		if (!invite) {*/
			invite = await message.channel.createInvite({
				maxAge : 0,
				maxUses : 0
			}).catch(() => {
				return error(messSage.channel, "Wygląda na to ze bot nie posiada permisji do stworzenia zaproszenia!")
			});
		
		const embed = new MessageEmbed()
			.setAuthor("WYSŁANO REKLAMĘ DO SPRAWDZENIA",   "https://cdn.discordapp.com/emojis/784695841931788298.gif?v=1")
			.setDescription("\`»\` Gdy zostanie **zaakceptowana** zostaniesz poinformowany")
			.setColor("E4FF8A")
			.setTimestamp()
			
		message.channel.send(embed)
		let ad = args.join(" ")
		ad = ad.replace(/scrafy.tk/g, ":poop:")
		const adCheck = await adsdb.prepare("SELECT * FROM toVerify WHERE guildId = ?").get(message.guild.id)
		if (!adCheck || adCheck === undefined) {
			adsdb.prepare("INSERT INTO toVerify (guildId, ad, invite, waiting, memberId) VALUES (?, ?, ?, ?, ?)").run(message.guild.id, ad, invite.code, "true", message.author.id);
		} else {
			adsdb.prepare("UPDATE toVerify SET ad = ?, invite = ?, waiting = ?, memberId = ? WHERE guildId = ?").run(ad, invite.code, "true", message.author.id, message.guild.id);

		}


		const verifyEmbed = new MessageEmbed()
			.setAuthor("Nowa REKLAMA do sprawdzenia", "https://cdn.discordapp.com/emojis/785072213950070784.gif?v=1", "https://markybot.tk")
			.setColor("000001")
			.addField("Serwer", `\`${message.guild.name};\` \`${message.guild.id}\``)
			.addField("**Zaproszenie**", `https://discord.gg/${invite.code}`)
			.addField("Wysłana przez", `\`${message.author.tag};\` \`${message.author.id}\``)
      		.setDescription(ad)
		client.channels.cache.get(client.config.verifyChannel).send(verifyEmbed)

	}
}
