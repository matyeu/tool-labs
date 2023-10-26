import {ToolClient} from "../../Library";
import {Message, TextChannel} from "discord.js";
import path from "path";

const fs = require("fs");
const {toHTML} = require('discord-markdown');

const head = `<html lang="fr">
<head>
<title>Transcript</title>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {font-family: Whitney, sans-serif; background-color: #36393e; color: #dcddde;}
.title {border-bottom: 1px solid #666; padding-left: 10px;}
.chatlog {padding: 10px;}
.message {margin-top: 5px; padding-bottom: 10px;}
.username {text-decoration: underline white; font-size: 110%; font-weight: 500; padding-right: 10px; white-space: nowrap;}
.md {min-width: 0; line-height: 1.3;}
.timestamp {font-size: 75%; color: #666; margin-left: 10px; vertical-align: bottom;}
.d-emoji {width: 40px; height:40px;}
img:not(.d-emoji) {display:block;}
/** TODO
faire différent styles pour les mentions
*/
.mention {background-color: rgba(81,191,202, 0.8)}
</style>
<style>
@font-face{font-family:Whitney;src:url(https://discordapp.com/assets/6c6374bad0b0b6d204d8d6dc4a18d820.woff);font-weight:300}
@font-face{font-family:Whitney;src:url(https://discordapp.com/assets/e8acd7d9bf6207f99350ca9f9e23b168.woff);font-weight:400}
@font-face{font-family:Whitney;src:url(https://discordapp.com/assets/3bdef1251a424500c1b3a78dea9b7e57.woff);font-weight:500}
@font-face{font-family:Whitney;src:url(https://discordapp.com/assets/be0060dafb7a0e31d2a1ca17c0708636.woff);font-weight:600}
@font-face{font-family:Whitney;src:url(https://discordapp.com/assets/8e12fb4f14d9c4592eb8ec9f22337b04.woff);font-weight:700}
</style>
</head>
`

export default async function transcript(client: ToolClient, messageCollection: Message[], callback: Function) {
    let htmlText = head + "  <body>\n";
    const channelName = (<TextChannel>messageCollection[0].channel).name
    htmlText += `    <div class="title">
    <h2>${channelName}</h2>
                 </div>
                 <div class="chatlog">
    `
    let htmlMessages = "";
    for (const message of messageCollection) {
        const timestamp = new Date(message.createdTimestamp)
        let link = "";
        if (message.attachments.map(attachment => attachment).length > 0) {
            link = `<img src="${message.attachments.map(attachment => attachment)[0].url}" alt="">`
        }
        let htmlMessage = toHTML(message.content, {
            embed: true,
            escapeHTML: true,
            discordCallback: {
                user: (node:any) => `<span class="mention">@${client.users.cache.get(node.id)?.tag}</span>`,
                channel: (node:any) => `<span class="mention">#${(<TextChannel>client.channels.cache.get(node.id)).name}</span>`,
                role: (node:any) => {
                    let guild = client.guilds.cache.find((g) => g.roles.cache.get(node.id) !== undefined);
                    let role = guild?.roles.cache.get(node.id);
                    return `<span class="mention" style="background-color: ${role?.hexColor}">@${role?.name}</span>`
                }
            }
        });
        htmlMessages = `      <div class="message">
        <span class="username">${message.author.tag}</span>
                        <span class="timestamp">${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} à ${timestamp.getHours()}h${('0' + timestamp.getMinutes()).slice(-2)}</span>
                                                    <div class="md">${htmlMessage}</div>
        ${link}
        </div>
        ` + htmlMessages
    }
    htmlText += htmlMessages + `    </div>
    </body>
    </html>`
    let filePath = path.resolve(__dirname, `Transcripts/${channelName}.html`);
    fs.writeFile(filePath, htmlText, (err:any) => {
        if (err) return console.error(err)
        callback(filePath)
    })
}