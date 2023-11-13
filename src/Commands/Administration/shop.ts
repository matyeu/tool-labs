import { ApplicationCommandOptionType, CommandInteraction, Message } from "discord.js";
import { ToolClient } from "../../Library";
import { edit, find } from "../../Models/server";

export async function slash(client: ToolClient, interaction: CommandInteraction) {

    const serverConfig: any = await find(interaction.guild!.id);

    const nameOption = interaction.options.get('nom', true).value as string;
    const descriptionOption = interaction.options.get('description', true).value as string;
    const categoryOption = interaction.options.get('catégorie', true).value as string;

    const arrayShop =  serverConfig.shop[categoryOption];
    const getItem = arrayShop.find((e: any) => e.name == nameOption);

    //@ts-ignore
    switch (interaction.options.getSubcommand(false)) {
        case 'ajout': 
        const amountOption: any = interaction.options.get('montant', true).value as number;

        if (getItem) return interaction.replyErrorMessage(client, `Le produit **${nameOption}** est déjà présent dans la base de données`, true);
        
        arrayShop.push({name: nameOption, description: descriptionOption, buyer: 0, amount: amountOption});
        await edit(interaction.guild!.id, serverConfig);

        await interaction.replySuccessMessage(client, `Le produit **${nameOption}** a été ajouté`, true);
        break;
        case 'supprimer': 

        if (!getItem) return interaction.replyErrorMessage(client, `Le produit **${nameOption}** est introuvanle dans la base de données`, true);
        
        arrayShop.remove(getItem);
        await edit(interaction.guild!.id, serverConfig);

        await interaction.replySuccessMessage(client, `Le produit **${nameOption}** a été supprimé `, true);
        break;
        //@ts-ignore
        default: return interaction.replyErrorMessage(client, `La fonctionalité **${interaction.options.getSubcommand(false)}**`)
        
    }

}

export async function command(client: ToolClient, message: Message, args: any) {}

export const cmd = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Permet d'ajouter ou supprimer des produits",
        category: "Administration",
        permissions: ["Administrator"],
        options: [
            {
                name: "ajout",
                type: ApplicationCommandOptionType.Subcommand,
                description: "Permet l'ajout de produit.",
                options: [
                    {
                        name: "nom",
                        description: "Nom du flags",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "description",
                        description: "Description du produit",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "catégorie",
                        description: "Catégorie du produit",
                        type: ApplicationCommandOptionType.String,
                        choices: [
                            {name: "Ebooks", value: "ebooks"},
                            {name: "Accounts", value: "accounts"},
                            {name: "Logs", value: "logs"},
                            {name: "Divers", value: "divers"},
                        ],
                        required: true
                    },
                    {
                        name: "montant",
                        description: "Montant du produit",
                        type: ApplicationCommandOptionType.Number,
                        required: true
                    }
                ]
            },
            {
                name: "supprimer",
                type: ApplicationCommandOptionType.Subcommand,
                description: "Permet la suppression de produit.",
                options: [
                    {
                        name: "nom",
                        description: "Nom du produit",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "catégorie",
                        description: "Catégorie du produit",
                        type: ApplicationCommandOptionType.String,
                        choices: [
                            {name: "Ebooks", value: "ebooks"},
                            {name: "Accounts", value: "accounts"},
                            {name: "Logs", value: "logs"},
                            {name: "Divers", value: "divers"},
                        ],
                        required: true
                    }
                ]
            }

        ],
    }
}

