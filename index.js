// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		if (!command) return;
	
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	} else if (interaction.isSelectMenu()) {
		const roleId = {
			democratic: "950608716540026880",
			ppp: "950609078621724692",
			justice: "950648176073932811",
			nrparty: "950648370635083826"
		}

		const addEmbed = new MessageEmbed()
			.setColor('#ffffff')
			.setTitle(':white_check_mark: 추가 완료')
			.setDescription(`성공적으로 역할이 추가되었습니다.`);

		const removeEmbed = new MessageEmbed()
			.setColor('#ffffff')
			.setTitle(':negative_squared_cross_mark: 제거 완료')
			.setDescription(`성공적으로 역할이 제거되었습니다.`);

		const member = interaction.member;
		if (member.roles.cache.some(r => r.id === roleSelect(roleId, interaction))) {
			member.guild.roles.fetch(roleSelect(roleId, interaction))
			.then(role => member.roles.remove(role))
			.catch(console.error);
			await interaction.reply({ embeds: [removeEmbed], ephemeral: true });
		} else {
			member.guild.roles.fetch(roleSelect(roleId, interaction))
			.then(role => member.roles.add(role))
			.catch(console.error);
			await interaction.reply({ embeds: [addEmbed], ephemeral: true });
		}
	} else return;
});

function roleSelect(roleId, { values }) {
	switch(values[0]) {
		case "democratic":
			return roleId.democratic;
		case "ppp":
			return roleId.ppp;
		case "justice":
			return roleId.justice;
		case "nrparty":
			return roleId.nrparty;
		default:
			console.log('error');
			return;
	}
}

// Login to Discord with your client's token
client.login(token);