const { Events, PermissionsBitField  } = require('discord.js');

const eOnlyChannels = ["e", "test"];
const atToken = new RegExp('<@[0-9]+>');

// Set up listener to for all messages
module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        // Ignore messages from bots
        if (interaction.author.bot) return;

        // Count number of words with e, then add to counter
        var numWordsWithE = 0;
        var tokens = interaction.content.split(/\s+/);
        for (var token of tokens) {
            if (token.includes("e") || token.includes("E")) {
                numWordsWithE++;
            } else if (!atToken.test(token) && eOnlyChannels.includes(interaction.channel.name)) {
                // If word doesn't contain e or E, time out the user
                const user = await interaction.guild.members.fetch(interaction.author.id);
                console.log(`timeout ${user.user.globalName} for word ${token}`);
                await user.timeout(100_000, "hehe");
                return;
            }
        }
        interaction.client.database.increaseECounter(interaction.author.username, numWordsWithE);
	},
};