import { CategoryChannel, ChannelType, Guild, PermissionFlagsBits, Role, TextChannel, User, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, Message, Interaction, ButtonInteraction } from "discord.js";
import { ToolClient, capitalize } from "../../Library";
import { edit as editServer, find as findServer } from "../../Models/server";
import { edit as editMember, find as findMember, findServer as findServerMember } from "../../Models/member";
import { challengeEmbed, openEmbed, closeEmbed } from "./embeds";
import transcript from "./transcript";
import { EMBED_GENERAL, EMBED_INFO, FOOTER, FOOTER_CTF, FOOTER_TICKET } from "../../config";

const Logger = require("../../Library/logger");

export function tickets(guild: Guild) {
    return guild.channels.cache.filter((channel) => channel instanceof TextChannel && /(chall-ctf|suspect)-\d*/g.test(channel.name)).map((channel) => <TextChannel>channel);
};

export async function warnSurcharge(channel: TextChannel) {
    const nb = tickets(channel.guild).length;
    const description = "Il y a actuellement une forte demande de tickets, les temps de réponses pourraient être plus longs, veuillez nous en excuser.";
    const messages = await channel.messages.fetch();
    const lastMessage = messages.first();
    const EmbedBuilderMessage = lastMessage?.embeds[0];

    if (nb >= 20 && EmbedBuilderMessage && EmbedBuilderMessage.description !== description) {

        const embed = new EmbedBuilder()
            .setTitle("Surcharge des tickets")
            .setDescription(description)
            .setColor(EMBED_INFO)
            .setFooter({
                text: `${FOOTER_TICKET}`,
                iconURL: channel.client.user?.displayAvatarURL()
            })
            .setTimestamp();
        await channel.send({ embeds: [embed] });
        Logger.warn("Le nombre de tickets ouvert est supérieur à 20, envoi du message de surcharge");
    }

    if (nb <= 15 && EmbedBuilderMessage && EmbedBuilderMessage.description === description) {
        await lastMessage?.delete();
        Logger.client("Le nombre de tickets ouvert est inférieur à 15, suppression du message de surcharge");
    }
}

export async function createCollector(client: ToolClient, ticketChannel: TextChannel) {
    let panelMessage = (await ticketChannel.messages.fetchPinned()).first()!;
    if (!panelMessage) panelMessage = await createTicketPanel(client, ticketChannel);
    await panelMessage.createMessageComponentCollector({ filter: () => true })
        .on("collect", async (interaction: any) => {
            let member = ticketChannel.guild.members.cache.get(interaction.user.id);
            if (!member || !panelMessage) return;
            if (interaction.isStringSelectMenu()) {
                if (interaction.customId === "select-challenge") return selectChallenge(client, ticketChannel, interaction);
            }

            if (interaction.customId === "flags") await getFlags(client, interaction);
            if (interaction.customId === "classement") await updateClassement(client, interaction)
            if (interaction.customId === "close") await closeTicket(client, ticketChannel, member);
        });

};

export function createButtonChallenge(client: ToolClient) {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("flags")
                .setEmoji("📝")
                .setLabel("Mes flags")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("classement")
                .setEmoji("📜")
                .setLabel("Classement")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("close")
                .setEmoji("🔒")
                .setLabel("Fermer le ticket")
                .setStyle(ButtonStyle.Danger),
        );

};

export function createSelectChallenge(client: ToolClient) {
    return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select-challenge")
            .setPlaceholder("Selectionnez une catégorie")
            .addOptions([
                {
                    label: "Stéganographie",
                    description: "3 challenges Stéganographie disponibles",
                    emoji: "🖌️",
                    value: "category-1"
                },
                {
                    label: "Cracking & Reverse",
                    description: "3 challenges Cracking/Reverse disponibles",
                    emoji: "🔐",
                    value: "category-2"
                },
                {
                    label: "O.S.I.N.T",
                    description: "3 challenges Cracking/Reverse disponibles",
                    emoji: "🕵️‍♂️",
                    value: "category-3"
                },
                {
                    label: "Web Client",
                    description: "6 challenges Web Client disponibles",
                    emoji: "🌐",
                    value: "category-4"
                },
                {
                    label: "Web Server",
                    description: "0 challenges Web Server disponibles",
                    emoji: "🖥",
                    value: "category-5"
                },
                {
                    label: "M.I.S.C",
                    description: "1 challenges M.I.S.C disponibles",
                    emoji: "⚒️",
                    value: "category-6"
                },
                {
                    label: "Réaliste",
                    description: "0 challenges Réaliste disponibles",
                    emoji: "📋",
                    value: "category-7"
                },
                {
                    label: "Forensic",
                    description: "0 challenges Forensic disponibles",
                    emoji: "🔎",
                    value: "category-8"
                },
                {
                    label: "Machine",
                    description: "0 challenges Machine disponibles",
                    emoji: "👾",
                    value: "category-9"
                },
            ])
    );
}

