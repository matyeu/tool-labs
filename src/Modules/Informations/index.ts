import { ButtonInteraction, Guild, TextChannel } from "discord.js";
import { ToolClient } from "../../Library";
import { find } from "../../Models/server";
import { createClassementEmbed } from "./embeds";
import { updateClassement } from "./actions";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, guild: Guild) {

    const serverConfig: any = await find(guild.id);

    if (!serverConfig.modules.informations) return Logger.warn(`Loading informations from the ${guild.name} server - SKIPPED (The module is disabled)`);

    const classementChannel = <TextChannel>guild.channels.cache.get(serverConfig.channels.classement);
    if (!classementChannel) return Logger.error(`Loading informations from the ${guild.name} server - FAILURE (The channel informations is not filled in or cannot be found)`);

    let classementMessage = (await classementChannel.messages.fetchPinned()).first();
    if (!classementMessage) classementMessage = await createClassementEmbed(client, classementChannel);

    let filter = () => true;

    await classementMessage.createMessageComponentCollector({ filter }).on("collect", async (interaction: ButtonInteraction) => {
        if (interaction.customId === "classement-button") {
            await updateClassement(client, interaction);
        }
    });

    Logger.module(`Loading informations for the ${guild.name} server - SUCCESS`);

}