import { Message, EmbedBuilder } from "discord.js";
import { find as findServer } from "../../Models/server";
import { find as findMember, edit as editMember } from "../../Models/member";
import { ToolClient } from "../../Library";
import { EMBED_INFO } from "../../config";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, message: Message) {

    if (message.author.bot) return;

    const serverConfig: any = await findServer(message.guild!.id);

    const member = await message.guild!.members.fetch(message.author.id);
    const administrators = serverConfig.administrators;

    const memberConfig: any = await findMember(message.guild!.id, message.author.id);

    // MESSAGE
    if (memberConfig.messageCount < 5) {
        memberConfig.messageCount++
        await editMember(member.guild!.id, member.id, memberConfig)
    } else {
        const roleInvite = client.getRole(member.guild, serverConfig.roles.invite);
        if (roleInvite) await member.roles.add(serverConfig.roles.invite)
    }

    // SYSTEM FLAG
    await client.emit("messageFlags", message);

    // COMMAND
    const prefix = serverConfig.prefix;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()!.toLowerCase();
    if (commandName.length == 0) return;

    const command = client.messageCommands.get(commandName);
    if (!command) return message.replyErrorMessage(client, `La commande **${commandName}** n'a pas été trouvée`);

    Logger.command(`The ${commandName} command was used by ${member.user.username} on the ${message.guild?.name} server`);

    if (!member.permissions.has([command.cmd.data.permissions]) || command.cmd.data.category === "Développement" && administrators.indexOf(member.user.id) === -1)
        return message.replyErrorMessage(client, "*Vous n'avez pas l'habilitation d'utiliser cet interaction !**");


    const commandMaintenance = serverConfig.maintenance.commandes.find((e: any) => e.cmdName == commandName);
    const categoryMaintenance = serverConfig.maintenance.category.find((e: any) => e.categoryName == command.cmd.data.category);

    // START SYSTEM OF MAINTENANCE
    const embedMaintenance = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setTitle("Maintenance en cours")
        .setFooter({ text: `Merci de réessayer dans quelque minutes.\nPendant la maintenance, tous les systèmes automatisés de ${client.user?.username} restent fonctionnels.` });


    if (serverConfig.maintenance.state && administrators.indexOf(member.user.id) === -1) {
        embedMaintenance.setDescription(`**${member.displayName}**, une opération de maintenance est actuelement en cours sur **${client.user?.username}**`)
        if (serverConfig.maintenance.reason) embedMaintenance.addFields({
            name: "Raison",
            value: serverConfig.maintenance.reason
        });
        return message.reply({ embeds: [embedMaintenance] });
    } else if (commandMaintenance && commandMaintenance.state && administrators.indexOf(member.user.id) === -1) {
        embedMaintenance.setDescription(`**${member.displayName}**, une opération de maintenance est actuelement en cours sur la commande **${commandName}**.`)
        if (commandMaintenance.reason) embedMaintenance.addFields({
            name: "Raison",
            value: commandMaintenance.reason
        });
        return message.reply({ embeds: [embedMaintenance] });
    } else if (categoryMaintenance && categoryMaintenance.state && administrators.indexOf(member.user.id) === -1) {
        embedMaintenance.setDescription(`**${member.displayName}**, une opération de maintenance est actuelement en cours sur la catégorie **${command.cmd.data.category}**.`)
        if (categoryMaintenance.reason) embedMaintenance.addFields({
            name: "Raison",
            value: categoryMaintenance.reason
        });
        return message.reply({ embeds: [embedMaintenance] });
    }
    // END SYSTEM OF MAINTENANCE

    await command.command(client, message, args, serverConfig);
}