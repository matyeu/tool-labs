import { ButtonInteraction, Guild, TextChannel } from "discord.js";
import { ToolClient } from "../../Library";
import { find } from "../../Models/server";
import { createCandidatureEmbed, createClassementEmbed, createDocumentationEmbed, createMissionEmbed } from "./embeds";
import { candidatureModal, missionModal, pagesDocumentation, updateClassement } from "./actions";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, guild: Guild) {

    const serverConfig: any = await find(guild.id);

    if (!serverConfig.modules.informations) return Logger.warn(`Loading informations from the ${guild.name} server - SKIPPED (The module is disabled)`);

    const classementChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.classement);
    if (!classementChannel) return Logger.error(`Loading informations from the ${guild.name} server - FAILURE (The channel classement is not filled in or cannot be found)`);

    const candidatureChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.candidature);
    if (!candidatureChannel) return Logger.error(`Loading informations from the ${guild.name} server - FAILURE (The channel candidature is not filled in or cannot be found)`);

    const missionChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.createMission);
    if (!missionChannel) return Logger.error(`Loading informations from the ${guild.name} server - FAILURE (The channel mission is not filled in or cannot be found)`);

    const documentationChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.documentation);
    if (!documentationChannel) return Logger.error(`Loading tickets from the ${guild.name} server - FAILURE (The channel documentation is not filled in or cannot be found)`);


    let classementMessage = (await classementChannel.messages.fetchPinned()).first();
    if (!classementMessage) classementMessage = await createClassementEmbed(client, classementChannel);

    let candidatureMessage = (await candidatureChannel.messages.fetchPinned()).first();
    if (!candidatureMessage) candidatureMessage = await createCandidatureEmbed(client, candidatureChannel);

    let missionMessage = (await missionChannel.messages.fetchPinned()).first();
    if (!missionMessage) missionMessage = await createMissionEmbed(client, missionChannel);

    let documentationMessage = (await documentationChannel.messages.fetchPinned()).first();
    if (!documentationMessage) documentationMessage = await createDocumentationEmbed(client, documentationChannel);

    let filter = () => true;

    await classementMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
        if (interaction.customId === "classement-button") {
            await updateClassement(client, interaction);
        }
    });

    await candidatureMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
        if (interaction.customId === "candidature-button") {
            await candidatureModal(client, interaction);
        }
    });

    await missionMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
        if (interaction.customId === "mission-button") {
            await missionModal(client, interaction);
        }
    });

    await documentationMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
            await pagesDocumentation(client, interaction)
    });

    Logger.module(`Loading informations for the ${guild.name} server - SUCCESS`);

}