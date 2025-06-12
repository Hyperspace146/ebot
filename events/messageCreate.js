const { Events } = require('discord.js');

// Set up listener to for all messages
module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        var numWordsWithE = 0;
    
        var tokens = interaction.content.split(" ");
        for (var token of tokens) {
            if (token.includes("e")) {
                numWordsWithE++;
            }
        }

        await interaction.client.database.increaseECounter(interaction.author.username, numWordsWithE);
	},
};