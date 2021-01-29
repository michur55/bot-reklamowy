const { Client, Collection } = require("discord.js");
const client = new Client();
const { token } = require("./config.json");


["aliases", "commands"].forEach(collection => client[collection] = new Collection());
["commands-handler", "events-handler", "functions-handler"].forEach(handler => require(`./client-utils/handlers/${handler}`)(client));

client.config = require("./config.json");
client.login(token);