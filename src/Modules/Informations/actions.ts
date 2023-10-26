import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder } from "discord.js";
import { ToolClient } from "../../Library";
import { findServer } from "../../Models/member";
import { find, edit } from "../../Models/member";
import { EMBED_INFO, FOOTER } from "../../config";

const date = (Date.now()) / 1000;
const timeStamp = date.toString().split('.')[0];

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
                .setLabel("Actualiser le classement")
                .setStyle(ButtonStyle.Success)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setTitle(`Classement C.T.F`)
        .setDescription(`**Les membres sont classés par nombre de flags validé, du plus grand au plus petit.**\n----------------------`)
        .setThumbnail('https://tool-labs.com/classement1.png')
        .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL({extension: "png"})})
    const sortedClassement = memberServerConfig.sort((a: any, b: any) =>
        a.challenge.flags.steganographie.length + a.challenge.flags.crackingReverse.length + a.challenge.flags.osint.length + a.challenge.flags.webClient.length + a.challenge.flags.misc.length
            < b.challenge.flags.steganographie.length + b.challenge.flags.crackingReverse.length + b.challenge.flags.osint.length + b.challenge.flags.webClient.length + b.challenge.flags.misc.length ? 1 : -1
    );
    for (const e of sortedClassement.splice(0, 10)) {

        let member = await interaction.guild?.members.fetch(e.userId)!;
        const emojiArray = ["🥇", "🥈", "🥉"];

        memberConfig = await find(interaction.guild!.id, member.id)
        const flags = memberConfig.challenge.flags;
        const flagsTotal = flags.steganographie.length + flags.crackingReverse.length + flags.osint.length + flags.webClient.length + flags.misc.length

        if (i < 3) {
            embed.addFields({ name: `${emojiArray[i]}${member.displayName}`, value: `Nombre de Flags: ${flagsTotal}` });
        } else {
            embed.addFields({ name: `🚩 ${member.displayName}`, value: `Nombre de Flags: ${flagsTotal}` });
        }

    }
    
    embed.addFields({name: `\u200b`, value: `Dernire actualisation : <t:${timeStamp}:R>`})
    return interaction.update({embeds: [embed], components: [button]})

}