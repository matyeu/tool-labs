import { ToolClient } from "../../Library";
import { CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { EMBED_INFO, FOOTER } from "../../config";

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const start = Date.now();
    interaction.reply({ content: "Pong !" }).then(() => {

        const end = Date.now();
        const time = end - start;

        const botLatency = `${'```js'}\n ${Math.round(time)} ms ${'```'}`
        const apiLatency = `${'```js'}\n ${interaction.createdTimestamp - interaction.createdTimestamp} ms ${'```'}`

        const embed = new EmbedBuilder()
            .setColor(EMBED_INFO)
            .setTitle("🏓 | Temps de réponses")
            .addFields(
                { name: "Latence du bot", value: botLatency, inline: true },
                { name: "Latence de l'api", value: apiLatency, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() });

        interaction.editReply({ content: null, embeds: [embed] });
    });

}

export async function command(client: ToolClient, message: Message, args: any) {

    const tryPong = await message.channel.send("Pong !");

    const botLatency = `${'```js'}\n ${client.ws.ping} ms ${'```'}`
    const apiLatency = `${'```js'}\n ${tryPong.createdTimestamp - message.createdTimestamp} ms ${'```'}`

    const embed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setTitle("🏓 | Temps de réponses")
        .addFields(
            { name: "Latence du bot", value: botLatency, inline: true },
            { name: "Latence de l'api", value: apiLatency, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() });

    tryPong.edit({ content: ' ', embeds: [embed] });
}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Affiches les latences du bot",
        category: "Development",
        permissions: ["SendMessages"],
    }
}

