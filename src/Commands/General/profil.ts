import { ApplicationCommandOptionType, AttachmentBuilder, CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { ToolClient } from "../../Library";
import { find as findServer } from "../../Models/server";
import { find as findMember } from "../../Models/member";
import { EMBED_GENERAL, FOOTER } from "../../config";
import Canvas from "canvas";

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const serverConfig: any = await findServer(interaction.guild!.id);
    const flagsServer = serverConfig.challenge.flags;

    const memberOption: any = interaction.options.get('utilisateur', false);
    const member = await interaction.guild!.members.fetch(memberOption ? memberOption.value : interaction.user);

   if (member.user.bot) return interaction.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`, true)
    if (!member) return interaction.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`, true);

    await interaction.deferReply()

    const memberConfig: any = await findMember(member.guild!.id, member.id);
    const flagsMember = memberConfig.challenge.flags;


    let customStatus;
    const activities = [];
    if (member.presence) {
        for (const activity of member.presence.activities.values()) {
            switch (activity.type) {
                case 0:
                    activities.push(`**Joue :** ${activity.name}`);
                    break;
                case 2:
                    if (member.user.bot) activities.push(`**Écoute :** ${activity.name}`);
                    else activities.push(`**Écoute:** ${activity.details} par ${activity.state}`);
                    break;
                case 3:
                    activities.push(`**Regarde :**${activity.name}`);
                    break;
                case 1:
                    activities.push(`**Stream :** ${activity.name}`);
                    break;
                case 4:
                    customStatus = activity.state;
                    break;
            }
        }
    }

    const joinedTimestamp = parseInt(String(member.joinedTimestamp! / 1000));
    const createdTimestamp = parseInt(String(member.user.createdTimestamp! / 1000));

    const getAchievedSteganographie = Math.floor((flagsMember.steganographie.length / flagsServer.steganographie.length) * 100);
