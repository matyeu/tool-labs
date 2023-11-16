import { GuildMember } from "discord.js";
import { ToolClient } from "../../Library";
import { find } from "../../Models/member";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, oldMember: GuildMember) {

    const memberConfig: any = await find(oldMember.guild!.id, oldMember.user.id);
    
    if (memberConfig) await memberConfig.deleteOne();

    await Logger.client(`${oldMember.user.tag} has just left ${oldMember.guild.name}`);
}