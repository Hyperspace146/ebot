const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('gamble')
        .addIntegerOption(option => 
            option.setName('wager')
                .setDescription('number of thine e betting')
                .setRequired(true)
                .setMinValue(1))
        .addStringOption(option => 
            option.setName('rps')
                .setDescription('rps option')
                .setRequired(true)
                .addChoices(
                    { name: 'rock', value: '0' },
                    { name: 'paper', value: '1' },
                    { name: 'scissors', value: '2' }
                )),
	async execute(interaction) {
        const username = interaction.user.username;
        const database = interaction.client.database;

        var wager = interaction.options.getInteger('wager');
        if (database.getECounter(username) === 0) {
            await interaction.reply(`BALANCE EMPTY\nRESUME HARVESTING, PEASANT`)
            return;
        } else if (wager > database.getECounter(username)) {
            wager = database.getECounter(username);
            await interaction.channel.send(`wager too high, lowered to current balance: ${wager}`)
        }

        const rpsOption = parseInt(interaction.options.getString('rps'));
        const cpuRpsOption = Math.floor(Math.random() * 3);  // random int of 0, 1, 2

        if (rpsOption === cpuRpsOption) {
            await interaction.reply("tie game");
        } else if (rpsOption === cpuRpsOption + 1 || (rpsOption === 0 && cpuRpsOption === 2)) {
            const newBalance = interaction.client.database.increaseECounter(interaction.user.username, wager);
            await interaction.reply(`nice, ${interaction.user.username} earns ${wager}, new balance: ${newBalance}`);
        } else {
            const newBalance = interaction.client.database.decreaseECounter(interaction.user.username, wager);
            await interaction.reply(`loser imbecile simpleton dunce ${interaction.user.username} loses ${wager}, new balance: ${newBalance}`);
        }
	},
};