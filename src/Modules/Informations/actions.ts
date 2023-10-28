import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ToolClient, capitalize } from "../../Library";
import { findServer } from "../../Models/member";
import { find, edit } from "../../Models/member";
import { EMBED_INFO, FOOTER, EMOJIS } from "../../config";

const Logger = require("../../Library/logger");


export async function updateClassement(client: ToolClient, interaction: ButtonInteraction) {

    const memberServerConfig: any = await findServer(interaction.guild!.id);
    let memberConfig: any = await find(interaction.guild!.id, interaction.user.id)
    let i = 0;

    const date = (Date.now()) / 1000;
    const timeStamp = date.toString().split('.')[0];


    const classementCd = 60000; // 1 minutes
    let classementLast = await memberConfig.cooldowns.classement;
    let timeClassementCd = classementCd - (Date.now() - classementLast);

    if (classementLast !== null && classementCd - (Date.now() - classementLast) > 0) {
        return interaction.replyErrorMessage(client, `**Merci de patienter  : \`${Math.floor(timeClassementCd / (1000 * 60) % 60)}\` minute(s) \`${Math.floor(timeClassementCd / (1000) % 60)}\` seconde(s) pour re actualiser.**`, true);
    }

    memberConfig.cooldowns.classement = Date.now();
    await edit(interaction.guild!.id, interaction.user.id, memberConfig)


    let button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("classement-button")
                .setEmoji(EMOJIS.refreshclassement)
                .setLabel("Actualiser le classement")
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setTitle(`Classement C.T.F`)
        .setDescription(`**Les membres sont classés par nombre de flags validé, du plus grand au plus petit.**\n----------------------`)
        .setThumbnail('https://tool-labs.com/classement1.png')
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL({ extension: "png" }) })
    const sortedClassement = memberServerConfig.sort((a: any, b: any) =>
        a.challenge.flags.steganographie.length + a.challenge.flags.crackingReverse.length + a.challenge.flags.osint.length + a.challenge.flags.webClient.length + a.challenge.flags.misc.length
            + a.challenge.flags.webServer.length + a.challenge.flags.realiste.length + a.challenge.flags.forensic.length + a.challenge.flags.machine.length < b.challenge.flags.steganographie.length
            + b.challenge.flags.crackingReverse.length + b.challenge.flags.osint.length + b.challenge.flags.webClient.length + b.challenge.flags.misc.length + b.challenge.flags.webServer.length
            + b.challenge.flags.realiste.length + b.challenge.flags.forensic.length + b.challenge.flags.machine.length ? 1 : -1
    );
    for (const e of sortedClassement.splice(0, 10)) {

        let member = await interaction.guild?.members.fetch(e.userId)!;
        const emojiArray = ["🥇", "🥈", "🥉"];

        memberConfig = await find(interaction.guild!.id, member.id)

        const flags = memberConfig.challenge.flags;
        const flagsTotal = flags.steganographie.length + flags.crackingReverse.length + flags.osint.length + flags.webClient.length + flags.misc.length + flags.webServer.length + flags.realiste.length + flags.forensic.length + flags.machine.length

        const flagTop = [
            { name: 'steganographie', data: flags.steganographie },
            { name: 'crackingReverse', data: flags.crackingReverse },
            { name: 'osint', data: flags.osint },
            { name: 'webClient', data: flags.webClient },
            { name: 'misc', data: flags.misc },
            { name: 'webServer', data: flags.webServer },
            { name: 'realiste', data: flags.realiste },
            { name: 'forensic', data: flags.forensic },
            { name: 'machine', data: flags.machine },
        ];

        flagTop.sort((a, b) => b.data - a.data);

        const valueFlags = `Nombre de Flags: ${flagsTotal}`
        const valueCategory = `Nombre de Flags: ${flagsTotal}\nCatégorie favorite : **${capitalize(flagTop[0].name)}**`

        if (i < 3) {
            embed.addFields({ name: `${emojiArray[i]}${member.displayName}`, value: flagsTotal.length > 0 ? valueCategory : valueFlags});
        } else {
            embed.addFields({ name: `🚩 ${member.displayName}`, value: flagsTotal.length > 0 ? valueCategory : valueFlags});
        }

    }

    embed.addFields({ name: `\u200b`, value: `Dernire actualisation : <t:${timeStamp}:R>` })
    return interaction.update({ embeds: [embed], components: [button] })

}

export async function candidatureModal(client: ToolClient, interaction: ButtonInteraction) {

    const modalSuggestion: any = new ModalBuilder()
        .setCustomId('candidature-modal')
        .setTitle('Menu de candidature');

    const descriptionWeb = new TextInputBuilder()
        .setCustomId('descriptionWeb')
        .setLabel("Description de vous")
        .setPlaceholder('Décrivez-vous sans runier votre OPSEC')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(50)
        .setRequired(true);

    const descriptionCompt = new TextInputBuilder()
        .setCustomId('descriptionCompt')
        .setLabel("Description de vos compétences")
        .setPlaceholder('Décriver vos compétences en tant que modérateur et aussi en informatique')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(50)
        .setRequired(true);

    const age = new TextInputBuilder()
        .setCustomId('age')
        .setLabel("ÂGE")
        .setPlaceholder('Renseigner votre âge')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(2)
        .setRequired(true);

    const descriptionWhy = new TextInputBuilder()
        .setCustomId('descriptionWhy')
        .setLabel("Pourquoi vous et pas un autre ?")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    const descriptionRow = new ActionRowBuilder().addComponents(descriptionWeb);
    const descriptionCompRow = new ActionRowBuilder().addComponents(descriptionCompt);
    const ageRow = new ActionRowBuilder().addComponents(age);
    const whyRow = new ActionRowBuilder().addComponents(descriptionWhy);


    modalSuggestion.addComponents(descriptionRow, descriptionCompRow, ageRow, whyRow);

    await interaction.showModal(modalSuggestion);

    Logger.button(`The ${interaction.customId} button was used by ${interaction.user.username} on the ${interaction.guild?.name} server.`);
}

export async function missionModal(client: ToolClient, interaction: ButtonInteraction) {

    const modalSuggestion: any = new ModalBuilder()
        .setCustomId('mission-modal')
        .setTitle('Menu de Mission');

    const titleMission = new TextInputBuilder()
        .setCustomId('titleMission')
        .setLabel("Titre de la mission")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const descriptionMission = new TextInputBuilder()
        .setCustomId('descriptionMission')
        .setLabel("Description de la mission")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(50)
        .setRequired(true);

    const price = new TextInputBuilder()
        .setCustomId('price')
        .setLabel("Prix")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);


    const titleRow = new ActionRowBuilder().addComponents(titleMission);
    const descriptionRow = new ActionRowBuilder().addComponents(descriptionMission);
    const priceRow = new ActionRowBuilder().addComponents(price);


    modalSuggestion.addComponents(titleRow, descriptionRow, priceRow);

    await interaction.showModal(modalSuggestion);

    Logger.button(`The ${interaction.customId} button was used by ${interaction.user.username} on the ${interaction.guild?.name} server.`);
}