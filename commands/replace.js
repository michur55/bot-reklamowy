const {MessageEmbed} = require("discord.js");
module.exports = {
	name: "zamien",
	aliases: ["podmien", "podmień", "zamień"],

	run: async (client, message, args) => {
		if (message.channel.id !== client.config.verifyChannel) return;
		if (!args[0]) {
			return error(message.channel, "Podaj id serwera ktory chcesz podmienic!");
		}
		if (!args[1]) {
			return error(message.channel, "Podaj numerek do podmienienia!");
		}

		const adOne = await toVerifygetById(`${args[0]}`) || await toVerifygetById(args[0]) || await toVerifygetById(Number(args[0]));
		if(!adOne) {
			return error(message.channel, "Nie znaleziono reklamy o podanym id");
		}

		let number = Number(args[1])
		const adTwo = await getByNumber(`${args[1]}`)
		|| await getByNumber(args[1]) || await getByNumber(number)
		if(!adTwo) {
			return error(message.channel, "Nie znaleziono reklamy o podanym numerze");
		}
		const adCheck = await getById(adOne.guildId);
		if (!adCheck) {
			adsdb.prepare("INSERT INTO ads (guildId, ad, invite, sends, 'number') VALUES (?, ?, ?, ?, ?)").run(args[0], adOne.ad, adOne.invite, 0, number);
		} else {
			adsdb.prepare("UPDATE ads SET ad = ?, invite = ?, 'number' = ?, sends = 0 WHERE guildId = ?").run(adOne.ad, adOne.invite, number, args[0]);
		}
		adsdb.prepare("DELETE FROM toVerify WHERE guildId = ?").run(adOne.guildId);
		message.reply("Podmieniono reklamy!")
	}
}
