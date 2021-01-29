module.exports = (client) => {
	process.on("error", err => {
		console.log(err);
	})
	client.on("disconnect", reason => {
		console.log(`Bot disconnected reason:\n${reason}`)
	})
}
