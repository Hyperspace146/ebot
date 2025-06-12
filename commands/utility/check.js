const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('checks personal e counter'),
	async execute(interaction) {
		await interaction.reply(String(interaction.client.database.getECounter(interaction.user.username)));
	},
};