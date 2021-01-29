const { readdirSync } = require(`fs`);
const a = [];
module.exports = async (client) => {
    const load = dirs => {
        if(dirs) dirs = dirs+"/"
        const commands = readdirSync(`./commands/${dirs}`).filter(d => d.endsWith(`.js`));
        for(let file of commands) {

            let pull = require(`../../commands/${dirs}${file}`);
            client.commands.set(pull.name, pull);
            client.commands.get(pull.name).dir = `./${file}`
            if (pull.aliases) pull.aliases.forEach(a => client.aliases.set(a, pull.name));
            a.push(`${pull.name}`)

        }
    };
    await load('')
    console.log(`commands-handler | Successful Loaded: ${a.join(", ")}`)
}
