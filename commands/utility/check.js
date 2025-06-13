const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('checks someone\'s e counter')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('the user to check')
                .setRequired(false)),
	async execute(interaction) {
        const target = interaction.options.getUser('target');
        var username = target ? target.username : interaction.user.username;
		await interaction.reply(username + ": " + String(interaction.client.database.getECounter(username)));
	},
};