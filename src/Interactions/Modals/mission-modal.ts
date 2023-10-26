import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { ToolClient } from "../../Library";
import { EMBED_INFO, FOOTER } from "../../config";
import { find } from "../../Models/server";

export default async function (client: ToolClient, interaction: ModalSubmitInteraction) {

    const serverConfig: any = await find(interaction.guild!.id);
    const member = await interaction.guild!.members.fetch(interaction.user.id)

    const titleMission = interaction.fields.getTextInputValue('titleMission');
    const descriptionMission = interaction.fields.getTextInputValue('descriptionMission');
    const priceMission = interaction.fields.getTextInputValue('price');

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setAuthor({ name: "Tool'Labs™ Mission Systeme", iconURL: `${interaction.guild!.iconURL()}` })
        .setTitle(`Mission proposé par : ${member.displayName}`)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .addFields(
            {
                name: "📑 Mission :",
                value: titleMission,
                inline: true
            },
            {
                name: "💰 Rémunération :",
                value: `\`${priceMission}\``,
                inline: true
            },
            {
                name: "📃 Description :",
                value: descriptionMission,
                inline: false
            },
        )
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() })

    await interaction.reply({ content: "**Votre mission a été envoyé avec succès !**", ephemeral: true })

    const channel: any = await interaction.guild!.channels.cache.get(serverConfig.channels.mission)!;
    const message = await channel.send({embeds: [embed]})

    await message.startThread({
        name: `Mission de ${member.displayName}`});


}

export const modal = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    }
}