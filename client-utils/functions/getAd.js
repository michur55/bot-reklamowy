

    async function getByNumber (number) {
        const output = await adsdb.prepare("SELECT * FROM ads WHERE number = ?").get(number);
        if(!output) return false;
        return output;

    }

    async function getById (id) {
        const output = await adsdb.prepare("SELECT * FROM ads WHERE guildId = ?").get(id);
        if(!output) return false;
        return output;
    }
    async function toVerifygetById (id) {
        const output = await adsdb.prepare("SELECT * FROM toVerify WHERE guildId = ?").get(id);
        if(!output) return false;
        return output;
    }
    async function toVerifygetByNumber (id) {
        const output = await adsdb.prepare("SELECT * FROM toVerify WHERE guildId = ?").get(id);
        if(!output) return false;
        return output;
    }

    async function getChannel (id) {
        const output = await adsdb.prepare("SELECT adsChannel FROM ads WHERE guildId = ?").get(id);
        if(!output) return false;
        return output.adsChannel;
    }
   function resetNumbers () {
        numbersdb.set('toAdd', 1)
       return "Gotowe!"
    }


    global.getById = getById;
    global.getByNumber = getByNumber;
    global.toVerifygetById = toVerifygetById;
    global.toVerifygetByNumber = toVerifygetByNumber;
    global.getChannel = getChannel;
    global.resetNumbers = resetNumbers;

