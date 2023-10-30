import { StringSelectMenuInteraction, EmbedBuilder } from "discord.js";
import { ToolClient } from "../../Library";
import { EMBED_GENERAL } from "../../config";
import { find, edit } from "../../Models/member";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient, interaction: StringSelectMenuInteraction) {

    const memberConfig: any = await find(interaction.guild!.id, interaction.user.id);

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setImage("https://cdn.discordapp.com/attachments/1166027524506140692/1166027580336521237/selectBorder.png?ex=6548fece&is=653689ce&hm=766dda6294591951dca9548ee9f1445df78d953bc4405bbc637983a94e75171f&")

    switch (interaction.values[0]) {
        case 'steganographie-challenge-1':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #1")
                .setDescription("Trouvez le FLAG dans l'image et écrivez le dans le chat pour validé ce challenge")
                .setImage("https://tool-labs.com/steganographiediscordx.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'steganographie-challenge-2':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #2")
                .setDescription("Trouvez le FLAG dans l'image et écrivez le dans le chat pour validé ce challenge")
                .setImage("https://tool-labs.com/stegano4.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'steganographie-challenge-3':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #3")
                .setDescription("Trouvez le FLAG dans l'image et écrivez le dans le chat pour validé ce challenge\nAttention il va falloir usé de plusieurs compétences")
                .setImage("https://tool-labs.com/stegano6.jpg")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'cracking-challenge-1':
            embed.setTitle("CHALLENGE CRACKING #1 ")
                .setDescription("Dans le jardin d'Eden, Adam rencontra une compagne, mais après un discret décalage, il furent séparer par les septs nains... \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez l'archive](https://tool-labs.com/Cracking.zip)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'cracking-challenge-2':

            embed.setTitle("CHALLENGE REVERSE #2 ")
                .setDescription("Qui à dit que Java était ennuyeux ?\n\nRecopiez le flag en minuscule ! \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez l'archive](https://discord.tool-labs.com/reverse/app-debug.apk)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'cracking-challenge-3':

            embed.setTitle("CHALLENGE REVERSE #3 ")
                .setDescription("Pas de description pour ce challenge !\n\nRecopiez le flag en minuscule ! \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le fichier](https://discord.tool-labs.com/reverse/debug.exe)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'osint-challenge-1':

            embed.setTitle("CHALLENGE OSINT #1")
                .setDescription("Trouvez l'endroit d'où a été prise cete photo puis écrivez le nom du café derrière moi \n\n Ecrivez le nom en minuscule et sans espace dans le chat pour validé ce challenge \n\n(ex.micromania)")
                .setImage("https://tool-labs.com/osint2.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");
            break;
        case 'osint-challenge-2':
            embed.setTitle("CHALLENGE O.S.I.N.T #2 ")
                .setDescription("Trouvez la rue d'où j'ai pris cette photo et écrivez le lieu sans espace ni minuscule dans le chat pour validé ce challenge\n\n(ex. 5ruedesbegonias)")
                .setImage("https://tool-labs.com/osint1.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'osint-challenge-3':

            embed.setTitle("CHALLENGE O.S.I.N.T #3 ")
                .setDescription("Trouvez la place d'où a été prise cette photo et écrivez le lieu sans espace ni minuscule dans le chat pour validé ce challenge\n\n(ex. 5ruedesbegonias)")
                .setImage("https://tool-labs.com/osint4.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/dur1.png");

            break;
        case 'misc-challenge-1':

            embed.setTitle("CHALLENGE M.I.S.C #1 ")
                .setDescription("Trouvez le flag dans le Q.R Code \n\nRecopiez le flag en minuscule ! \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez l'archive](https://discord.tool-labs.com/misc/qrcode.png)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'webclient-challenge-1':

            embed.setTitle("CHALLENGE [FIND FLAG] ")
                .setDescription("Scénario :\n```Je viens de télécharger un site vitrine en HTML/CSS & JS mais je ne trouve pas le flag dans le code source\nLe code est bien clair mais je n'arrive pas à le trouvé, tu m'aides ?```\n[Je suis déjà perdu](https://www.synacktiv.com/ressources/presentation_ctf_42.pdf)\n\nTrouvez le FLAG dans le code source \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis ! \n\n[Challenge WEB](https://discord.tool-labs.com/web7/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'webclient-challenge-2':

            embed.setTitle("CHALLENGE [HTML OBFUSCATOR] ")
                .setDescription("Scénario :\n```Je viens de télécharger une page de maintenance en HTML mais je ne trouve pas le flag\nLe code est obfusqué mais je ne sais pas trop comment faire, tu peux m'aider ?```\n[C'est quoi l'obfuscation ?](https://code-garage.fr/blog/quest-ce-que-lobfuscation-de-code-et-a-quoi-ca-sert/)\n\nTrouvez le FLAG dans le code source \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis ! \n\n[Challenge WEB](https://discord.tool-labs.com/web/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'webclient-challenge-3':
            embed.setTitle("CHALLENGE [Etes-vous une machine ? Un robot ? ?]  ")
                .setDescription("Scénario :\n```J'ai cru comprendre qu'en lisant les fichiers robot.txt je pouvais avoir pleins d'informations censé être protéger (ou non)\nJe sais que je dois trouvé un flag mais je sais pas faire, tu peux m'aider ?```\n[Comment se servir de robot.txt ?](https://arav02.medium.com/humanoid-traboda-web-ctf-write-up-f18413a13397)\n\nTrouve le FLAG pour validé ce challenge\n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\n[Challenge WEB](https://discord.tool-labs.com/web2/index.php)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'webclient-challenge-4':

            embed.setTitle("CHALLENGE [Un cookie, pas deux !]  ")
                .setDescription("Scénario :\n```Je devais commander des cookies mais je me rend compte que seul les admins peuvent le faire\nJe dois absolument devenir admin pour en commander , tu peux m'aider ?```\n[C'est quoi Session Hijacking ?](https://www.vaadata.com/blog/fr/detournement-de-session-hijacking-principes-types-dattaques-et-exploitations/)\n\nTrouvez le FLAG en commandant un cookie \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\n[Challenge WEB](https://discord.tool-labs.com/web1/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'webclient-challenge-5':

            embed.setTitle("CHALLENGE [Copis et colle]  ")
                .setDescription("Scénario :\n```Un ami vient de m'envoyer son site et je dois copier & coller le flag\nJe n'ai pas de souris et ma touche pour copier est cassée, tu peux m'aider ?```\n[Comment copier & coller ?](https://support.google.com/docs/answer/161768?hl=fr&co=GENIE.Platform%3DDesktop)\n\nTrouvez le FLAG et copier/coller le ici \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\n[Challenge WEB](https://discord.tool-labs.com/web3/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'webclient-challenge-6':

            embed.setTitle("CHALLENGE [JS Lock]  ")
                .setDescription("Scénario :\n```Apparement il est possible de connaître le code mais je suis pas capable de trouver les infos même dans les .txt, tu peux m'aider ?```\n[En savoir plus sur le Javascript ?](https://gregit.medium.com/ringzer0-team-online-ctf-javascript-challenges-d15d7ce44f33)\n\nTrouvez le FLAG en déverouillant le locker \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\n[Challenge WEB](https://discord.tool-labs.com/web4/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'webclient-challenge-7':

            embed.setTitle("CHALLENGE [JS Lock ++]  ")
                .setDescription("Scénario :\n```Apparement il est possible de connaître le code mais je suis pas capable de trouver les infos même dans les .txt, tu peux m'aider ?```\n[En savoir plus sur le Javascript ?](https://gregit.medium.com/ringzer0-team-online-ctf-javascript-challenges-d15d7ce44f33)\n\nTrouvez le FLAG en déverouillant le locker \n\nRecopiez le flag en minuscule ! \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\n[Challenge WEB](https://discord.tool-labs.com/web5/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'webclient-challenge-8':

            embed.setTitle("CHALLENGE [Notes personelles](Moyen) ")
                .setDescription("Trouvez le FLAG en accèdant à mes notes personnellles \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\n[Challenge WEB](https://discord.tool-labs.com/web8/index.php)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'webserver-challenge-1':

            embed.setTitle("CHALLENGE [WebServer](Facile) ")
                .setDescription("Challenge en cours de construction")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'suspect-challenge-1':

            embed.setTitle("CHALLENGE [OBLIGATOIRE] ")
                .setDescription("**Si vous êtes sur ce chalenge c'est que vous êtes suspecter d'avoir tricher\nPour retrouver vos rôles, veuillez validé ce challenge** \n\n Infos Challenge : *** R.C.E & Bruteforce *** \n\n **Pour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !**\n\n[Aller sur le challenge](https://discord.tool-labs.com/obligatoire/index.php)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/dur1.png");

            break;
        default: return interaction.replyErrorMessage(client, `**Le topic \`${interaction.values[0]}\` est introuvable par le bo**`, true);
    }

    await interaction.update({ content: null })


    const channel: any = client.channels.cache.get(interaction.channel!.id);
    const getCategory = await channel.messages.cache.get(memberConfig.challenge.lastCategoryMessageId)

    if (!getCategory) {
        await interaction.followUp({ embeds: [embed] }).then(async () => {
            memberConfig.challenge.lastCategoryMessageId = channel.lastMessageId
            await edit(interaction.guild!.id, interaction.user.id, memberConfig)
        })

    } else {
        getCategory.edit({ embeds: [embed] })
    }

}

export const select = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    }
}