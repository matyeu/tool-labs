import { EmbedBuilder, Interaction } from "discord.js";
import { ToolClient } from "../../Library";
import {find} from "../../Models/server";
import { EMBED_INFO } from "../../config";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, interaction: Interaction) {

    const serverConfig: any = await find(interaction.guild!.id);

    const member = await interaction.guild!.members.fetch(interaction.user.id);
    const administrators = serverConfig.administrators;

    if (interaction.isCommand() && interaction.inGuild()) {
        try {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.replyErrorMessage(client, `La commande **${interaction.commandName}** n'a pas été trouvée`, true);

            Logger.command(`The ${interaction.commandName} command was used by ${interaction.user.username} on the ${interaction.guild?.name} server`);
            
            if (!member.permissions.has([command.cmd.data.permissions]) || command.cmd.data.category === "Développement" && administrators.indexOf(interaction.user.id) === -1)
                return interaction.replyErrorMessage(client, "*Vous n'avez pas l'habilitation d'utiliser cet interaction !**", true);
            
            const commandMaintenance = serverConfig.maintenance.commandes.find((e: any) => e.cmdName == interaction.commandName);
            const categoryMaintenance = serverConfig.maintenance.category.find((e: any) => e.categoryName == command.cmd.data.category);
            
            // START SYSTEM OF MAINTENANCE
            const embedMaintenance = new EmbedBuilder()
                .setColor(EMBED_INFO)
                .setTitle("Maintenance en cours")
                .setFooter({text: `Merci de réessayer dans quelque minutes.\nPendant la maintenance, tous les systèmes automatisés de ${client.user?.username} restent fonctionnels.`});

            if (serverConfig.maintenance.state && administrators.indexOf(interaction.user.id) === -1) {
                embedMaintenance.setDescription(`**${member.displayName}**, une opération de maintenance est actuelement en cours sur **${client.user?.username}**`)
                if (serverConfig.maintenance.reason) embedMaintenance.addFields({
                    name: "Raison",
                    value: serverConfig.maintenance.reason
                });
                return interaction.reply({embeds: [embedMaintenance], ephemeral: true});
            } else if (commandMaintenance && commandMaintenance.state && administrators.indexOf(interaction.user.id) === -1) {
                embedMaintenance.setDescription(`**${member.displayName}**, une opération de maintenance est actuelement en cours sur la commande **${interaction.commandName}**.`)
                if (commandMaintenance.reason) embedMaintenance.addFields({
                    name: "Raison",
                    value: commandMaintenance.reason
                });
                return interaction.reply({embeds: [embedMaintenance], ephemeral: true});
            } else if (categoryMaintenance && categoryMaintenance.state && administrators.indexOf(interaction.user.id) === -1) {
                embedMaintenance.setDescription(`**${member.displayName}**, une opération de maintenance est actuelement en cours sur la catégorie **${command.cmd.data.category}**.`)
                if (categoryMaintenance.reason) embedMaintenance.addFields({
                    name: "Raison",
                    value: categoryMaintenance.reason
                });
                return interaction.reply({embeds: [embedMaintenance], ephemeral: true});
            }
            // END SYSTEM OF MAINTENANCE

            await command.slash(client, interaction);

        } catch (err) {
            return Logger.error(err);
        }
    } else if (interaction.isButton()) {
        try {
            const getButton = client.buttons.get(interaction.customId.split(':')[0]);
            if (!getButton) return;
            Logger.button(`The ${interaction.customId} button was used by ${interaction.user?.tag} on the ${interaction.guild?.name} server.`);
            getButton.default(client, interaction)
        } catch (err) {
            return Logger.error(err);
        }
    } else if (interaction.isStringSelectMenu()) {
        try {
            const getSelectMenu = client.selects.get(interaction.customId.split(':')[0]);
            if (!getSelectMenu) return;
            Logger.select(`The ${interaction.customId} select-menu was used by ${interaction.user.username} on the ${interaction.guild?.name} server.`);
            getSelectMenu.default(client, interaction)
        } catch (err) {
            return Logger.error(err);
        }
    } else if (interaction.isModalSubmit()) {
        try {
            const getModal = client.modals.get(interaction.customId.split(':')[0]);
            Logger.modal(`The ${interaction.customId} modal was used by ${interaction.user.username} on the ${interaction.guild?.name} server.`);
            await getModal.default(client, interaction);
        } catch (err) {
            return Logger.error(err);
        }
    }
}