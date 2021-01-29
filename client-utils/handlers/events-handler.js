const { readdirSync } = require('fs');
const loadedevents = [];
module.exports = (client) => {
        const events = readdirSync(`./events/`).filter(d => d.endsWith(`.js`));
        for (const file of events) {
            const evt = require(`../../events/${file}`);
            const event = file.split(`.`)[0];
            client.on(evt.name, evt.run.bind(null, client));
           loadedevents.push(`${event}`);
        }

    console.log(`events-handler  | Successful Loaded: ${loadedevents.join(", ")}`);
}
