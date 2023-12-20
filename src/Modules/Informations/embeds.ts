import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, TextChannel } from "discord.js";
import { ToolClient, capitalize } from "../../Library";
import { EMBED_INFO, FOOTER, EMOJIS, EMBED_GENERAL, FOOTER_CTF } from "../../config";
import { findServer, find } from "../../Models/member";

export async function createClassementEmbed(client: ToolClient, channel: TextChannel) {

    const memberServerConfig: any = await findServer(channel.guild!.id);
    let i = 0;

    const date = (Date.now()) / 1000;
    const timeStamp = date.toString().split('.')[0];

    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("classement-button")
                .setLabel("Actualiser le classement")
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(`Classement C.T.F`)
        .setDescription(`**Les membres sont classés par nombre de flags validé, du plus grand au plus petit.**\n----------------------`)
        .setThumbnail('https://tool-labs.com/classement1.png')
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL({ extension: "png" }) })
    const sortedClassement = memberServerConfig.sort((a: any, b: any) =>
        a.challenge.flags.steganographie.length + a.challenge.flags.crackingReverse.length + a.challenge.flags.osint.length + a.challenge.flags.webClient.length + a.challenge.flags.misc.length
            + a.challenge.flags.webServer.length + a.challenge.flags.realiste.length + a.challenge.flags.machine.length < b.challenge.flags.steganographie.length
            + b.challenge.flags.crackingReverse.length + b.challenge.flags.osint.length + b.challenge.flags.webClient.length + b.challenge.flags.misc.length + b.challenge.flags.webServer.length
            + b.challenge.flags.realiste.length + b.challenge.flags.machine.length ? 1 : -1
    );
    for (const e of sortedClassement.splice(0, 10)) {

        let member = await channel.guild?.members.fetch(e.userId)!;
        const emojiArray = [`${client.getEmoji(EMOJIS.premier)}`, `${client.getEmoji(EMOJIS.deuxieme)}`, `${client.getEmoji(EMOJIS.troisieme)}`];

        const memberConfig: any = await find(channel.guild!.id, member.id)
        const flags = memberConfig.challenge.flags;
        const flagsTotal = flags.steganographie.length + flags.crackingReverse.length + flags.osint.length + flags.webClient.length + flags.misc.length + flags.webServer.length + flags.realiste.length + flags.machine.length

        const flagTop = [
            { name: 'steganographie', data: flags.steganographie.length },
            { name: 'crackingReverse', data: flags.crackingReverse.length },
            { name: 'osint', data: flags.osint.length },
            { name: 'webClient', data: flags.webClient.length },
            { name: 'misc', data: flags.misc.length },
            { name: 'webServer', data: flags.webServer.length },
            { name: 'realiste', data: flags.realiste.length },
            { name: 'machine', data: flags.machine.length },
        ];

        flagTop.sort((a, b) => b.data - a.data);

        const valueFlags = `Nombre de Flags: ${flagsTotal}`
        const valueCategory = `Nombre de Flags: ${flagsTotal}\nCatégorie favorite : **${capitalize(flagTop[0].name)}**`

        if (i < 3) {
            embed.addFields({ name: `${emojiArray[i]}${member.displayName}`, value: flagsTotal > 0 ? valueCategory : valueFlags });
        } else {
            embed.addFields({ name: `${client.getEmoji(EMOJIS.horspodium)} ${member.displayName}`, value: flagsTotal > 0 ? valueCategory : valueFlags });
        }

        i++
    }

    embed.addFields({ name: `\u200b`, value: `Dernire actualisation : <t:${timeStamp}:R>` })

    const message = await channel.send({ embeds: [embed], components: [button] });
    await message.pin();
    return message;

}

export async function createCandidatureEmbed(client: ToolClient, channel: TextChannel) {

    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("candidature-button")
                .setEmoji(EMOJIS.candidaturebutton)
                .setLabel("Créer une candidature")
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setAuthor({ name: "Tool'Labs™ Candidature Systeme", iconURL: `${channel.guild.iconURL()}` })
        .setThumbnail(`${channel.guild.iconURL()}`)
        .setDescription(`**Bonjour à tous !

Aujourd'hui nous avons besoin d'agrandir notre équipe c'est pourquoi nous recherchons 2 modérateurs.**


**Nous recherchons donc 2 personnes pour tenir ce poste.
Aucun pré-requis ni conditions n'est néccessaire cependant soyez conscient que nous attendons des modérateurs un comportement exemplaire.

Si vous pensez être apte a tenir ce poste et ses responsabilités, merci de cliquer ci-dessous pour ouvrir une candidature.**`)
        .setTimestamp()
        .setFooter({ text: FOOTER })

    const message = await channel.send({ embeds: [embed], components: [button] });
    await message.pin();
    return message;

}

export async function createMissionEmbed(client: ToolClient, channel: TextChannel) {

    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("mission-button")
                .setEmoji(EMOJIS.missionbutton)
                .setLabel("Créer une mission")
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setAuthor({ name: "Tool'Labs™ Mission Systeme", iconURL: `${channel.guild.iconURL()}` })
        .setTitle(`${client.getEmoji(EMOJIS.missioncreate)} Créer une mission`)
        .setDescription(`**En cliquant sur le bouton ci dessous vous pourrez ouvrir un formulaire et proposer une mission. 
Soyez sérieux et précis dans votre demande !**`)
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() })

    const message = await channel.send({ embeds: [embed], components: [button] });
    await message.pin();
    return message;

}

export async function createDocumentationEmbed(client: ToolClient, channel: TextChannel) {

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("1-button")
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
        .setTitle("Documentation C.T.F")
        .setDescription(`${client.getEmoji(EMOJIS.documentation)} **Vous pouvez consulter vos données et celle des autres participants CTF en tapant la commande :\n
        \`\`\`/profil @utilisateur\`\`\`
ou en vous rendant sur** ***le profil de l'utilisateur > Applications > Profil C.T.F ***
        
${client.getEmoji(EMOJIS.uno)} Les FLAGS doivent être écris dans votre salon C.T.F privé, le bot réagira si vous trouvez le bon flag
    
${client.getEmoji(EMOJIS.deux)} Tous les challenges sont testés et fonctionnels, et nous ne donnons\n **aucun indice(s) supplémentaire(s).** 
Si un challenge ne vous donne pas d'indice dans la trame, cela veut dire que le challenge est réalisable sans\n
    
${client.getEmoji(EMOJIS.trois)} Si vous validé un challenge et que vous ne gagniez aucun rôle, ou récompenses c'est normal !\n**Tous les challenges n'offre pas de récompense(s).**
    
${client.getEmoji(EMOJIS.quatre)} Les challenges de Tool-Labs sont pour la plupart fait maison cependant certains peuvent provenir d'une célèbre plateforme permettant de mettre à disposition des challenges **(libre d'utilisation)** néanmoins l'ensemble du code aura été modifier pour vous empêcher de reverse le code sur internet.") 
`)
        .setFooter({ text: FOOTER_CTF, iconURL: client.user!.displayAvatarURL({ extension: "png" }) })

    let message = await channel.send({ embeds: [embed], components: [buttons] });
    await message.pin();
    return message;
};