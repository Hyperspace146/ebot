const { Events } = require('discord.js');

// Set up listener to for all messages
module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        wordsWithE = 0;
        if (interaction.content.includes('e') || interaction.content.includes('E')) {
            wordsWithE++;
        }
        // for (var token in tokens) {
        //     if (token.includes("e")) {
        //         wordsWithE++;
        //     }
        // }

        console.log(wordsWithE);

        await interaction.client.database.increaseECounter(interaction.author.username, wordsWithE);
	},
};