import { StringSelectMenuInteraction, EmbedBuilder } from "discord.js";
import { ToolClient } from "../../Library";
import { EMBED_GENERAL } from "../../config";
import { find, edit } from "../../Models/member";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, interaction: StringSelectMenuInteraction) {

    const memberConfig: any = await find(interaction.guild!.id, interaction.user.id);

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setImage("https://cdn.discordapp.com/attachments/1166027524506140692/1166027580336521237/selectBorder.png?ex=6548fece&is=653689ce&hm=766dda6294591951dca9548ee9f1445df78d953bc4405bbc637983a94e75171f&")

    switch (interaction.values[0]) {
        case 'steganographie-challenge-1':

            embed.setDescription("Trouvez le FLAG dans l'image et écrivez le dans le chat pour validé ce challenge")
                .setImage("https://tool-labs.com/steganographiediscordx.png")
                .setThumbnail("https://tool-labs.com/facile2.png");
            break;
        case 'steganographie-challenge-2': 
        embed.setDescription('test')
        break;
        case 'steganographie-challenge-3': break;
        case 'cracking-challenge-1': break;
        case 'cracking-challenge-2': break;
        case 'cracking-challenge-3': break;
        case 'cracking-challenge-3': break;
        case 'osint-challenge-1': break;
        case 'osint-challenge-2': break;
        case 'osint-challenge-3': break;
        case 'osint-challenge-3': break;
        case 'misc-challenge-1': break;
        case 'webclient-challenge-1': break;
        case 'webclient-challenge-2': break;
        case 'webclient-challenge-3': break;
        case 'webclient-challenge-4': break;
        case 'webclient-challenge-5': break;
        case 'webclient-challenge-6': break;
        case 'webclient-challenge-7': break;
        case 'webclient-challenge-8': break;
        case 'suspect-challenge-1': break;
        default: return interaction.followUp({content: `**Le topic \`${interaction.values[0]}\` est introuvable par le bo**`, ephemeral: true});
    }

    await interaction.update({content: null})


    const channel: any = client.channels.cache.get(interaction.channel!.id);
    const getCategory = await channel.messages.cache.get(memberConfig.challenge.lastCategoryMessageId)

    if (!getCategory) {
        await interaction.followUp({ embeds: [embed]}).then( async() => {
            memberConfig.challenge.lastCategoryMessageId = channel.lastMessageId
            await edit(interaction.guild!.id, interaction.user.id, memberConfig)
        })
        
    } else {
        getCategory.edit({ embeds: [embed]})
    }

}

export const select = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    }
}