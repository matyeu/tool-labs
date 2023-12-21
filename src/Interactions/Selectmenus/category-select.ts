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
                .setDescription(" **Trouvez le FLAG dans cette image et écrivez le dans le chat pour validé ce challenge** ")
                .setImage("https://tool-labs.com/steganographie1.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'steganographie-challenge-2':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #2")
                .setDescription(" **Trouvez le FLAG dans cette l'image et écrivez le dans le chat pour validé ce challenge**")
                .setImage("https://tool-labs.com/steganographie2.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'steganographie-challenge-3':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #3")
                .setDescription(" **Trouvez le FLAG dans cet audio et écrivez le dans le chat pour validé ce challenge**\n\n [Télecharger l'audio](https://tool-labs.com/steganoaudio.mp3) ")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");
                break;
                case 'steganographie-challenge-4':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #4")
                .setDescription(" **Trouvez le FLAG dans cet audio et écrivez le dans le chat pour validé ce challenge**\n\n [Télecharger l'audio](https://tool-labs.com/steg_easy.wav) ")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");
                break;
        case 'steganographie-challenge-5':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #5")
                .setDescription(" **Trouvez le FLAG dans cette image et écrivez le dans le chat pour validé ce challenge**\n\n [Télécharger le fichier texte](https://tool-labs.com/steg.zip) ")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");
                break;

                case 'steganographie-challenge-6':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #6")
                .setDescription(" **Trouvez le FLAG dans cette image et écrivez le dans le chat pour validé ce challenge**\n\nIndice : ***AES 256 & RGB***\n\n [Télecharger l'archive](https://tool-labs.com/RGBcRYPT.rar) ")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");
                break;
                case 'steganographie-challenge-7':

            embed.setTitle("CHALLENGE STEGANOGRAPHIE #7")
                .setDescription(" **Trouvez le FLAG dans cette image et écrivez le dans le chat pour validé ce challenge**\n\nRetrouvez le flag à partir de ces techniques de stéganographie\n\n [Télecharger l'archive](https://tool-labs.com/Stegozaure.zip) ")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/dur1.png");
                break;

            
        case 'cracking-challenge-1':
            embed.setTitle("CHALLENGE CRACKING #1 ")
                .setDescription("Aie, je veux absolument ouvrir ce fichier zip mis il possède un mot de passe, tu pourrais m'aide ? \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez l'archive](https://tool-labs.com/flag.zip)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
       
        case 'osint-challenge-1':

            embed.setTitle("CHALLENGE OSINT #1")
                .setDescription("**Quelle beau batiment !**\n\n ** Pouvez-vous m'indiquer le numéro et le nom de la rue dans laquelle je suis ? ** \n\n **Ecrivez le flag en minuscule (exemple: 5ruedeparis)**")
                .setImage("https://tool-labs.com/osintxfdughygofyuodg/imageosint1.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");
            break;
        case 'osint-challenge-2':
            embed.setTitle("CHALLENGE O.S.I.N.T #2 ")
                .setDescription('**Mince... Je dois trouver une boutique spécialisé dans les panneaux solaires pour remplacer les anciens panneaux que je possède**\n\n**Pouvez-vous trouver la boutique spécialisée dans les panneaux solaire la plus proche de moi sur cette photo ? **\n\n **Ecrivez le flag en minuscule (exemple: leaderprice)**')
                .setImage("https://tool-labs.com/osintxfdughygofyuodg/imageosint2.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'osint-challenge-3':

            embed.setTitle("CHALLENGE OSINT #3")
                .setDescription("**Je suis si fatigué...** \n\n**Quel est le nom des chambres d'hôte les plus proche d'où je suis sur la photo ?** \n\n**Ecrivez le flag en minuscule (exemple: lacabaneenchantée)**")
                .setImage("https://tool-labs.com/osintxfdughygofyuodg/imageosint3.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");


            break;
        case 'osint-challenge-4':

            embed.setTitle("CHALLENGE OSINT #4")
                .setDescription("**Oupss, je suis en vacances aux phillipines mais mon ordinateur à cessé de fonctionner.** \n\n**Quel est le nom du réparateur d'ordinateur est le plus proche d'où je suis sur la photo ?** \n\n**Ecrivez le flag en minuscule (exemple: repairexpress)**")
                .setImage("https://tool-labs.com/osintxfdughygofyuodg/imageosint4.png")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/dur1.png");


            break;
        

          
        case 'misc-challenge-1':

            embed.setTitle("CHALLENGE M.I.S.C #1 ")
                .setDescription("Trouvez le flag en déchiffrant le contenu du fichier et souvenez-vous que tout est une question de hashage !\n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le](https://tool-labs.com/goodluck.txt)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'webclient-challenge-1':

            embed.setTitle("CHALLENGE [FIND FLAG] ")
                .setDescription("Scénario :\n```Je viens de télécharger un site vitrine en HTML/CSS & JS mais je ne trouve pas le flag dans le code source\nLe code est bien clair mais je n'arrive pas à le trouvé, tu m'aides ?```\n[Je suis déjà perdu](https://www.synacktiv.com/ressources/presentation_ctf_42.pdf)\n\nTrouvez le FLAG dans le code source \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis ! \n\n[Challenge WEB](https://challctf.tool-labs.com/wclientxx157fsd8f/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;

        case 'webclient-challenge-2':

            embed.setTitle("CHALLENGE [HTML OBFUSCATOR] ")
                .setDescription("Scénario :\n```Je viens de télécharger une page de maintenance en HTML mais je ne trouve pas le flag\nLe code est obfusqué mais je ne sais pas trop comment faire, tu peux m'aider ?```\n[C'est quoi l'obfuscation ?](https://code-garage.fr/blog/quest-ce-que-lobfuscation-de-code-et-a-quoi-ca-sert/)\n\nTrouvez le FLAG dans le code source \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis ! \n\n[Challenge WEB](https://challctf.tool-labs.com/wclient2xxfdgf1dg54/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;

        case 'webclient-challenge-3':

            embed.setTitle("CHALLENGE [Un cookie, pas deux !]  ")
                .setDescription("Scénario :\n```Je dois commander des cookies mais je me rend compte que seul les admins peuvent le faire\nJ'ai cru entendre qu'il était possible de manipulé des données pour me faire passer pour un admin, tu m'aides ? ```\n[C'est quoi Session Hijacking ?](https://www.vaadata.com/blog/fr/detournement-de-session-hijacking-principes-types-dattaques-et-exploitations/)\n\nTrouvez le FLAG en commandant un cookie \n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\n[Challenge WEB](https://challctf.tool-labs.com/wclient3xxdf1f2sdf4ff/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
    
        case 'webclient-challenge-4':

            embed.setTitle("CHALLENGE [JS Lock ++]  ")
                .setDescription("Scénario :\n```Essayez de débloquer le locker JS ! Le flag sera le code de déverouillage```\n[En savoir plus sur le Javascript ?](https://gregit.medium.com/ringzer0-team-online-ctf-javascript-challenges-d15d7ce44f33)\n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\nIndice : ***WebAssembly***\n\n[Challenge WEB](https://challctf.tool-labs.com/wclient4xxgfddg54fg5fg/index.html)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'webclient-challenge-5':

              embed.setTitle("CHALLENGE [Notes personelles](Moyen) ")
                .setDescription("Scénario :\n```Vous devez accèder à mes notes personnelles pour trouver le flag mais il me semble qu'elles sont protéger si vous n'êtes pas chez moi```\n[En savoir plus sur la manipulation d'en-têtes?](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)\n\nPour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !\n\nIndice : *** En-têtes***\n\n[Challenge WEB](https://challctf.tool-labs.com/wclient8xx154df15d8d1f1/index.php)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'webserver-challenge-1':

            embed.setTitle("CHALLENGE [WebServer](Facile) ")
                .setDescription("Challenge en cours de construction")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'crypto-challenge-1':

            embed.setTitle("CHALLENGE Cryptographie #1")
                .setDescription("**Commençons par les bases !**\n\n```Pouvez-vous trouver le flag en dechiffrant la clef ?```\nIndice : **Pour l'apéro c'est Bacon et Bilitère à base de T L**\n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n [Télecharger le fichier texte](https://tool-labs.com/crypto.txt) ")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
        case 'crypto-challenge-2':
            embed.setTitle("CHALLENGE Cryptographie #2")
            .setDescription("**Trouvez le flag dans le fichier text**\n\nIndice : **Le chiffrement est rail fence**  \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le fichier](https://tool-labs.com/crypt0.txt)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
             case 'crypto-challenge-3':
            embed.setTitle("CHALLENGE Cryptographie #3")
            .setDescription("**Trouvez le flag dans le fichier texte**\n\nIndice : **Morse x 64**  \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le fichier](https://tool-labs.com/otarie.txt)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
             case 'crypto-challenge-4':
            embed.setTitle("CHALLENGE Cryptographie #4")
            .setDescription("**Trouvez le flag dans le fichier texte**\n\nIndice : **Circular Bit Shift, 24,12-13,33**  \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le fichier](https://tool-labs.com/crypt0b.txt)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
             case 'crypto-challenge-5':
            embed.setTitle("CHALLENGE Cryptographie #5")
            .setDescription("**Trouvez le flag dans le fichier texte**\n\n**Enoncé :** RSA introduction, le flag sera composé des 2 derniers chiffres des valeurs e,d,p,q soit, flagTL{e,d,p,q}\n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le fichier](https://tool-labs.com/introrsa.txt)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/facile2.png");

            break;
case 'crypto-challenge-6':
            embed.setTitle("CHALLENGE Cryptographie #6")
            .setDescription("**RSA Strange Values** \n\n**Scénario : ** \n```Votre famille a été capturée par John Kramer par votre faute. Retrouvez le code permettant de déverrouiller le cadenas et de la libérer de la pièce, dans le cas contraire, vous savez ce qu'il se passera...```\n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le fichier](https://tool-labs.com/rsa.txt)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'crypto-challenge-7':
            embed.setTitle("CHALLENGE Cryptographie #7")
            .setDescription("**Trouvez le flag dans le fichier texte**\n\n En savoir plus sur la factorisation R.S.A ? \n[Documentation](https://maths.ens2m.fr/Barrere%20Remi/students/pages/projects/2001.RSA.pdf)\n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez le fichier](https://tool-labs.com/rsafacto.txt)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'crypto-challenge-8':
            embed.setTitle("CHALLENGE Cryptographie #8")
            .setDescription("**Trouvez le flag dans le fichier texte**\n\nIndice : **Vigenère, 24** \n\nTélécharger le fichier (héberger sur Tool-Labs) et trouvez le FLAG\n\n[Téléchargez l'archive](https://tool-labs.com/crypto.rar)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/moyen2.png");

            break;
        case 'suspect-challenge-1':

            embed.setTitle("CHALLENGE [OBLIGATOIRE] ")
                .setDescription("**Si vous êtes sur ce chalenge c'est que vous êtes suspecter d'avoir tricher\nPour retrouver vos rôles, veuillez validé ce challenge** \n\n Infos Challenge : *** R.C.E & Bruteforce *** \n\n **Pour réalisé ce challenge vous devez vous rendre sur un lien externe, mais rassurez-vous la totalité des fichiers sont hébérgé chez Tool-Labs.\n\nIl ne vous arrivera rien, c'est promis !**\n\n[Aller sur le challenge](https://challctf.tool-labs.com/obligatoireggfgfdikujyhgfvdsc//index.php)")
                .setColor(EMBED_GENERAL)
                .setThumbnail("https://tool-labs.com/dur1.png");

            break;
        default: return interaction.replyErrorMessage(client, `**Le topic \`${interaction.values[0]}\` est introuvable par le bot**`, true);
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