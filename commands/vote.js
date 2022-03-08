const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

const questionEmbed = new MessageEmbed()
    .setColor('#ffffff')
    .setTitle('📨 제20대 대통령선거')
    .setDescription('귀하께서는 이번 대통령 선거에서 어떤 후보에게 투표하거나 투표하실 예정이십니까?\n아래 메뉴 중 선택해 주시기 바랍니다.\n\n여론조사 지지율 상위 **4위 내 후보**(사퇴후보 제외)만 선택이 가능합니다.')
    .setImage('https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202202/20/c5f7357b-30c1-47d8-b100-fde94fb8f295.jpg')

const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('선택하지 않음')
            .addOptions([
                {
                    label: '기호 1번 더불어민주당 이재명',
                    value: 'democratic',
                    emoji: ':democratic:950642227586138153'
                },
                {
                    label: '기호 2번 국민의힘 윤석열',
                    value: 'ppp',
                    emoji: ':ppp:950642227691012196'
                },
                {
                    label: '기호 3번 정의당 심상정',
                    value: 'justice',
                    emoji: ':justice:950643086978076712'
                },
                {
                    label: '기호 6번 국가혁명당 허경영',
                    value: 'nrparty',
                    emoji: ':nrparty:950644181360058379'
                },
            ]),
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('투표에 참여하여 역할을 변경해 보세요!'),
	async execute(interaction) {
		await interaction.reply({ embeds: [questionEmbed], ephemeral: true, components: [row] });
	},
};