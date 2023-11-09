import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { ToolClient } from "../../Library";
import { find  } from "../../Models/member";
import { EMBED_INFO, LINK_DASHBOARD } from "../../config";

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const memberOption: any = interaction.options.get('utilisateur', false);
    const member = await interaction.guild!.members.fetch(memberOption ? memberOption.value : interaction.user);

    if (member.user.bot) return interaction.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`, true)
    if (!member) return interaction.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`, true);

    const memberConfig: any = await find(member.guild!.id, member.id);

    const embed = new EmbedBuilder()
    .setColor(EMBED_INFO)
    .setFooter({
  text: 'Pourquoi ne pas dépenser vos jetons ?',
})
    .setThumbnail("https://tool-labs.com/port3.png")
    .setDescription( `**${member.id === interaction.user.id ? "Vous possédez" : `${member.displayName}`} actuellement \`${memberConfig.shop.amount}\`  point${memberConfig.shop.amount > 1 ? "s" : ""}**`);

    const button = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setLabel("Accéder à la boutique")
            .setURL(LINK_DASHBOARD)
            .setStyle(ButtonStyle.Link)
    );

   return interaction.reply({embeds: [embed], components: [button], ephemeral: true});


}

export async function command(client: ToolClient, message: Message, args: any) {

    const memberOption = args[0]
    const member = await message.guild!.members.fetch(memberOption ? memberOption.replace('<', '').replace('>', '').replace('@', '') : message.author);

    if (member.user.bot) return message.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`)
    if (!member) return message.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`);

    const memberConfig: any = await find(member.guild!.id, member.id);

    const embed = new EmbedBuilder()
    .setColor(EMBED_INFO)
    .setFooter({
  text: 'Pourquoi ne pas dépenser vos jetons ?',
})
    .setThumbnail("https://tool-labs.com/port3.png")
    .setDescription( `**${member.id === message.author.id ? "Vous possédez" : `${member.displayName}`} actuellement \`${memberConfig.shop.amount}\`  pièces${memberConfig.shop.amount > 1 ? "s" : ""}**`);
    
    const button = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setLabel("Accéder à la boutique")
            .setURL(LINK_DASHBOARD)
            .setStyle(ButtonStyle.Link)
    );

   return message.channel.send({embeds: [embed], components: [button]});
}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Voir le solde d'un membre",
        category: "General",
        permissions: ["SendMessages"],
        
    }
}