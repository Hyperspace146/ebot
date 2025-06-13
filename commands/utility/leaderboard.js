const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('checks e leaderboard')
        .addIntegerOption(option => 
            option.setName('length')
                .setDescription('leaderboard length')
                .setRequired(false)),
	async execute(interaction) {
        var leaderboardLength = interaction.options.getInteger('length');
        leaderboardLength = leaderboardLength ? leaderboardLength : 3;

        const leaderboard = interaction.client.database.getELeaderboard(leaderboardLength);

        // Convert leaderboard 2D array into string
        var leaderboardString = "";
        for (let i = 0; i < leaderboard.length; i++) {
            leaderboardString += `${i + 1}. ${leaderboard[i][0]}: ${leaderboard[i][1]}\n`
        }

		await interaction.reply(leaderboardString);
	},
};