export function createSelectSuspectChallenge(client: ToolClient) {

    return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select-challenge")
            .setPlaceholder("Selectionnez une catégorie")
            .addOptions([
                {
                    label: "Vous êtes suspect d'avoir tricher !",
                    description: "Pour débloquer les autres challenges veuillez validé celui-ci",
                    emoji: "🤨",
                    value: "category-10"
                }
            ])
    );
}

export async function createTicketPanel(client: ToolClient, channel: TextChannel) {
    const buttonChallenge = createButtonChallenge(client);
    const selectChallenge = createSelectChallenge(client);
    const selectSuspectChallenge = createSelectSuspectChallenge(client);
    let message: any;

    if (channel.name.includes("chall-ctf-"))
        message = await channel.send({
            embeds: [challengeEmbed(client)], components: [buttonChallenge, selectChallenge]
        }); else if (channel.name.includes("suspect-"))
        message = await channel.send({ embeds: [challengeEmbed(client)], components: [buttonChallenge, selectSuspectChallenge] });

    await message.pin().then(async () => {
        const messageSystem = channel.messages.cache.get(`${channel.lastMessageId}`)
        await messageSystem?.delete()
    })
    return message;
};

interface MentionsInterface {
    users?: User[],
    roles?: Role[]
};

export async function createTicket(client: ToolClient, category: CategoryChannel, member: GuildMember, dbPath: string, prefix: string, mentions: MentionsInterface) {

    const serverConfig: any = await findServer(category.guild.id);
    const nbTicket = serverConfig.stats[dbPath];

    const channel = <TextChannel>await category.guild.channels.create({
        name: `${prefix}-${member.displayName}`,
        parent: category,
        topic: `(TOOL-LABS:${member.id})`,
        type: ChannelType.GuildText
    });

    await channel.permissionOverwrites.set([{
        id: member.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
    }, ...category.permissionOverwrites.cache.map(permissionOverwrite => permissionOverwrite)])

    let content = "";
    if (mentions.users) content += mentions.users.map(user => `<@${user.id}>`).join(", ");
    if (mentions.roles) content += mentions.roles.map(role => `<@&${role.id}>`).join(", ");

    const message = await channel.send(content);
    await message.delete();

    await createCollector(client, channel);

    const logChannelId = serverConfig.channels.logs.tickets;
    const logChannel = <TextChannel>channel.guild.channels.cache.get(logChannelId);

    if (logChannel) {
        await logChannel.send({ embeds: [openEmbed(client, channel, member!)] });
    }

    serverConfig.stats[dbPath] = nbTicket + 1;

    await editServer(category.guild.id, serverConfig);

    Logger.module(`User ${member.displayName} created the ticket ${channel.name}`);
}

export async function closeTicket(client: ToolClient, channel: TextChannel, member: GuildMember) {
    const serverConfig: any = await findServer(channel.guild.id);

    const logChannelId = serverConfig.channels.logs.tickets;
    const logChannel = <TextChannel>channel.guild.channels.cache.get(logChannelId);

    if (logChannel) {
        await logChannel.send({ embeds: [closeEmbed(client, channel, member)] });
        let messages = (await channel.messages.fetch()).map(message => message);
        let getNext = async () => (await channel.messages.fetch({ before: messages[messages.length - 1].id })).map(message => message);
        while (true) {
            let nexts = await getNext();
            if (nexts.length === 0) break;
            for (const message of nexts) {
                messages.push(message);
            }
        }

        await transcript(client, messages, (path: string) => {
            logChannel.send({
                files: [path]
            })
        })
    }
    await channel.delete();
    await warnSurcharge(<TextChannel>channel.guild.channels.cache.get(serverConfig.channels.challenge));
    Logger.client(`The ${channel.name} ticket has been closed by ${member.displayName}`)

}