const getAchievedCrackingReverse = Math.floor((flagsMember.crackingReverse.length / flagsServer.crackingReverse.length) * 100);
const getAchievedOsint = Math.floor((flagsMember.osint.length / flagsServer.osint.length) * 100);
const getAchievedWebClient = Math.floor((flagsMember.webClient.length / flagsServer.webClient.length) * 100);
const getAchievedWebServer = Math.floor((flagsMember.webServer.length / flagsServer.webServer.length) * 100);
const getAchievedMisc = Math.floor((flagsMember.misc.length / flagsServer.misc.length) * 100);
const getAchievedRealiste = Math.floor((flagsMember.realiste.length / flagsServer.realiste.length) * 100);
const getAchievedForensic = Math.floor((flagsMember.forensic.length / flagsServer.forensic.length) * 100);
const getAchievedMachine = Math.floor((flagsMember.machine.length / flagsServer.machine.length) * 100);


    async function getIconeChall() {
        const canvas = Canvas.createCanvas(1800, 250),
            ctx = canvas.getContext("2d");
        const images = [
            await Canvas.loadImage("./assets/icones/steganographie" + (getAchievedSteganographie === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/crackingReverse" + (getAchievedCrackingReverse === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/osint" + (getAchievedOsint === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/webClient" + (getAchievedWebClient === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/webServer" + (getAchievedWebServer === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/misc" + (getAchievedMisc === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/realiste" + (getAchievedRealiste === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/forensic" + (getAchievedForensic === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/machine" + (getAchievedMachine === 100 ? "_accomplie.png" : ".png"))
        ];
        let dim = 0;
        for (let i = 0; i < images.length; i++) {
            await ctx.drawImage(images[i], dim, 10, 350, 200);
            dim += 170;
        }
        return canvas.toBuffer();
    };

    const iconesChall = new AttachmentBuilder(await getIconeChall(), { name: "challenges.png" });

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setDescription(`${customStatus ? `**Statut personnalisé:** ${customStatus}` : ""}
\`\`\`👤 Informations\`\`\`
**» Name & ID:** ${member.user} - ${member.user.id}
» **Rejoint le : ** <t:${joinedTimestamp}:f>
» **Compte créé :** <t:${createdTimestamp}:f>
**»** ${activities.length > 0 ? activities.join(', ') : "**Activité :** `Aucune`"}
**» Nombre d'invitation :** \`${memberConfig.stats.invitations}\`

\`\`\`🚩 Challenges CTF\`\`\`
    
    `)

        .addFields(
            {
                name: "🖌️ Steganographie",
                value: `\`${getAchievedSteganographie} % achevé\``,
                inline: true
            },
            {
                name: "🔐 Cracking & Reverse",
                value: `\`${getAchievedCrackingReverse} % achevé\``,
                inline: true
            },
            {
                name: "🕵️‍♂️ Osint",
                value: `\`${getAchievedOsint} % achevé\``,
                inline: true
            },
            {
                name: "🌐 Web Client",
                value: `\`${getAchievedWebClient} % achevé\``,
                inline: true
            },
            {
                name: "🖥 Web Serveur",
                value: `\`${getAchievedWebServer} % achevé\``,
                inline: true
            },
            {
                name: "⚒️ Misc",
                value: `\`${getAchievedMisc} % achevé\``,
                inline: true
            },
            {
                name: "📋 Réaliste",
                value: `\`${getAchievedRealiste} % achevé\``,
                inline: true
            },
            {
                name: "🔎 Forensic",
                value: `\`${getAchievedForensic} % achevé\``,
                inline: true
            },
            {
                name: "👾 Machine",
                value: `\`${getAchievedMachine} % achevé\``,
                inline: true
            },
        )
        .setImage("attachment://challenges.png")
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() });

    return interaction.editReply({ embeds: [embed], files: [iconesChall] })
}

export async function command(client: ToolClient, message: Message, args: any) { 

    const serverConfig: any = await findServer(message.guild!.id);
    const flagsServer = serverConfig.challenge.flags;

    const memberOption = args[0]
    const member = await message.guild!.members.fetch(memberOption ? memberOption.replace('<', '').replace('>', '').replace('@', '') : message.author);

   if (member.user.bot) return message.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`)
    if (!member) return message.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`);

    const memberConfig: any = await findMember(member.guild!.id, member.id);
    const flagsMember = memberConfig.challenge.flags;


    let customStatus;
    const activities = [];
    if (member.presence) {
        for (const activity of member.presence.activities.values()) {
            switch (activity.type) {
                case 0:
                    activities.push(`**Joue :** ${activity.name}`);
                    break;
                case 2:
                    if (member.user.bot) activities.push(`**Écoute :** ${activity.name}`);
                    else activities.push(`**Écoute:** ${activity.details} par ${activity.state}`);
                    break;
                case 3:
                    activities.push(`**Regarde :**${activity.name}`);
                    break;
                case 1:
                    activities.push(`**Stream :** ${activity.name}`);
                    break;
                case 4:
                    customStatus = activity.state;
                    break;
            }
        }
    }

    const joinedTimestamp = parseInt(String(member.joinedTimestamp! / 1000));
    const createdTimestamp = parseInt(String(member.user.createdTimestamp! / 1000));

    const getAchievedSteganographie = (flagsMember.steganographie.length / flagsServer.steganographie.length) * 100
    const getAchievedCrackingReverse = (flagsMember.crackingReverse.length / flagsServer.crackingReverse.length) * 100
    const getAchievedOsint = (flagsMember.osint.length / flagsServer.osint.length) * 100
    const getAchievedWebClient = (flagsMember.webClient.length / flagsServer.webClient.length) * 100
    const getAchievedWebServer = (flagsMember.webServer.length / flagsServer.webServer.length) * 100
    const getAchievedMisc = (flagsMember.misc.length / flagsServer.misc.length) * 100
    const getAchievedRealiste = (flagsMember.realiste.length / flagsServer.realiste.length) * 100
    const getAchievedForensic = (flagsMember.forensic.length / flagsServer.forensic.length) * 100
    const getAchievedMachine = (flagsMember.machine.length / flagsServer.machine.length) * 100

    async function getIconeChall() {
        const canvas = Canvas.createCanvas(1800, 250),
            ctx = canvas.getContext("2d");
        const images = [
            await Canvas.loadImage("./assets/icones/steganographie" + (getAchievedSteganographie === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/crackingReverse" + (getAchievedCrackingReverse === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/osint" + (getAchievedOsint === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/webClient" + (getAchievedWebClient === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/webServer" + (getAchievedWebServer === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/misc" + (getAchievedMisc === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/realiste" + (getAchievedRealiste === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/forensic" + (getAchievedForensic === 100 ? "_accomplie.png" : ".png")),
            await Canvas.loadImage("./assets/icones/machine" + (getAchievedMachine === 100 ? "_accomplie.png" : ".png"))
        ];
        let dim = 0;
        for (let i = 0; i < images.length; i++) {
            await ctx.drawImage(images[i], dim, 10, 350, 200);
            dim += 170;
        }
        return canvas.toBuffer();
    };

    const iconesChall = new AttachmentBuilder(await getIconeChall(), { name: "challenges.png" });

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setDescription(`${customStatus ? `**Statut personnalisé:** ${customStatus}` : ""}
\`\`\`👤 Informations\`\`\`
**» Name & ID:** ${member.user} - ${member.user.id}
» **Rejoint le : ** <t:${joinedTimestamp}:f>
» **Compte créé :** <t:${createdTimestamp}:f>
**»** ${activities.length > 0 ? activities.join(', ') : "**Activité :** `Aucune`"}
**» Nombre d'invitation :** \`${memberConfig.stats.invitations}\`

\`\`\`🚩 Challenges CTF\`\`\`
    
    `)

        .addFields(
            {
                name: "🖌️ Steganographie",
                value: `\`${getAchievedSteganographie} % achevé\``,
                inline: true
            },
            {
                name: "🔐 Cracking & Reverse",
                value: `\`${getAchievedCrackingReverse} % achevé\``,
                inline: true
            },
            {
                name: "🕵️‍♂️ Osint",
                value: `\`${getAchievedOsint} % achevé\``,
                inline: true
            },
            {
                name: "🌐 Web Client",
                value: `\`${getAchievedWebClient} % achevé\``,
                inline: true
            },
            {
                name: "🖥 Web Serveur",
                value: `\`${getAchievedWebServer} % achevé\``,
                inline: true
            },
            {
                name: "⚒️ Misc",
                value: `\`${getAchievedMisc} % achevé\``,
                inline: true
            },
            {
                name: "📋 Réaliste",
                value: `\`${getAchievedRealiste} % achevé\``,
                inline: true
            },
            {
                name: "🔎 Forensic",
                value: `\`${getAchievedForensic} % achevé\``,
                inline: true
            },
            {
                name: "👾 Machine",
                value: `\`${getAchievedMachine} % achevé\``,
                inline: true
            },
        )
        .setImage("attachment://challenges.png")
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() });

    return message.channel!.send({ embeds: [embed], files: [iconesChall] })


}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Voir les informations d'un membre",
        category: "General",
        permissions: ["SendMessages"],
        options: [
            {
                name: "utilisateur",
                description: "Pour qui souhaitez-vous voir les informations ?",
                type: ApplicationCommandOptionType.User
            }
        ]
    }
}

