import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from "discord.js";
import { ToolClient, researchArray } from "../../Library";
import { find as findServer } from "../../Models/server";
import { find as findMember, edit as editMember } from "../../Models/member";
import { EMBED_INFO, FOOTER_CTF } from "../../config";

export default async function (client: ToolClient, message: Message) {

    if (message.author.bot) return;

    const serverConfig: any = await findServer(message.guild!.id);
    const memberConfig: any = await findMember(message.guild!.id, message.author.id);

    const member = await message.guild!.members.fetch(message.author.id);

    const channelSend: any = await message.guild?.channels.fetch(message.channel.id);

    if (channelSend?.name?.includes('chall-ctf')) {

        message.delete();

        if (channelSend.topic === `(TOOL-LABS:${member.id})`) {

            const flagsSteganographie = serverConfig.challenge.flags.steganographie
            const getFlagSteganographie = flagsSteganographie.find((e: any) => e.name == message.content);

            const flagsCrackingReverse = serverConfig.challenge.flags.crackingReverse
            const getFlagCrackingReverse = flagsCrackingReverse.find((e: any) => e.name == message.content);

            const flagsOsint = serverConfig.challenge.flags.osint
            const getFlagosint = flagsOsint.find((e: any) => e.name == message.content);

            const flagsWebClient = serverConfig.challenge.flags.webClient
            const getFlagWebClient = flagsWebClient.find((e: any) => e.name == message.content);

            const flagsMisc = serverConfig.challenge.flags.misc
            const getFlagMisc = flagsMisc.find((e: any) => e.name == message.content);

            const flagsWebServer = serverConfig.challenge.flags.webServer
            const getFlagWebServer = flagsWebServer.find((e: any) => e.name == message.content);

            const flagsRealiste = serverConfig.challenge.flags.realiste
            const getFlagRealiste = flagsRealiste.find((e: any) => e.name == message.content);

            const flagsForensic = serverConfig.challenge.flags.forensic
            const getFlagForensic = flagsForensic.find((e: any) => e.name == message.content);

            const flagsMachine = serverConfig.challenge.flags.machine
            const getFlagMachine = flagsMachine.find((e: any) => e.name == message.content);


            const embedInfo = new EmbedBuilder()
                .setColor(EMBED_INFO)

            const embed = new EmbedBuilder()
                .setColor(EMBED_INFO)
                .setAuthor({ name: member.displayName, iconURL: member?.displayAvatarURL({ extension: "png" }) })
                .setThumbnail('https://ctftime.org/media/events/LOGO_CTF_nohand.png')
                .setTimestamp()
                .setFooter({ text: FOOTER_CTF, iconURL: client.user!.displayAvatarURL({ extension: "png" }) })


            const button = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("flags-button")
                        .setEmoji("📝")
                        .setLabel("Voir mes flags enregistrés")
                        .setStyle(ButtonStyle.Primary)
                );


            if (getFlagSteganographie) {
                const arrayFlags = memberConfig.challenge.flags.steganographie
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagSteganographie.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagSteganographie.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagSteganographie.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagSteganographie.name);
                if (getFlagSteganographie.amount) memberConfig.shop.amount += getFlagSteganographie.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            } else if (getFlagCrackingReverse) {
                const arrayFlags = memberConfig.challenge.flags.crackingReverse
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagCrackingReverse.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagCrackingReverse.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagCrackingReverse.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagCrackingReverse.name);
                if (getFlagCrackingReverse.amount) memberConfig.shop.amount += getFlagCrackingReverse.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            } else if (getFlagosint) {
                const arrayFlags = memberConfig.challenge.flags.osint
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagosint.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagosint.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagosint.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagosint.name);
                if (getFlagosint.amount) memberConfig.shop.amount += getFlagosint.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            } else if (getFlagWebClient) {
                const arrayFlags = memberConfig.challenge.flags.webClient
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagWebClient.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagWebClient.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagWebClient.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagWebClient.name);
                if (getFlagWebClient.amount) memberConfig.shop.amount += getFlagWebClient.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            }
            else if (getFlagMisc) {
                const arrayFlags = memberConfig.challenge.flags.misc
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagMisc.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagMisc.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagMisc.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagMisc.name);
                if (getFlagMisc.amount) memberConfig.shop.amount += getFlagMisc.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            } else if (getFlagWebServer) {
                const arrayFlags = memberConfig.challenge.flags.webServer
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagWebServer.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagWebServer.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagWebServer.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagWebServer.name);
                if (getFlagWebServer.amount) memberConfig.shop.amount += getFlagWebServer.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            } else if (getFlagRealiste) {
                const arrayFlags = memberConfig.challenge.flags.realiste
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagRealiste.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagRealiste.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagRealiste.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagRealiste.name);
                if (getFlagRealiste.amount) memberConfig.shop.amount += getFlagRealiste.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            } else if (getFlagForensic) {
                const arrayFlags = memberConfig.challenge.flags.forensic
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagForensic.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagForensic.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagForensic.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagForensic.name);
                if (getFlagForensic.amount) memberConfig.shop.amount += getFlagForensic.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            } else if (getFlagMachine) {
                const arrayFlags = memberConfig.challenge.flags.machine
                const getFlag: boolean = researchArray(message.content, arrayFlags);
                const getRole = client.getRole(member.guild, getFlagMachine.role)

                if (getFlag) return message.channel.send({ embeds: [embedInfo.setDescription(`**Le flag \`${getFlagMachine.name}\` est déjà enregistré sur votre compt**`)] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });

                if (getRole) await member.roles.add(getRole)

                embed.setDescription(`${member.displayName}, vous avez un nouveau flag sauvegardé\n\n Le FLAG "**${getFlagMachine.name}**" est enregistré\n\nCliquer sur le bouton du dessous pour afficher le reste`);

                arrayFlags.push(getFlagMachine.name);
                if (getFlagMachine.amount) memberConfig.shop.amount += getFlagMachine.amount;

                await editMember(member.guild.id, member.id, memberConfig);

                return message.channel.send({ embeds: [embed], components: [button] }).then((msg: Message) => {
                    setTimeout(async () => { await msg.delete() }, 5000);
                });
            }

        }

    } else if (channelSend?.name?.includes('suspect-')) {

        message.delete();

        const flagsSuspect = serverConfig.challenge.flags.suspect
        const getSuspect = flagsSuspect.find((e: any) => e.name == message.content);

        if (getSuspect) {
            await member.roles.remove(serverConfig.roles.suspect);
            await member.roles.add(serverConfig.roles.member);

            const embed = new EmbedBuilder()
                .setColor(EMBED_INFO)
                .setAuthor({ name: member.displayName, iconURL: member?.displayAvatarURL({ extension: "png" }) })
                .setThumbnail('https://ctftime.org/media/events/LOGO_CTF_nohand.png')
                .setDescription(`**Félicitation, vous n'êtes plus suspect !**`)
                .setTimestamp()
                .setFooter({ text: FOOTER_CTF, iconURL: client.user!.displayAvatarURL({ extension: "png" }) })

            return message.channel.send({ embeds: [embed] }).then((msg: Message) => {
                setTimeout(async () => {
                    await msg.delete();
                    await message.channel.delete();

                }, 5000);
            });
        }
    }
}