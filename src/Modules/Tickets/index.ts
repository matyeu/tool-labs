import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CategoryChannel, EmbedBuilder, Guild, TextChannel, User } from "discord.js";
import { ToolClient } from "../../Library";
import { find } from "../../Models/server";
import { createChallengeEmbed, createDocumentationEmbed, ticketAlreadyOpenEmbed } from "./embeds";
import { createCollector, createTicket, page1Documentation, page2Documentation, page3Documentation, tickets, warnSurcharge } from "./actions";
import { EMBED_GENERAL } from "../../config";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, guild: Guild) {

    const serverConfig: any = await find(guild.id);

    if (!serverConfig.modules.tickets) return Logger.warn(`Loading tickets from the ${guild.name} server - SKIPPED (The module is disabled)`);

    const challengeChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.challenge);
    if (!challengeChannel) return Logger.error(`Loading tickets from the ${guild.name} server - FAILURE (The channel challenge is not filled in or cannot be found)`);

    const challengeSuspectChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.challengeSuspect);
    if (!challengeSuspectChannel) return Logger.error(`Loading tickets from the ${guild.name} server - FAILURE (The channel challengeSuspect is not filled in or cannot be found)`);

    const challengeCategory = <CategoryChannel>guild.channels.cache.get(serverConfig.category.challenge);
    if (!challengeCategory) return Logger.error(`Loading tickets from the ${guild.name} server - FAILURE (The category challenge is not filled in or cannot be found)`);

    const documentationChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.documentation);
    if (!documentationChannel) return Logger.error(`Loading tickets from the ${guild.name} server - FAILURE (The channel documentation is not filled in or cannot be found)`);

    let challengeMessage = (await challengeChannel.messages.fetchPinned()).first();
    if (!challengeMessage) challengeMessage = await createChallengeEmbed(client, challengeChannel);

    let challengeSuspectMessage = (await challengeSuspectChannel.messages.fetchPinned()).first();
    if (!challengeSuspectMessage) challengeSuspectMessage = await createChallengeEmbed(client, challengeSuspectChannel);

    let documentationMessage = (await documentationChannel.messages.fetchPinned()).first();
    if (!documentationMessage) documentationMessage = await createDocumentationEmbed(client, documentationChannel);

    const openedTickets = tickets(guild);
    const alreadyHasTicketOpen = (user: User, prefix: string) => !!tickets(guild).find(ticket => ticket.topic!.includes(user.id) && ticket.name.includes(prefix));
    const warnUser = async (inter: ButtonInteraction) => {
        const member = await inter.guild!.members.fetch(inter.user.id);
        inter.reply({ embeds: [ticketAlreadyOpenEmbed()], ephemeral: true });
        Logger.warn(`The user ${member.displayName} tried to open a ticket but was prevented by anti-spam`)
    };

    let filter = () => true;

    await challengeMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
        if (alreadyHasTicketOpen(interaction.user, "chall-ctf-")) return warnUser(interaction);
        const member = await interaction.guild!.members.fetch(interaction.user.id);
        await interaction.reply({ content: `**Ticket en cours de création !**`, ephemeral: true });
        if (interaction.customId === "open") {
            await createTicket(client, challengeCategory, member, "challenge", "chall-ctf", { users: [interaction.user] });
            await warnSurcharge(challengeChannel);
        }
    });

    await challengeSuspectMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
        if (alreadyHasTicketOpen(interaction.user, "suspect-")) return warnUser(interaction);
        const member = await interaction.guild!.members.fetch(interaction.user.id);
        await interaction.reply({ content: `**Ticket en cours de création !**`, ephemeral: true });
        if (interaction.customId === "open") {
            await createTicket(client, challengeCategory, member, "suspect", "suspect", { users: [interaction.user] });
            await warnSurcharge(challengeSuspectChannel);
        }
    });

    await documentationMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
        if (interaction.customId === "page1-button") {
            await page1Documentation(client, interaction)
        } else if (interaction.customId === "page2-button") {
            await page2Documentation(client, interaction)
        } else if (interaction.customId === "page3-button") {
            await page3Documentation(client, interaction)
        }

        setTimeout(() => {
            const buttons = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("page1-button")
                        .setLabel("Page précedente")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)

                ).addComponents(
                    new ButtonBuilder()
                        .setCustomId("page2-button")
                        .setLabel("Page suivante")
                        .setStyle(ButtonStyle.Primary)
                );

            const embed = new EmbedBuilder()
                .setColor(EMBED_GENERAL)
                .setTitle("Documentation")
                .setThumbnail('https://tool-labs.com/doc.png')
                .setDescription(`Page 1`)

            documentationMessage?.edit({ embeds: [embed], components: [buttons] })
        }, 180000);
    });

    for (let challengeChannel of openedTickets) {
        await createCollector(client, challengeChannel);
    }

    Logger.module(`Loading tickets for the ${guild.name} server - SUCCESS (${openedTickets.length} ticket(s) reloaded)`)

}