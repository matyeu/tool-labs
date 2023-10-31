import { ApplicationCommandOptionType, AttachmentBuilder, CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { ToolClient } from "../../Library";
import { find  } from "../../Models/member";
import { EMBED_GENERAL, FOOTER } from "../../config";
import Canvas from "canvas";

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const memberOption: any = interaction.options.get('utilisateur', false);
    const member = await interaction.guild!.members.fetch(memberOption ? memberOption.value : interaction.user);

    if (member.user.bot) return interaction.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`, true)
    if (!member) return interaction.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`, true);

    const memberConfig: any = await find(member.guild!.id, member.id);

    return interaction.replyInfoMessage(client, `**${member.id === interaction.user.id ? "Vous possédez" : `${member.displayName}`} actuellement \`${memberConfig.shop.amount}\` points**`, false)

}

export async function command(client: ToolClient, message: Message, args: any) {

    const memberOption = args[0]
    const member = await message.guild!.members.fetch(memberOption ? memberOption.replace('<', '').replace('>', '').replace('@', '') : message.author);

    if (member.user.bot) return message.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`)
    if (!member) return message.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`);

    const memberConfig: any = await find(member.guild!.id, member.id);

    return message.replyInfoMessage(client, `**${member.id === message.author.id ? "Vous possédez" : `${member.displayName}`} actuellement \`${memberConfig.shop.amount}\` points**`)

}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Voir le solde d'un membre",
        category: "General",
        permissions: ["SendMessages"],
        options: [
            {
                name: "utilisateur",
                description: "Pour qui souhaitez-vous voir le solde ?",
                type: ApplicationCommandOptionType.User
            }
        ]
    }
}