export async function getFlags(client: ToolClient, interaction: StringSelectMenuInteraction) {

    const memberConfig: any = await findMember(interaction.guild!.id, interaction.user.id);
    const flags = memberConfig.challenge.flags;

    const flagsTotal = flags.steganographie.length + flags.crackingReverse.length + flags.osint.length + flags.webClient.length + flags.misc.length
    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(`🚩 **Total de flags :** \`${flagsTotal}\``)
        .setThumbnail('https://ctftime.org/media/events/LOGO_CTF_nohand.png')
        .addFields(
            {
                name: `Stéganographie (${flags.steganographie.length})`,
                value: `${flags.steganographie.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.steganographie.join('\n')}`
            },
            {
                name: `Cracking & Reverse (${flags.crackingReverse.length})`,
                value: `${flags.crackingReverse.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.crackingReverse.join('\n')}`
            },
            {
                name: `O.S.I.N.T (${flags.osint.length})`,
                value: `${flags.osint.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.osint.join('\n')}`
            },
            {
                name: `Web Client (${flags.webClient.length})`,
                value: `${flags.webClient.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.webClient.join('\n')}`
            },
            {
                name: `Web Client (${flags.webServer.length})`,
                value: `${flags.webServer.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.webServer.join('\n')}`
            },
            {
                name: `M.I.S.C (${flags.misc.length})`,
                value: `${flags.misc.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.misc.join('\n')}`
            },
            {
                name: `Réaliste (${flags.realiste.length})`,
                value: `${flags.realiste.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.realiste.join('\n')}`
            },
            {
                name: `Forensic (${flags.forensic.length})`,
                value: `${flags.forensic.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.forensic.join('\n')}`
            },
            {
                name: `Machine (${flags.machine.length})`,
                value: `${flags.machine.length <= 0 ? "`Aucun flag actuellement dans cette catégorie`" : flags.machine.join('\n')}`
            }
        )
        .setTimestamp()
        .setFooter({ text: FOOTER_CTF, iconURL: client.user?.displayAvatarURL() })

    return interaction.reply({ embeds: [embed], ephemeral: true })


}



export async function updateClassement(client: ToolClient, interaction: ButtonInteraction) {

    const memberServerConfig: any = await findServerMember(interaction.guild!.id);
    let memberConfig: any = await findMember(interaction.guild!.id, interaction.user.id)
    let i = 0;


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

        let member = await interaction.guild?.members.fetch(e.userId)!;
        const emojiArray = ["🥇", "🥈", "🥉"];

        memberConfig = await findMember(interaction.guild!.id, member.id)
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

    return interaction.reply({ embeds: [embed], ephemeral: true })

}

