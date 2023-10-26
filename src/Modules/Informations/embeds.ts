import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, TextChannel } from "discord.js";
import { ToolClient, capitalize } from "../../Library";
import { EMBED_INFO, FOOTER } from "../../config";
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
                .setStyle(ButtonStyle.Success)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setTitle(`Classement C.T.F`)
        .setDescription(`**Les membres sont classés par nombre de flags validé, du plus grand au plus petit.**\n----------------------`)
        .setThumbnail('https://tool-labs.com/classement1.png')
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL({ extension: "png" }) })
    const sortedClassement = memberServerConfig.sort((a: any, b: any) =>
        a.challenge.flags.steganographie.length + a.challenge.flags.crackingReverse.length + a.challenge.flags.osint.length + a.challenge.flags.webClient.length + a.challenge.flags.misc.length
            + a.challenge.flags.webServer.length + a.challenge.flags.realiste.length + a.challenge.flags.forensic.length + a.challenge.flags.machine.length < b.challenge.flags.steganographie.length
            + b.challenge.flags.crackingReverse.length + b.challenge.flags.osint.length + b.challenge.flags.webClient.length + b.challenge.flags.misc.length + b.challenge.flags.webServer.length
            + b.challenge.flags.realiste.length + b.challenge.flags.forensic.length + b.challenge.flags.machine.length ? 1 : -1
    );
    for (const e of sortedClassement.splice(0, 10)) {

        let member = await channel.guild?.members.fetch(e.userId)!;
        const emojiArray = ["🥇", "🥈", "🥉"];

        const memberConfig: any = await find(channel.guild!.id, member.id)
        const flags = memberConfig.challenge.flags;
        const flagsTotal = flags.steganographie.length + flags.crackingReverse.length + flags.osint.length + flags.webClient.length + flags.misc.length

        const flagTop = [
            { name: 'steganographie', data: flags.steganographie },
            { name: 'crackingReverse', data: flags.crackingReverse },
            { name: 'osint', data: flags.osint },
            { name: 'webClient', data: flags.webClient },
            { name: 'misc', data: flags.misc },
            { name: 'webServer', data: flags.webServer },
            { name: 'realiste', data: flags.realiste },
            { name: 'forensic', data: flags.forensic },
            { name: 'machine', data: flags.machine },
        ];

        flagTop.sort((a, b) => b.data - a.data);

        if (i < 3) {
            embed.addFields({ name: `${emojiArray[i]}${member.displayName}`, value: `Nombre de Flags: ${flagsTotal}\nCatégorie favorite : **${capitalize(flagTop[0].name)}**`, });
        } else {
            embed.addFields({ name: `🚩 ${member.displayName}`, value: `${flagsTotal}\nCatégorie favorite : **${capitalize(flagTop[0].name)}**` });
        }

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
                .setLabel("Créer une candidature")
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setAuthor({ name: "Tool'Labs™ Candidature Systeme", iconURL: `${channel.guild.iconURL()}` })
        .setThumbnail(`${channel.guild.iconURL()}`)
        .setDescription(`**Bonjour à tous !

Aujourd'hui nous avons besoin d'agrandir notre équipe c'est pourquoi nous recherchons 2 modérateurs.**


Nous recherchons donc **2 personnes** pour tenir ce poste.
Aucun pré-requis ni conditions n'est néccessaire cependant soyez conscient que nous attendons des modérateurs un **comportement exemplaire.**

Si vous pensez être apte a tenir ce poste et **ses responsabilités**, merci de cliquer ci-dessous pour ouvrir une candidature.`)
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
                .setLabel("Créer une mission")
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setAuthor({ name: "Tool'Labs™ Mission Systeme", iconURL: `${channel.guild.iconURL()}` })
        .setTitle("Créer une mission")
        .setDescription(`En cliquant sur le bouton ci dessous vous pourrez ouvrir un formulaire et proposer une mission. 
Soyez sérieux et précis dans votre demande !`)
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() })

    const message = await channel.send({ embeds: [embed], components: [button] });
    await message.pin();
    return message;

}