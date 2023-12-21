import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ToolClient, capitalize } from "../../Library";
import { findServer } from "../../Models/member";
import { find, edit } from "../../Models/member";
import { EMBED_INFO, FOOTER, EMOJIS, EMBED_GENERAL, FOOTER_CTF } from "../../config";

const Logger = require("../../Library/logger");


export async function updateClassement(client: ToolClient, interaction: ButtonInteraction) {

    const memberServerConfig: any = await findServer(interaction.guild!.id);
    let memberConfig: any = await find(interaction.guild!.id, interaction.user.id)
    let i = 0;

    const date = (Date.now()) / 1000;
    const timeStamp = date.toString().split('.')[0];


    const classementCd = 60000; // 1 minutes
    let classementLast = await memberConfig.cooldowns.classement;
    let timeClassementCd = classementCd - (Date.now() - classementLast);

    if (classementLast !== null && classementCd - (Date.now() - classementLast) > 0) {
        return interaction.replyErrorMessage(client, `**Merci de patienter  : \`${Math.floor(timeClassementCd / (1000 * 60) % 60)}\` minute(s) \`${Math.floor(timeClassementCd / (1000) % 60)}\` seconde(s) pour re actualiser.**`, true);
    }

    memberConfig.cooldowns.classement = Date.now();
    await edit(interaction.guild!.id, interaction.user.id, memberConfig)


    let button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("classement-button")
                .setEmoji(EMOJIS.refreshclassement)
                .setLabel("Actualiser le classement")
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(`Classement C.T.F`)
        .setDescription(`**Les membres sont classés par nombre de flags validé, du plus grand au plus petit.**\n----------------------`)
        .setThumbnail('https://tool-labs.com/classement1.png')
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL({ extension: "png" }) })
    const sortedClassement = memberServerConfig.sort((a: any, b: any) =>
        a.challenge.flags.steganographie.length + a.challenge.flags.crackingReverse.length + a.challenge.flags.osint.length + a.challenge.flags.webClient.length + a.challenge.flags.misc.length
            + a.challenge.flags.webServer.length + a.challenge.flags.realiste.length + a.challenge.flags.machine.length < b.challenge.flags.steganographie.length
            + b.challenge.flags.crackingReverse.length + b.challenge.flags.osint.length + b.challenge.flags.webClient.length + b.challenge.flags.misc.length + b.challenge.flags.webServer.length
            + b.challenge.flags.realiste.length  + b.challenge.flags.machine.length ? 1 : -1
    );
    for (const e of sortedClassement.splice(0, 10)) {

        let member = await interaction.guild?.members.fetch(e.userId)!;
        const emojiArray = [`${client.getEmoji(EMOJIS.premier)}`, `${client.getEmoji(EMOJIS.deuxieme)}`, `${client.getEmoji(EMOJIS.troisieme)}`];

        memberConfig = await find(interaction.guild!.id, member.id)

        const flags = memberConfig.challenge.flags;
        const flagsTotal = flags.steganographie.length + flags.crackingReverse.length + flags.osint.length + flags.webClient.length + flags.misc.length + flags.webServer.length + flags.realiste.length + flags.machine.length

        const flagTop = [
            { name: 'steganographie', data: flags.steganographie.length },
            { name: 'crackingReverse', data: flags.crackingReverse.length },
            { name: 'osint', data: flags.osint.length },
            { name: 'webClient', data: flags.webClient.length },
            { name: 'misc', data: flags.misc.length },
            { name: 'webServer', data: flags.webServer.length },
            { name: 'cryptographie', data: flags.realiste.length },
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
    return interaction.update({ embeds: [embed], components: [button] })

}

export async function candidatureModal(client: ToolClient, interaction: ButtonInteraction) {

    const modalSuggestion: any = new ModalBuilder()
        .setCustomId('candidature-modal')
        .setTitle('Menu de candidature');

    const descriptionWeb = new TextInputBuilder()
        .setCustomId('descriptionWeb')
        .setLabel("Decrivez-vous simplement")
        .setPlaceholder('Décrivez-vous sans ruiner votre OPSEC')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(50)
        .setRequired(true);

    const descriptionCompt = new TextInputBuilder()
        .setCustomId('descriptionCompt')
        .setLabel("Description de vos compétences")
        .setPlaceholder('Décrivez vos compétences en tant que modérateur mais aussi vos experiences informatique')
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(50)
        .setRequired(true);

    const age = new TextInputBuilder()
        .setCustomId('age')
        .setLabel("ÂGE")
        .setPlaceholder('Renseignez votre âge')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(2)
        .setRequired(true);

    const descriptionWhy = new TextInputBuilder()
        .setCustomId('descriptionWhy')
        .setLabel("Case Libre")
        .setPlaceholder('Ecrivez ce qui vous semble important cette case est optionnelle et libre')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    const descriptionRow = new ActionRowBuilder().addComponents(descriptionWeb);
    const descriptionCompRow = new ActionRowBuilder().addComponents(descriptionCompt);
    const ageRow = new ActionRowBuilder().addComponents(age);
    const whyRow = new ActionRowBuilder().addComponents(descriptionWhy);


    modalSuggestion.addComponents(descriptionRow, descriptionCompRow, ageRow, whyRow);

    await interaction.showModal(modalSuggestion);

    Logger.button(`The ${interaction.customId} button was used by ${interaction.user.username} on the ${interaction.guild?.name} server.`);
}

export async function missionModal(client: ToolClient, interaction: ButtonInteraction) {

    const modalSuggestion: any = new ModalBuilder()
        .setCustomId('mission-modal')
        .setTitle('Menu de Mission');

    const titleMission = new TextInputBuilder()
        .setCustomId('titleMission')
        .setLabel("Titre de la mission")
        .setPlaceholder("Comment voulez-vous nommé votre mission")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const descriptionMission = new TextInputBuilder()
        .setCustomId('descriptionMission')
        .setLabel("Description de la mission")
        .setPlaceholder("Soyez le plus précis possible pour avoir des réponses plus rapides et sérieuses")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(50)
        .setRequired(true);

    const price = new TextInputBuilder()
        .setCustomId('price')
        .setLabel("Prix")
        .setPlaceholder("Si la mission est non rémunerée laissez ce champ vide")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);


    const titleRow = new ActionRowBuilder().addComponents(titleMission);
    const descriptionRow = new ActionRowBuilder().addComponents(descriptionMission);
    const priceRow = new ActionRowBuilder().addComponents(price);


    modalSuggestion.addComponents(titleRow, descriptionRow, priceRow);

    await interaction.showModal(modalSuggestion);

    Logger.button(`The ${interaction.customId} button was used by ${interaction.user.username} on the ${interaction.guild?.name} server.`);
}



