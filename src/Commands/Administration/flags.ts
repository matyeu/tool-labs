import { ApplicationCommandOptionType, CommandInteraction, Message } from "discord.js";
import { ToolClient } from "../../Library";
import { edit, find } from "../../Models/server";

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const serverConfig: any = await find(interaction.guild!.id);

    const nameOption = interaction.options.get('nom', true).value as string;
    const categoryOption = interaction.options.get('catégorie', true).value as string;

    const arrayFlags =  serverConfig.challenge.flags[categoryOption];
    const getFlag = arrayFlags.find((e: any) => e.name == nameOption);

    //@ts-ignore
    switch (interaction.options.getSubcommand(false)) {
        case 'ajout': 
        const roleOption: any = interaction.options.get('rôle', false);
        const amountOption: any = interaction.options.get('montant', false);

        if (getFlag) return interaction.replyErrorMessage(client, `Le flag **${nameOption}** est déjà présent dans la base de données`, true);
        
        arrayFlags.push({name: nameOption, role: roleOption ? roleOption.value : "", amount: amountOption ? amountOption.value : 0});
        await edit(interaction.guild!.id, serverConfig);

        await interaction.replySuccessMessage(client, `Le flag **${nameOption}** a été ajouté, avec comme rôle : ${roleOption ? `<@&${roleOption.value}>` : "`Aucun`"} `, true);
        break;
        case 'supprimer': 

        if (!getFlag) return interaction.replyErrorMessage(client, `Le flag **${nameOption}** est introuvanle dans la base de données`, true);
        
        arrayFlags.remove(getFlag);
        await edit(interaction.guild!.id, serverConfig);

        await interaction.replySuccessMessage(client, `Le flag **${nameOption}** a été supprimé `, true);
        break;
        //@ts-ignore
        default: return interaction.replyErrorMessage(client, `La fonctionalité **${interaction.options.getSubcommand(false)}**`)
        
    }

}

export async function command(client: ToolClient, message: Message, args: any) {}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Permet d'ajouter ou supprimer des flags",
        category: "Administration",
        permissions: ["Administrator"],
        options: [
            {
                name: "ajout",
                type: ApplicationCommandOptionType.Subcommand,
                description: "Permet l'ajout de flag.",
                options: [
                    {
                        name: "nom",
                        description: "Nom du flags",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "catégorie",
                        description: "Catégorie du flags",
                        type: ApplicationCommandOptionType.String,
                        choices: [
                            {name: "Steganographie", value: "steganographie"},
                            {name: "Cracking & Reverse", value: "crackingReverse"},
                            {name: "Osint", value: "osint"},
                            {name: "Web Client", value: "webClient"},
                            {name: "Web Serveur", value: "webServer"},
                            {name: "MISC", value: "misc"},
                            {name: "Réaliste", value: "realiste"},
                            {name: "Forensic", value: "forensic"},
                            {name: "Machine", value: "machine"},
                            {name: "Suspect", value: "suspect"},
                        ],
                        required: true
                    },
                    {
                        name: "rôle",
                        description: "Rôle du flags",
                        type: ApplicationCommandOptionType.Role,
                        required: false
                    },
                    {
                        name: "montant",
                        description: "Montant du flag",
                        type: ApplicationCommandOptionType.Number,
                        required: false
                    }
                ]
            },
            {
                name: "supprimer",
                type: ApplicationCommandOptionType.Subcommand,
                description: "Permet la suppression de flag.",
                options: [
                    {
                        name: "nom",
                        description: "Nom du flags",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "catégorie",
                        description: "Catégorie du flags",
                        type: ApplicationCommandOptionType.String,
                        choices: [
                            {name: "Steganographie", value: "steganographie"},
                            {name: "Cracking & Reverse", value: "crackingReverse"},
                            {name: "Osint", value: "osint"},
                            {name: "Web Client", value: "webClient"},
                            {name: "Web Serveur", value: "webServer"},
                            {name: "MISC", value: "misc"},
                            {name: "Réaliste", value: "realiste"},
                            {name: "Forensic", value: "forensic"},
                            {name: "Machine", value: "machine"},
                            {name: "Suspect", value: "suspect"},
                        ],
                        required: true
                    }
                ]
            }

        ],
    }
}

