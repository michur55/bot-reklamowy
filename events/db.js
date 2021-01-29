global.adsdb = require("better-sqlite3")("./database/guilds.db");
global.numbersdb = require("../client-utils/database/numbers");
module.exports = {
	name : "ready",
	run : async (client) => {
		adsdb.prepare("CREATE TABLE IF NOT EXISTS ads (guildId, ad, 'number', adsChannel, invite, sends, prefix)").run();
		adsdb.prepare("CREATE TABLE IF NOT EXISTS toVerify (guildId, ad, ads Channel, invite, waiting, memberId)").run();
		adsdb.prepare("CREATE TABLE IF NOT EXISTS customlink (guildId, link, invite, description, background)").run();
		if(!numbersdb.get("toAdd")) {
			numbersdb.set("toAdd", 1);
		}
		if(!numbersdb.get("adsQueue")) {
			numbersdb.set("adsQueue", 1);
		}


	}
};
