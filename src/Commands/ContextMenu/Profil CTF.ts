import { ActionRowBuilder, ApplicationCommandType, AttachmentBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, Message } from "discord.js";
import { ToolClient } from "../../Library";
import { find as findServer } from "../../Models/server";
import { find as findMember } from "../../Models/member";
import { EMBED_GENERAL, EMOJIS, FOOTER } from "../../config";
import Canvas from "canvas";

export async function slash(client: ToolClient, interaction: ChatInputCommandInteraction) {

    const serverConfig: any = await findServer(interaction.guild!.id);
    const flagsServer = serverConfig.challenge.flags;

    const memberOption: any = interaction.options.get('utilisateur', false);
    const member = await interaction.guild!.members.fetch(memberOption ? memberOption.value : interaction.user);
    const isMemberId = member.id === interaction.user.id;

    if (member.user.bot) return interaction.replyErrorMessage(client, `**Impossible d'afficher le profil d'un bot !**`, true)
    if (!member) return interaction.replyErrorMessage(client, `**Le membre indiqué est introuvable par le bot !**`, true);

    const memberConfig: any = await findMember(member.guild!.id, member.id);
    const flagsMember = memberConfig.challenge.flags;
    const flagsTotal = flagsMember.steganographie.length + flagsMember.crackingReverse.length + flagsMember.osint.length + flagsMember.webClient.length + flagsMember.misc.length + flagsMember.webServer.length + flagsMember.realiste.length + flagsMember.machine.length

    const separator = new AttachmentBuilder('./assets/images/barredeseparation.png');

    const infoProfil = [];

    if (memberConfig.profil.siteWeb) infoProfil.push(`- Site web : ${memberConfig.profil.siteWeb}`);
    if (memberConfig.profil.biographie) infoProfil.push(`- Biographie : ${memberConfig.profil.biographie}`);


    const embedInfo = new EmbedBuilder()
    .setColor(memberConfig.profil.color ? memberConfig.profil.color : EMBED_GENERAL)
    .setDescription(`## ${client.getEmoji(EMOJIS.profil)} ${isMemberId ? "Mes Informations" : "Informations"}
- Statut : ${memberConfig.profil.status}
- Nombre de flags : ${flagsTotal}     
- Solde : ${memberConfig.shop.amount}     
- Nombre de messages : ${memberConfig.stats.messageCount}
- Nombre d'invitations : ${memberConfig.stats.invitations}   
${infoProfil.length > 0 ? infoProfil.join("\n") : ""}                                                                                                                                
`)
    .setImage('attachment://barredeseparation.png');

    const button = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(`profil-button:${member.id}`)
            .setEmoji(EMOJIS.avatar)
            .setLabel("Modifier votre profil")
            .setStyle(ButtonStyle.Secondary)
    );

if (!isMemberId) embedInfo.setAuthor({ name: `${member.displayName} - ${member.id}`, iconURL: member.user.displayAvatarURL() });

const embedValidate = new EmbedBuilder()
.setColor(memberConfig.profil.color ? memberConfig.profil.color : EMBED_GENERAL)
.setDescription(`## ${client.getEmoji(EMOJIS.valid)} ${isMemberId ? "Mes Progressions" : "Progressions"}`)
.setImage('attachment://validations.png')
.setTimestamp()
.setFooter({ text: FOOTER, iconURL: client.user!.displayAvatarURL() })

const canvas = Canvas.createCanvas(700, 355)
const ctx = canvas.getContext('2d');

