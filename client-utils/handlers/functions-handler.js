const { readdirSync } = require('fs');
const loadedfunc = [];
module.exports = (client) => {

	const functions = readdirSync(`./client-utils/functions/`).filter(d => d.endsWith(`.js`));
	for (const file of functions) {
		require(`../../client-utils/functions/${file}`);
		loadedfunc.push(file.split(`.`)[0]);
	}

	console.log(`function-handler  | Successful Loaded: ${loadedfunc.join(", ")}`);

};
