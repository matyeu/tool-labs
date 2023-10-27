import {ToolClient} from "../../Library";
import {Invite} from "discord.js";

export default async function (client: ToolClient, invite: Invite) {

    client.invite.get(invite.guild!.id).set(invite.code, invite.uses);

};