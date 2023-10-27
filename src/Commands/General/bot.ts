import { AttachmentBuilder, CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { ToolClient } from "../../Library";
import { EMBED_GENERAL, FOOTER } from "../../config";
import moment from "moment";

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const copyrightPicture = new AttachmentBuilder('./assets/images/copyright.png', { name: "copyright.png" });

    const pck = require("../../../package.json");
    const versionBot = pck.version;
    const author = pck.author;

    const d = moment.duration(interaction.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} jour(s)`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} heure(s)`;
    const date = moment().subtract(d, 'ms').format('DD/MM/YYYY');

    const embed = new EmbedBuilder()
    .setColor(EMBED_GENERAL)
    .setDescription(`\`\`\`👤 Informations\`\`\`
**» Name & ID:** ${client?.user} - ${client.user?.id}
**» Slash Command:** \`/\`
**» Préfix:** \`!\`
**» Créateur:** <@916444775861850175> & <@219593025817411585>
**» Version:** \`${versionBot}\`

\`\`\`📊 Statistiques\`\`\`
**» Dernier redémarrage:** \`${days}\ et ${hours}\`
**» Dernière update:** \`${date}\`

**» Nombre de commande :** \`${client.slashCommands.size}\`

\`\`\`📜 Ressources\`\`\`
**» Librairie / Environment:** [Discord.js v14](https://discord.js.org/#/docs/main/stable/general/welcome) | [Node.js v18.0.0](https://nodejs.org/fr/)
**» Database:** [Mongoose](https://mongodb.com)

**Developed with ❤️ by \`${author} & zulu\`**`)
    .setImage("attachment://copyright.png")
    .setTimestamp()
    .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL()})

    return interaction.reply({embeds: [embed], files: [copyrightPicture]})
}
export async function command(client: ToolClient, message: Message, args: any) {

    const copyrightPicture = new AttachmentBuilder('./assets/images/copyright.png', { name: "copyright.png" });

    const pck = require("../../../package.json");
    const versionBot = pck.version;
    const author = pck.author;

    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} jour(s)`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} heure(s)`;
    const date = moment().subtract(d, 'ms').format('DD/MM/YYYY');

    const embed = new EmbedBuilder()
    .setColor(EMBED_GENERAL)
    .setDescription(`\`\`\`👤 Informations\`\`\`
**» Name & ID:** ${client?.user} - ${client.user?.id}
**» Slash Command:** \`/\`
**» Préfix:** \`!\`
**» Créateur:** <@916444775861850175> & <@219593025817411585>
**» Version:** \`${versionBot}\`

\`\`\`📊 Statistiques\`\`\`
**» Dernier redémarrage:** \`${days}\ et ${hours}\`
**» Dernière update:** \`${date}\`

**» Nombre de commande :** \`${client.slashCommands.size}\`

\`\`\`📜 Ressources\`\`\`
**» Librairie / Environment:** [Discord.js v14](https://discord.js.org/#/docs/main/stable/general/welcome) | [Node.js v18.0.0](https://nodejs.org/fr/)
**» Database:** [Mongoose](https://mongodb.com)

**Developed with ❤️ by \`${author} & zulu\`**`)
    .setImage("attachment://copyright.png")
    .setTimestamp()
    .setFooter({text: FOOTER, iconURL: client.user?.displayAvatarURL()})

    return message.channel.send({embeds: [embed], files: [copyrightPicture]})
}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Affiches les informations du bot",
        category: "General",
        permissions: ["SendMessages"],
    }
}