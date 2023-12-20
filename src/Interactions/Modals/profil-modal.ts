import { ModalSubmitInteraction } from "discord.js";
import { ToolClient } from "../../Library";
import { find, edit } from "../../Models/member";

export default async function (client: ToolClient, interaction: ModalSubmitInteraction) {

    const memberConfig: any = await find(interaction.guild!.id, interaction.user.id);
    const memberProfil = memberConfig.profil;

    const color = interaction.fields.getTextInputValue('color');
    const linkWeb = interaction.fields.getTextInputValue('link-web');
    const biographie = interaction.fields.getTextInputValue('biographie');

    if (color && !color.startsWith('#')) return interaction.replyErrorMessage(client, `**Merci d'indiquer une couleur valide** ! [Click here](https://htmlcolorcodes.com/fr/)`, true);
    if (linkWeb && !linkWeb.includes('http')) return interaction.replyErrorMessage(client, `**Merci d'indiquer un lien valide** !`, true);

    memberProfil.color = color ? color : memberProfil.color;
    memberProfil.siteWeb = linkWeb ? linkWeb : memberProfil.siteWeb;
    memberProfil.biographie = biographie ? biographie : memberProfil.biographie;

    await edit(interaction.guild!.id, interaction.user.id, memberConfig);

    if (!color && !linkWeb && !biographie) return interaction.replyInfoMessage(client, `**Vous n'avez pas modifié votre profil**`, true);
    else interaction.replySuccessMessage(client, `**Votre profil a bien été modifié**`, true);


}

export const modal = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3)
    }
}