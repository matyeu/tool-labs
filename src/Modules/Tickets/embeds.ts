import { TextChannel, GuildMember, ColorResolvable, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { ToolClient } from "../../Library";
import { EMBED_CLOSE, EMBED_ERROR, EMBED_GENERAL, EMBED_INFO, FOOTER_TICKET, FOOTER_CTF, EMOJIS } from "../../config";

const embed = (client: ToolClient, channel: TextChannel, member: GuildMember, action: string, color: ColorResolvable) => {
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(`\`${member.displayName}\``)
        .addFields(
            { name: `🎙️ Channel`, value: `${channel.name.split("locked-").pop()}`, inline: true },
            { name: `⚙️ Action`, value: `${action}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: FOOTER_TICKET, iconURL: client.user!.displayAvatarURL() })
};

export function closeEmbed(client: ToolClient, channel: TextChannel, member: GuildMember) {
    return embed(client, channel, member, "Fermer un ticket", EMBED_ERROR);
}

export function openEmbed(client: ToolClient, channel: TextChannel, member: GuildMember) {
    return embed(client, channel, member, "Ouvrir un ticket", EMBED_INFO);
};

export async function createChallengeEmbed(client: ToolClient, channel: TextChannel) {
    let buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("open")
                .setEmoji(EMOJIS.ctf)
                .setLabel("Ouvrir un salon CTF")
                .setStyle(ButtonStyle.Primary)
        );
    let embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle("Tool-Labs C.T.F")
        .setDescription(`Bienvenue ! Etes-vous prêt à vous lancer dans les challenges C.T.F de Tool-Labs !?\n
${client.getEmoji(EMOJIS.info)} Pour ouvrir un salon privé et commencer les challenges, veuillez lire attentivement la documentation dans le salon ⁠
<#1161679951209168966> et cliquez sur le bouton ci-dessous.
    
`)
        .setImage('https://tool-labs.com/tlgif.gif')
        .setFooter({
            text: `${FOOTER_CTF}`,
            iconURL: client.user?.displayAvatarURL()
        })
        .setTimestamp();
    let message = await channel.send({ embeds: [embed], components: [buttons] });
    await message.pin();
    return message;

}

export async function createChallengeSuspectEmbed(client: ToolClient, channel: TextChannel) {
    let buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("open")
                .setEmoji(EMOJIS.ctf)
                .setLabel("Ouvrir un salon C.T.F [Obligatoire]")
                .setStyle(ButtonStyle.Primary)
        );
    let embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle("Tool-Labs C.T.F [Suspect]")
        .setThumbnail('https://tool-labs.com/logoctf1.png')
        .setDescription(`Aie aie aie ! Si vous êtes ici c'est que vous êtes soupsonné d'avoir triché !\n
${client.getEmoji(EMOJIS.info)} Pour ouvrir un salon privé et commencer le challenge imposé qui vous permettra de revenir parmis nous, veuillez cliquer sur le bouton ci-dessous.
    
`)
        .setImage('https://tool-labs.com/tl.gif')
        .setFooter({
            text: `${FOOTER_CTF}`,
            iconURL: client.user?.displayAvatarURL()
        })
        .setTimestamp();
    let message = await channel.send({ embeds: [embed], components: [buttons] });
    await message.pin();
    return message;

}

export function challengeEmbed(client: ToolClient) {

    return new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle("Challenges C.T.F")
        .setThumbnail('https://tool-labs.com/logoctf1.png')
        .setDescription(`***Bonjour !

Avant de commencer les challenges, souvenez-vous qu'il faut lire 
la documentation et le règlement dans :
  
<#1161679951209168966>

L'équipe de Tool-Labs vous souhaite bonne chance !***`)
.setImage("https://cdn.discordapp.com/attachments/1166027524506140692/1166027580336521237/selectBorder.png?ex=6548fece&is=653689ce&hm=766dda6294591951dca9548ee9f1445df78d953bc4405bbc637983a94e75171f&")
        .setFooter({ text: FOOTER_CTF, iconURL: client.user!.displayAvatarURL({ extension: "png" }) })
};


export function ticketAlreadyOpenEmbed() {
    return new EmbedBuilder()
    .setColor(EMBED_CLOSE)
    .setTitle("Création de ticket")
    .setDescription(`Vous avez déjà un ticket ouvert dans cette catégorie et ne pouvez pas en ouvrir d'autre avant de l'avoir fermé.`)
    .setTimestamp()
    .setFooter({text: FOOTER_TICKET})
}