// Cercle extérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(125, 100, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#F5F5F5'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cercle intérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(265, 100, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#f2f2f2'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cercle intérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(410, 100, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#f2f2f2'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cercle intérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(545, 100, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#f2f2f2'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cercle extérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(125, 215, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#F5F5F5'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cercle intérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(265, 215, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#f2f2f2'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cercle intérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(410, 215, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#f2f2f2'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Cercle intérieur vide avec fond intérieur gris clair
ctx.beginPath();
ctx.arc(545, 215, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#f2f2f2'; // Fond intérieur gris clair
ctx.fill();
ctx.strokeStyle = '#CCCCCC';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

const emoji1 = await Canvas.loadImage('./assets/images/profil/steganographie.png');
ctx.drawImage(emoji1, 125 - 25, 100 - 25, 50, 50);

const emoji2 = await Canvas.loadImage('./assets/images/profil/cracking.png');
ctx.drawImage(emoji2, 265 - 25, 100 - 25, 50, 50);

const emoji3 = await Canvas.loadImage('./assets/images/profil/osint.png')
ctx.drawImage(emoji3, 410 - 25, 100 - 25, 50, 50);

const emoji4 = await Canvas.loadImage('./assets/images/profil/webClient.png');
ctx.drawImage(emoji4, 545 - 25, 100 - 25, 50, 50);

const emoji5 = await Canvas.loadImage('./assets/images/profil/webServer.png');
ctx.drawImage(emoji5, 125 - 25, 215 - 25, 50, 50);
const emoji6 = await Canvas.loadImage('./assets/images/profil/misc.png');
ctx.drawImage(emoji6, 265 - 25, 215 - 25, 50, 50);
const emoji7 = await Canvas.loadImage('./assets/images/profil/realiste.png');
ctx.drawImage(emoji7, 410 - 25, 215 - 25, 50, 50);
const emoji8 = await Canvas.loadImage('./assets/images/profil/machine.png');
ctx.drawImage(emoji8, 545 - 25, 215 - 25, 50, 50);


const getAchievedSteganographie = Math.floor((flagsMember.steganographie.length / flagsServer.steganographie.length) * 100) / 100;
const getAchievedCrackingReverse = Math.floor((flagsMember.crackingReverse.length / flagsServer.crackingReverse.length) * 100) / 100;
const getAchievedOsint = Math.floor((flagsMember.osint.length / flagsServer.osint.length) * 100) / 100
const getAchievedWebClient = Math.floor((flagsMember.webClient.length / flagsServer.webClient.length) * 100) / 100;
const getAchievedWebServer = Math.floor((flagsMember.webServer.length / flagsServer.webServer.length) * 100) / 100;
const getAchievedMisc = Math.floor((flagsMember.misc.length / flagsServer.misc.length) * 100) / 100;
const getAchievedRealiste = Math.floor((flagsMember.realiste.length / flagsServer.realiste.length) * 100) / 100;
const getAchievedMachine = Math.floor((flagsMember.machine.length / flagsServer.machine.length) * 100) / 100;

// Progression sur le cercle extérieur
ctx.beginPath();
ctx.arc(125, 100, 50, 1.5 * Math.PI, (1.5 + 2 * getAchievedSteganographie) * Math.PI, false);
ctx.strokeStyle = '#61d18b'; // Couleur de la progression
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

// Progression sur le cercle intérieur
ctx.beginPath();
ctx.arc(265, 100, 50, 1.5 * Math.PI, (1.5 + 2 * getAchievedCrackingReverse) * Math.PI, false);
ctx.strokeStyle = '#61d18b'; // Couleur de la progression
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(410, 100, 50, 1.5 * Math.PI, (1.5 + 2 * getAchievedOsint) * Math.PI, false);
ctx.strokeStyle = '#61d18b'; // Couleur de la progression
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(545, 100, 50, 1.5 * Math.PI, (1.5 + 2 * getAchievedWebClient) * Math.PI, false);
ctx.strokeStyle = '#61d18b'; // Couleur de la progression
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();


const progressBarWidth = 600;
const progressBarHeight = 20;
const progressBarX = (canvas.width - progressBarWidth) / 2;
const progressBarY = 300;
const progress = (getAchievedSteganographie + getAchievedCrackingReverse + getAchievedOsint + getAchievedWebClient + getAchievedWebServer + getAchievedMisc + getAchievedRealiste  + getAchievedMachine) / 8;

ctx.fillStyle = '#032133';
ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

ctx.fillStyle = '#61d18b';
ctx.fillRect(progressBarX, progressBarY, progressBarWidth * progress, progressBarHeight);

ctx.fillStyle = '#ffffff';
ctx.font = '16px Arial';  // Police et taille du texte
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
const percentageText = Math.round(progress * 100) + '%';
ctx.fillText(percentageText, progressBarX + progressBarWidth / 2, progressBarY + progressBarHeight / 2);


const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'validations.png' });


return interaction.reply({ embeds: [embedInfo, embedValidate], files: [separator, attachment], components: isMemberId ? [button] : [] });
}


export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        category: "General",
        permissions: ["SendMessages"],
        type: ApplicationCommandType.User,
    }
}

