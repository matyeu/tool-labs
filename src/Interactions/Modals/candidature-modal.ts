import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { ToolClient, tcheckNumber } from "../../Library";
import { EMBED_INFO, FOOTER } from "../../config";
import { find } from "../../Models/server";

export default async function (client: ToolClient, interaction: ModalSubmitInteraction) {

    const serverConfig: any = await find(interaction.guild!.id);
    const member = await interaction.guild!.members.fetch(interaction.user.id)

    const descriptionWeb = interaction.fields.getTextInputValue('descriptionWeb');
    const descriptionCompt = interaction.fields.getTextInputValue('descriptionCompt');
    const age = interaction.fields.getTextInputValue('age');
    const descriptionWhy = interaction.fields.getTextInputValue('descriptionWhy');

    if (!tcheckNumber(age)) return interaction.reply({content: "**Merci d'indiquer un âge valide !**", ephemeral: true})

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setAuthor({ name: "Tool'Labs™ Candidature Systeme", iconURL: `${interaction.guild!.iconURL()}` })
        .setThumbnail(`${interaction.user.displayAvatarURL()}`)
        .setDescription(`Membre Information :
${interaction.user} (\`${interaction.user.id}\`)

\`Question 1 :\` : **Description de vous**
\`Réponse :\` ${descriptionWeb}

\`Question 2 :\` : **Description de vos compétences**
\`Réponse :\` ${descriptionCompt}

\`Question 3 :\` : **Âge**
\`Réponse :\` ${age}

\`Question 4 :\` : **Pourquoi lui et pas un autre ?**
\`Réponse :\` ${descriptionWhy ? descriptionWhy : `\`Champ non rempli par ${member.displayName}\``}`)
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() })

    await interaction.reply({ content: "**Votre candidature a été envoyée avec succès !**", ephemeral: true })
    return client.getChannel(interaction.guild!, serverConfig.channels.staff, { embeds: [embed] })

}

export const modal = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    }
}