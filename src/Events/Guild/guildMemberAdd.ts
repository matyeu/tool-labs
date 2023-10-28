import { GuildMember } from "discord.js";
import { ToolClient } from "../../Library";
import { edit, find } from "../../Models/member";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, newMember: GuildMember) {

    newMember.guild.invites.fetch().then(async newInvite => {

        const oldInvite = client.invite.get(newMember.guild.id);
        const invite = newInvite.find(i => i.uses! > oldInvite.get(i.code));
        const memberInvite = newMember.client.users.cache.get(invite!.inviter!.id)!;

        const memberConfig: any = await find(newMember.guild!.id, memberInvite.id);

        memberConfig.stats.invitations++;
        await edit(newMember.guild!.id, memberInvite.id, memberConfig);
    
    });

    await Logger.client(`${newMember.user.tag} has just joined ${newMember.guild.name}`);
}