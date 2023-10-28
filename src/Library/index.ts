import {
    BaseMessageOptions,
    ButtonInteraction,
    Client,
    ClientOptions,
    Collection, CommandInteraction, EmbedBuilder, Guild, Message, Snowflake, StringSelectMenuInteraction, TextChannel
} from 'discord.js';
import * as fs from "fs";
import { EMBED_ERROR, EMBED_INFO, EMBED_SUCCESS } from '../config';

export class ToolClient extends Client {
    public config: Object;
    public translations: Collection<any, any>;
    public slashCommands: Collection<any, any>;
    public messageCommands: Collection<any, any>;
    public cooldowns: Collection<any, any>;
    public buttons: Collection<any, any>;
    public selects: Collection<any, any>;
    public modals: Collection<any, any>;
    public invite: Collection<any, any>;

    constructor(options: ClientOptions) {
        super(options);
        this.config = {};
        this.translations = new Collection();
        this.slashCommands = new Collection();
        this.messageCommands = new Collection();
        this.cooldowns = new Collection();
        this.buttons = new Collection();
        this.selects = new Collection();
        this.modals = new Collection();
        this.invite = new Collection();

    }

    getEmoji(id: Snowflake) {
        return this.emojis.cache.get(id);
    }

    getRole(guild: Guild, id: Snowflake) {
        return guild.roles.cache.get(id);
    }

    async getChannel(guild: Guild, snowflake: Snowflake, messageData: BaseMessageOptions) {
        if (snowflake) {
            let channel = <TextChannel>guild.channels.cache.get(snowflake);
            if (channel) {
                await channel.send(messageData);
            }
        }
    }
}

const embed = new EmbedBuilder();

declare module "discord.js" {
    interface CommandInteraction {
        replySuccessMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        replyErrorMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        replyInfoMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        editSuccessMessage(client: ToolClient, content: string): any;

        editErrorMessage(client: ToolClient, content: string): any;
    }
    interface Message {
        replySuccessMessage(client: ToolClient, content: string): Promise<void>;

        replyErrorMessage(client: ToolClient, content: string): Promise<void>;

        replyInfoMessage(client: ToolClient, content: string): Promise<void>;

        editSuccessMessage(client: ToolClient, content: string): any;

        editErrorMessage(client: ToolClient, content: string): any;
    }

    interface ButtonInteraction {
        replySuccessMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        replyErrorMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        replyInfoMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        editSuccessMessage(client: ToolClient, content: string): any;

        editErrorMessage(client: ToolClient, content: string): any;
    }

    interface StringSelectMenuInteraction {
        replySuccessMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        replyErrorMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        replyInfoMessage(client: ToolClient, content: string, ephemeral: boolean): Promise<void>;

        editSuccessMessage(client: ToolClient, content: string): any;

        editErrorMessage(client: ToolClient, content: string): any;
    }
}

CommandInteraction.prototype.replySuccessMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_SUCCESS).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
CommandInteraction.prototype.replyErrorMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_ERROR).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
CommandInteraction.prototype.replyInfoMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_INFO).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
CommandInteraction.prototype.editSuccessMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_SUCCESS).setDescription(`| ${content}`);
    await this.editReply({ embeds: [embed] });
};
CommandInteraction.prototype.editErrorMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_ERROR).setDescription(`| ${content}`);
    await this.editReply({ embeds: [embed] });
};

Message.prototype.replySuccessMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_SUCCESS).setDescription(`| ${content}`);
    await this.channel.send({ embeds: [embed] });
};
Message.prototype.replyErrorMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_ERROR).setDescription(`| ${content}`);
    await this.channel.send({ embeds: [embed] });
};
Message.prototype.replyInfoMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_INFO).setDescription(`| ${content}`);
    await this.channel.send({ embeds: [embed] });
};

ButtonInteraction.prototype.replySuccessMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_SUCCESS).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
ButtonInteraction.prototype.replyErrorMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_ERROR).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
ButtonInteraction.prototype.replyInfoMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_INFO).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
ButtonInteraction.prototype.editSuccessMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_SUCCESS).setDescription(` ${content}`);
    await this.editReply({ embeds: [embed] });
};
ButtonInteraction.prototype.editErrorMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_ERROR).setDescription(`| ${content}`);
    await this.editReply({ embeds: [embed] });
};

StringSelectMenuInteraction.prototype.replySuccessMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_SUCCESS).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
StringSelectMenuInteraction.prototype.replyErrorMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_ERROR).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
StringSelectMenuInteraction.prototype.replyInfoMessage = async function (client: ToolClient, content: string, ephemeral: boolean) {
    embed.setColor(EMBED_INFO).setDescription(`| ${content}`);
    await this.reply({ embeds: [embed], ephemeral: ephemeral });
};
StringSelectMenuInteraction.prototype.editSuccessMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_SUCCESS).setDescription(` ${content}`);
    await this.editReply({ embeds: [embed] });
};
StringSelectMenuInteraction.prototype.editErrorMessage = async function (client: ToolClient, content: string) {
    embed.setColor(EMBED_ERROR).setDescription(`| ${content}`);
    await this.editReply({ embeds: [embed] });
};

export function getFilesRecursive(directory: string, aFiles?: string[]) {
    const files = fs.readdirSync(directory);
    aFiles = aFiles ?? [];
    files.forEach((file) => {
        const path = `${directory}/${file}`;
        if (fs.statSync(path).isDirectory()) {
            aFiles = getFilesRecursive(path, aFiles);
        } else {
            aFiles!.push(path);
        }
    })
    return aFiles;
}

export function createMissingProperties(def: object, obj: object) {
    for (let key of Object.keys(def) as Array<keyof object>) {
        if (typeof def[key] === "object" && !(<any>def[key] instanceof Date)) {
            if (obj[key] === undefined || obj[key] === null) {
                (obj[key] as object) = {};
            }
            createMissingProperties(def[key], obj[key]);
        } else if (obj[key] === undefined || obj[key] === null) {
            obj[key] = def[key];
        }
    }
    return obj;
}

export function capitalize(firstLetter: string) {
    return firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1)
};

export function researchArray(mot: string, array: string[]): boolean {
    return array.includes(mot);
}

export function tcheckNumber(text: string) {
    const expression = /^\d+$/;
    return expression.test(text);
  }