import { ButtonInteraction, CategoryChannel, Guild, TextChannel, User } from "discord.js";
import { ToolClient } from "../../Library";
import { find } from "../../Models/server";
import { createChallengeEmbed, createChallengeSuspectEmbed, ticketAlreadyOpenEmbed } from "./embeds";
import { createCollector, createTicket, tickets, warnSurcharge } from "./actions";
import { edit as editMember, find as findMember } from "../../Models/member";

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

    let challengeMessage = (await challengeChannel.messages.fetchPinned()).first();
    if (!challengeMessage) challengeMessage = await createChallengeEmbed(client, challengeChannel);

    let challengeSuspectMessage = (await challengeSuspectChannel.messages.fetchPinned()).first();
    if (!challengeSuspectMessage) challengeSuspectMessage = await createChallengeSuspectEmbed(client, challengeSuspectChannel);

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


    for (let challengeChannel of openedTickets) {
        await createCollector(client, challengeChannel);
        const idMember = challengeChannel.topic?.split(":")[1].replace('(', '').replace(')', '');
        const member = challengeChannel.guild.members.cache.get(`${idMember}`)!;

        const fetchedMessages = await challengeChannel.messages.fetch({ limit: 100 });
        const channelMessages = fetchedMessages.filter(msg => msg.channel.id === challengeChannel.id);

        channelMessages.forEach(msg => msg.delete());

       /* const memberConfig: any = await findMember(member.guild.id, member.id);
       const getMessage = await challengeChannel.messages.fetch(memberConfig.challenge.lastChallengeId);
        const getCategory = await challengeChannel.messages.fetch(memberConfig.challenge.lastCategoryMessageId);

        if (getMessage) {
            await getMessage.delete();
            memberConfig.challenge.lastChallengeId = "";
        };  
        
        if (getCategory) {
            await getCategory.delete();
            memberConfig.challenge.lastCategoryMessageId = "";
        };

        await editMember(member.guild.id, member.id, memberConfig);*/
    }

    Logger.module(`Loading tickets for the ${guild.name} server - SUCCESS (${openedTickets.length} ticket(s) reloaded)`)

}