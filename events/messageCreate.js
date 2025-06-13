const { Events, PermissionsBitField  } = require('discord.js');

const eOnlyChannels = ["e", "test"];
const atToken = new RegExp('<@[0-9]+>');
const timeoutLength = 100
const penaltyPercentage = 0.5;

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

                // Attempting to timeout the server owner results in "Missing Permissions" error response from Discord
                if (user.id !== interaction.guild.ownerId) {
                    await user.timeout(timeoutLength * 1000, "hehe");
                }

                // Penalize percentage of e wealth
                const database = interaction.client.database;
                const oldBalance = database.getECounter(interaction.author.username);
                const ePenalty = Math.max(1, Math.round(oldBalance * penaltyPercentage));
                const newBalance = Math.max(0, oldBalance - ePenalty);
                database.setECounter(interaction.author.username, newBalance);

                await interaction.channel.send(`# ILLEGAL MESSAGE: ${interaction.author.globalName} DETAINED IMMEDIATELY, PENALIZED ${ePenalty} E
                    \n>>> ~~${interaction.content}~~`)
                await interaction.delete();
                return;
            }
        }
        interaction.client.database.increaseECounter(interaction.author.username, numWordsWithE);
	},
};