const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

const questionEmbed = new MessageEmbed()
    .setColor('#ffffff')
    .setTitle('๐จ ์ 20๋ ๋ํต๋ น์ ๊ฑฐ')
    .setDescription('๊ทํ๊ป์๋ ์ด๋ฒ ๋ํต๋ น ์ ๊ฑฐ์์ ์ด๋ค ํ๋ณด์๊ฒ ํฌํํ๊ฑฐ๋ ํฌํํ์ค ์์ ์ด์ญ๋๊น?\n์๋ ๋ฉ๋ด ์ค ์ ํํด ์ฃผ์๊ธฐ ๋ฐ๋๋๋ค.\n\n์ฌ๋ก ์กฐ์ฌ ์ง์ง์จ ์์ **4์ ๋ด ํ๋ณด**(์ฌํดํ๋ณด ์ ์ธ)๋ง ์ ํ์ด ๊ฐ๋ฅํฉ๋๋ค.')
    .setImage('https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202202/20/c5f7357b-30c1-47d8-b100-fde94fb8f295.jpg')

const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('์ ํํ์ง ์์')
            .addOptions([
                {
                    label: '๊ธฐํธ 1๋ฒ ๋๋ถ์ด๋ฏผ์ฃผ๋น ์ด์ฌ๋ช',
                    value: 'democratic',
                    emoji: ':democratic:950642227586138153'
                },
                {
                    label: '๊ธฐํธ 2๋ฒ ๊ตญ๋ฏผ์ํ ์ค์์ด',
                    value: 'ppp',
                    emoji: ':ppp:950642227691012196'
                },
                {
                    label: '๊ธฐํธ 3๋ฒ ์ ์๋น ์ฌ์์ ',
                    value: 'justice',
                    emoji: ':justice:950643086978076712'
                },
                {
                    label: '๊ธฐํธ 6๋ฒ ๊ตญ๊ฐํ๋ช๋น ํ๊ฒฝ์',
                    value: 'nrparty',
                    emoji: ':nrparty:950644181360058379'
                },
            ]),
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('ํฌํ์ ์ฐธ์ฌํ์ฌ ์ญํ ์ ๋ณ๊ฒฝํด ๋ณด์ธ์!'),
	async execute(interaction) {
		await interaction.reply({ embeds: [questionEmbed], ephemeral: true, components: [row] });
	},
};