export async function pagesDocumentation(client: ToolClient, interaction: ButtonInteraction) {

    const getPage: any = interaction.customId.split("-")[0]

    const embedHome = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle("Documentation C.T.F")
        .setDescription(`${client.getEmoji(EMOJIS.information)} **Vous trouverez ici la documentation qui concerne les challenges C.T.F **
       

${client.getEmoji(EMOJIS.uno)} **Les FLAGS doivent être écris dans votre salon C.T.F privé, le bot réagira si vous trouvez le bon flag.
Si un flag est composé de cette manière TL{flagtest} , le flag sera ainsi flagtest

    

${client.getEmoji(EMOJIS.deux)} Tous les challenges sont testés et fonctionnels, et nous ne donnons
 aucun indice(s) supplémentaire(s)
Si un challenge ne vous donne pas d'indice dans la trame, cela veut dire que le challenge est réalisable sans, soyez attentif.

    

${client.getEmoji(EMOJIS.trois)} Si vous validé un challenge et que vous ne gagniez aucun rôle, ou récompenses c'est normal !
Tous les challenges n'offre pas de récompense(s).
    


${client.getEmoji(EMOJIS.quatre)} Vous pouvez consulter vos données ainsi que celles des autres participants CTF en tapant la commande :**

    \`\`\`/profil + utilisateur\`\`\`
`)
        .setFooter({ text: FOOTER_CTF, iconURL: client.user!.displayAvatarURL({ extension: "png" }) })

    const buttonsHome = new ActionRowBuilder<ButtonBuilder>()
    buttonsHome.addComponents(
        new ButtonBuilder()
            .setCustomId(`page1-button`)
            .setLabel("Page précédente")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)
    ).addComponents(
        new ButtonBuilder()
            .setCustomId(`page2-button`)
            .setLabel("Page suivante")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(false)
    );

    let embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)

    let buttons = new ActionRowBuilder<ButtonBuilder>()


    if (getPage === "page1") {
        embed = embedHome
        buttons = buttonsHome;

    }
    else if (getPage === "page2") {
        embed.setTitle("Informations complémentaires C.T.F")
        embed.setDescription(`${client.getEmoji(EMOJIS.information)} **Vous trouverez ici les informations complémentaires qui concerne les challenges C.T.F 
        

${client.getEmoji(EMOJIS.uno)} Si vous avez un challenge à nous soumettre veuillez ouvrir un ticket dans 
<#1151868897545420872> afin qu'il soit testé & approuvé puis posté.
    


${client.getEmoji(EMOJIS.deux)} Le système de C.T.F est constement mis à jour, restez informer des nouveautées pour update votre salon C.T.F



${client.getEmoji(EMOJIS.trois)} Utilisez la commande ci-dessous pour nous faire part d'amélioration(s) que tu aimerais voir. 
[L'ensemble des utilisateurs voteront et nous ajouteront vos demandes en conséquence]**


\`\`\`/suggest + votre suggestion\`\`\`
`)

        buttons.addComponents(
            new ButtonBuilder()
                .setCustomId(`page1-button`)
                .setLabel("Page précédente")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        ).addComponents(
            new ButtonBuilder()
                .setCustomId(`page3-button`)
                .setLabel("Page suivante")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        );

    } else {
        embed.setTitle("Règlement C.T.F")
        embed.setDescription(`${client.getEmoji(EMOJIS.information)} **Vous trouverez ici les règles qui concerne les challenges C.T.F **
        

${client.getEmoji(EMOJIS.uno)} **Les FLAGS changent de temps en temps.
  [Le partage de solution est interdit] & [Les demandes de flags en privé sont interdits] , si nous constatons que cette règle est outrepassé le bannissement sera immédiat.



${client.getEmoji(EMOJIS.deux)} Si l'équipe de Tool-Labs suspecte une triche, nous sommes en droit de vous imposer un challenges.
 Pendant ce temps vous serez isoler de l'ensemble du serveur avant de retrouver vos rôles si le challenge est réussi.



${client.getEmoji(EMOJIS.trois)} Le classement n'est pas un moyen de trashtalk les autres utilisateurs, on avance tous à une vitesse différente, ne l'oubliez pas.**
`)
        buttons.addComponents(
            new ButtonBuilder()
                .setCustomId(`page2-button`)
                .setLabel("Page précédente")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        ).addComponents(
            new ButtonBuilder()
                .setCustomId(`page3-button`)
                .setLabel("Page suivante")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
        );
    }

    const embedMessage = await interaction.update({ embeds: [embed], components: [buttons] });
    setTimeout(() => { embedMessage.edit({ embeds: [embedHome], components: [buttonsHome] }) }, 180000)
};