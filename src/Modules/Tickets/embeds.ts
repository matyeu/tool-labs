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
        .setDescription(`Bienvenue dans le système de challenge C.T.F de Tool-Labs !
Pour ouvrir un salon privé et commencer les challenges, veuillez lire 
attentivement la documentation ⁠<#1161679951209168966> et cliquez sur le bouton ci-dessous
    
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
        .setThumbnail('https://ctftime.org/media/events/LOGO_CTF_nohand.png')
        .setDescription(`***Bonjour et bienvenue !

Avant de commencer les challenges, souviens-toi qu'il faut lire 
la documentation et le règlement dans :
  
<#1161679951209168966>

L'équipe de Tool-Labs te souhaite bonne chance !***`)
.setImage("https://cdn.discordapp.com/attachments/1166027524506140692/1166027580336521237/selectBorder.png?ex=6548fece&is=653689ce&hm=766dda6294591951dca9548ee9f1445df78d953bc4405bbc637983a94e75171f&")
        .setFooter({ text: FOOTER_CTF, iconURL: client.user!.displayAvatarURL({ extension: "png" }) })
};

export async function createDocumentationEmbed(client: ToolClient, channel: TextChannel) {

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

    const embed =  new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle("Documentation C.T.F")
        
        .setDescription("Vous pouvez consulter vos données et celle des autres participants CTF en tapant la commande :\n```/profil @utilisateur```\nou en vous rendant sur ***le profil de l utilisateur > Applications > Profil C.T.F ***\n\n3️⃣ Les FLAGS doivent être écris dans votre salon C.T.F privé, le bot réagira si vous trouvez le bon flag\n\n4️⃣ Tous les challenges sont testés et fonctionnels, et nous ne donnons aucun indice supplémentaire.** Si un challenge ne vous donne pas d indice dans la trame, cela veut dire que le challenge est réalisable sans\n\n3️⃣ Si vous validé un challenge et que vous ne gagniez aucun rôle, ou récompenses c est normal !\nTous les challenges n offre pas de récompense.\n\n3️⃣ Les challenges de Tool-Labs sont pour la plupart fait maison cependant certains peuvent provenir d une célèbre plateforme permettant de mettre à disposition des challenges (libre d utilisation) néanmoins l ensemble du code a été modifié pour vous empêcher de reverse le code sur internet.")
        .setFooter({ text: FOOTER_CTF, iconURL: client.user!.displayAvatarURL({ extension: "png" }) })

        let message = await channel.send({ embeds: [embed], components: [buttons] });
        await message.pin();
        return message;
};

export async function documentationEmbed(client: ToolClient) {

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

    const embed =  new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle("Documentation")
        .setThumbnail('https://tool-labs.com/doc.png')
        .setDescription(`Page 1`)
};


export function ticketAlreadyOpenEmbed() {
    return new EmbedBuilder()
    .setColor(EMBED_CLOSE)
    .setTitle("Création de ticket")
    .setDescription(`Vous avez déjà un ticket ouvert dans cette catégorie et ne pouvez pas en ouvrir d'autre avant de l'avoir fermé.`)
    .setTimestamp()
    .setFooter({text: FOOTER_TICKET})
}
