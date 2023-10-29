import { ApplicationCommandOptionType, CommandInteraction, Message, Role } from "discord.js";
import { ToolClient } from "../../Library";
import { find } from "../../Models/server";

const Logger = require('../../Library/logger');

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const serverConfig: any = await find(interaction.guild!.id);

    const memberOption: any = interaction.options.get('utilisateur', false);
    const member = await interaction.guild!.members.fetch(memberOption ? memberOption.value : interaction.user);

    if (member.user.bot) return interaction.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`, true)
    if (!member) return interaction.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`, true);
    if (!member.moderatable) return interaction.replyErrorMessage(client, `**La commande n'est pas fonctionelle sur ${member}**`, true);

    const roles: Role[] = Array.from(member.roles.cache.values());

    roles.forEach(async (role: Role) => {
        await member.roles.remove(role).catch((err: any) => {
            if (err.message.match("Unknown Role")) return

            console.error(Logger.error(err))
        })
    });

    await member.roles.add(serverConfig.roles.suspect);
    return interaction.replySuccessMessage(client, `**${member} est devenu un suspect !**`, true);

}

export async function command(client: ToolClient, message: Message, args: any) {

    const serverConfig: any = await find(message.guild!.id);

    const memberOption: any = args[0];
    const member = await message.guild!.members.fetch(memberOption ? memberOption.value : message.author);

    if (member.user.bot) return message.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`)
    if (!member) return message.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`);
    if (!member.moderatable) return message.replyErrorMessage(client, `**La commande n'est pas fonctionelle sur ${member}**`);

    const roles: Role[] = Array.from(member.roles.cache.values());

    roles.forEach(async (role: Role) => {
        await member.roles.remove(role).catch((err: any) => {
            if (err.message.match("Unknown Role")) return

            console.error(Logger.error(err))
        })
    });

    await member.roles.add(serverConfig.roles.suspect);
    return message.replySuccessMessage(client, `**${member} est devenu un suspect !**`);
}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Envois un utilisateur dans le salon suspect",
        category: "Moderation",
        permissions: ["ManageMessages"],
        options: [
            {
                name: "utilisateur",
                description: "Mention de l'utilisateur",
                type: ApplicationCommandOptionType.User,
                required: true
            }
        ]
    }
}