export async function selectChallenge(client: ToolClient, ticketChannel: TextChannel, interaction: StringSelectMenuInteraction) {

    const memberConfig: any = await findMember(interaction.guild!.id, interaction.user.id);

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setImage("https://cdn.discordapp.com/attachments/1166027524506140692/1166027580336521237/selectBorder.png?ex=6548fece&is=653689ce&hm=766dda6294591951dca9548ee9f1445df78d953bc4405bbc637983a94e75171f&")
        .setDescription("Vous avez besoin d'informations ? Vous êtes au bon endroit ! ")

    const options: any = [];

    await interaction.update({ content: null }).then(async () => {

        switch (interaction.values[0]) {
            case 'category-1':
                embed.setAuthor({ name: "CHALLENGES STEGANOGRAPHIE", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge Stéganographie #1 (Facile)",
                        emoji: `🟡`,
                        description: "Trouve le FLAG dans l'image",
                        value: `steganographie-challenge-1`,
                    },
                    {
                        label: "Challenge Stéganographie #2 (Facile)",
                        emoji: `🟡`,
                        description: "Trouve le FLAG dans l'image",
                        value: `steganographie-challenge-2`,
                    },
                    {
                        label: "Challenge Stéganographie #3 (Moyen)",
                        emoji: `🟠`,
                        description: "Trouve le FLAG dans l'image",
                        value: `steganographie-challenge-3`,
                    })

                break
            case 'category-2':
                embed.setAuthor({ name: "CHALLENGES CRACKING & REVERSE", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Trouve le flag dans le .zip",
                        emoji: `🟡`,
                        description: "Trouve le FLAG dans l'image",
                        value: `cracking-challenge-1`,
                    },
                    {
                        label: "Challenge Reverse #2 (Moyen)",
                        emoji: `🟠`,
                        description: "Trouve le FLAG dans l'image",
                        value: `cracking-challenge-2`,
                    },
                    {
                        label: "Challenge Reverse #3 (Moyen)",
                        emoji: `🟠`,
                        description: "Trouve le FLAG dans l'image",
                        value: `cracking-challenge-3`,
                    })


                break
            case 'category-3':
                embed.setAuthor({ name: "CHALLENGES O.S.I.N.T", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge O.S.I.N.T #1 (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le lieu d'après une photo",
                        value: `osint-challenge-1`,
                    },
                    {
                        label: "Challenge O.S.I.N.T #2 (Moyen)",
                        emoji: `🟠`,
                        description: "Trouvez l'établissement d'après une photo",
                        value: `osint-challenge-2`,
                    },
                    {
                        label: "Challenge O.S.I.N.T #3 (Difficile)",
                        emoji: `🔴`,
                        description: "Trouvez le lieu d'après une photo",
                        value: `osint-challenge-3`,
                    })

                break
            case 'category-4':
                embed.setAuthor({ name: "CHALLENGES WEB CLIEN", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Find FLAG (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le FLAG dans le code source",
                        value: `webclient-challenge-1`,
                    },
                    {
                        label: "HTML OBFUSCATOR (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le FLAG dans le code source",
                        value: `webclient-challenge-2`,
                    },
                    {
                        label: "Session Hijacking (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le FLAG en commandant un cookie",
                        value: `webclient-challenge-3`,
                    },
                    {
                        label: "Copis et colle (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le FLAG en copiant et collant le flag",
                        value: `webclient-challenge-4`,
                    },
                    {
                        label: "Safe Locker (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le FLAG en déverouillant le locker",
                        value: `webclient-challenge-5`,
                    },
                    {
                        label: "Safe Locker ++ (Moyen)",
                        emoji: `🟠`,
                        description: "Trouvez le FLAG en déverouillant le locker",
                        value: `webclient-challenge-6`,
                    },
                    {
                        label: "Etes-vous un robot ? (Moyen)",
                        emoji: `🟠`,
                        description: "Trouvez le FLAG mais êtes-vous un robot ?",
                        value: `webclient-challenge-7`,
                    },
                    {
                        label: "Notes Personnelles (Moyen)",
                        emoji: `🟠`,
                        description: "Trouvez le FLAG en accèdant à mes notes",
                        value: `webclient-challenge-8`,
                    })

                break
            case 'category-5':
                embed.setAuthor({ name: "WEB SERVER", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge M.I.S.C (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le flag dans le Q.R Code",
                        value: `misc-challenge-2`,
                    })

                break
            case 'category-6':
                embed.setAuthor({ name: "CHALLENGES M.I.S.C", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge M.I.S.C (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le flag dans le Q.R Code",
                        value: `misc-challenge-1`,
                    })

                break
            case 'category-7':
                embed.setAuthor({ name: "REALISTE", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge M.I.S.C (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le flag dans le Q.R Code",
                        value: `misc-challenge-3`,
                    })

                break
            case 'category-8':
                embed.setAuthor({ name: "FORENSIC", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge M.I.S.C (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le flag dans le Q.R Code",
                        value: `misc-challenge-4`,
                    })

                break
            case 'category-9':
                embed.setAuthor({ name: "Machine", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge M.I.S.C (Facile)",
                        emoji: `🟡`,
                        description: "Trouvez le flag dans le Q.R Code",
                        value: `misc-challenge-5`,
                    })

                break
            case 'category-10':
                embed.setAuthor({ name: "CHALLENGES OBLIGATOIRE", iconURL: client.user?.displayAvatarURL({ extension: "png" }) })

                options.push(
                    {
                        label: "Challenge Imposé #1",
                        emoji: `🔴`,
                        description: "Validez ce challenge pour récuperer vos roles",
                        value: `suspect-challenge-1`,
                    })

                break
            default: return interaction.editErrorMessage(client, `**Le topic \`${interaction.values[0]}\` est introuvable par le bo**`);
        }

    })

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("category-select")
                .setPlaceholder("Selectionnez une catégorie")
                .addOptions(options)

        );

    const channel: any = client.channels.cache.get(ticketChannel.id);
    const getMessage = await channel.messages.cache.get(memberConfig.challenge.lastChallengeId)
    const getCategory = await channel.messages.cache.get(memberConfig.challenge.lastCategoryMessageId)

    if (!getMessage) {
        await interaction.followUp({ embeds: [embed], components: [row] }).then(async (msg) => {
            memberConfig.challenge.lastChallengeId = channel.lastMessageId
            await editMember(interaction.guild!.id, interaction.user.id, memberConfig)
        })

    } else {
        getMessage.edit({ embeds: [embed], components: [row] })
        if (getCategory) await getCategory.delete()
    }


    Logger.select(`The ${interaction.customId} select-menu was used by ${interaction.user.username} on the ${interaction.guild?.name} server.`);

}