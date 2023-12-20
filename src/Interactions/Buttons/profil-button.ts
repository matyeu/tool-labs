import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ToolClient } from "../../Library";
import { find } from "../../Models/member";

export default async function (client: ToolClient, interaction: ButtonInteraction) {

    if (interaction.customId.split(':')[1] !== interaction.user.id)
        return interaction.replyErrorMessage(client, "**Vous ne pouvez pas modifier le profil d'un autre utilisateur.**", true);

    const memberConfig: any = await find(interaction.guild!.id, interaction.user.id);
    const memberProfil = memberConfig.profil;

    const modalProfil: any = new ModalBuilder()
        .setCustomId('profil-modal')
        .setTitle("Modification du profil");

    const color = new TextInputBuilder()
        .setCustomId('color')
        .setLabel("Votre couleur")
        .setPlaceholder(memberProfil.color ? `Couleur actuellement affichée : ${memberProfil.color}` : "Veuillez mettre votre couleur")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    const linkWeb = new TextInputBuilder()
        .setCustomId('link-web')
        .setLabel("Votre site web")
        .setPlaceholder(memberProfil.siteWeb ? `Site actuellement affiché : ${memberProfil.siteWeb}` : "Veuillez mettre le lien de votre site web")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    const biographie = new TextInputBuilder()
        .setCustomId('biographie')
        .setLabel("Votre biographie")
        .setPlaceholder(memberProfil.biographie ? `Biographie actuellement affichée : ${memberProfil.biographie}` : "Veuillez mettre votre biographie")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    const colorRow = new ActionRowBuilder().addComponents(color);
    const linkRow = new ActionRowBuilder().addComponents(linkWeb);
    const biographieRow = new ActionRowBuilder().addComponents(biographie);

    modalProfil.addComponents(colorRow, linkRow, biographieRow);

    return interaction.showModal(modalProfil);
}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3)
    }
}