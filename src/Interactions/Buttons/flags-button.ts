import { EmbedBuilder, ButtonInteraction } from "discord.js";
import { ToolClient } from "../../Library";
import { EMBED_GENERAL, FOOTER_CTF } from "../../config";
import { find } from "../../Models/member";


export default async function (client: ToolClient, interaction: ButtonInteraction) {
    const memberConfig: any = await find(interaction.guild!.id, interaction.user.id);
    const flags = memberConfig.challenge.flags;

    const flagsTotal = flags.steganographie.length + flags.crackingReverse.length + flags.osint.length + flags.webClient.length +flags.misc.length
    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(`🚩 **Total de flags :** \`${flagsTotal}\``)
        .setThumbnail('https://ctftime.org/media/events/LOGO_CTF_nohand.png')
        .addFields(
            {
                name: `Stéganographie (${flags.steganographie.length})`,
                value: `${flags.steganographie.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.steganographie.join('\n')}`
            },
            {
                name: `Cracking & Reverse (${flags.crackingReverse.length})`,
                value: `${flags.crackingReverse.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.crackingReverse.join('\n')}`
            },
            {
                name: `O.S.I.N.T (${flags.osint.length})`,
                value: `${flags.osint.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.osint.join('\n')}`
            },
            {
                name: `Web Client (${flags.webClient.length})`,
                value: `${flags.webClient.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.webClient.join('\n')}`
            },
            {
                name: `Web Client (${flags.webServer.length})`,
                value: `${flags.webServer.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.webServer.join('\n')}`
            },
            {
                name: `M.I.S.C (${flags.misc.length})`,
                value: `${flags.misc.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.misc.join('\n')}`
            },
            {
                name: `Cryptographie (${flags.realiste.length})`,
                value: `${flags.realiste.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.realiste.join('\n')}`
            },
            {
                name: `Machine (${flags.machine.length})`,
                value: `${flags.machine.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.machine.join('\n')}`
            }
        )
        .setTimestamp()
        .setFooter({ text: FOOTER_CTF, iconURL: client.user?.displayAvatarURL() })

    return interaction.reply({embeds: [embed], ephemeral: true})
}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    }
}