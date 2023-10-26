import { model, Schema } from 'mongoose';
import { Snowflake } from "discord.js";
import { createMissingProperties } from "../Library";

const Logger = require("../Library/logger");

const Members = model("Members", new Schema({
    guildId: String,
    userId: String,
    challenge: {
        lastChallengeId: String,
        lastCategoryMessageId: String,
        flags: {
            steganographie: Array,
            crackingReverse: Array,
            osint: Array,
            webClient: Array,
            misc: Array,
            webServer: Array,
            realiste: Array,
            forensic: Array,
            machine: Array,
        }
    },
    cooldowns: {
        classement: Number,
    }
}));

export const def = {
    guildId: "",
    userId: "",
    challenge: {
        lastChallengeId: "",
        lastCategoryMessageId: "",
        flags: {
            steganographie: Array,
            crackingReverse: Array,
            osint: Array,
            webClient: Array,
            misc: Array,
            webServer: Array,
            realiste: Array,
            forensic: Array,
            machine: Array,
        } 
    },
    cooldowns: {
        classement: 0,
    }

};

export async function create(guildId: Snowflake, userId: Snowflake) {
    let member = new Members(createMissingProperties(def, { guildId, userId }));
    await member.save();
    Logger.database("Creating a user in the database");
    return member;
};

export async function find(guildId: Snowflake, userId: Snowflake) {
    let member = await Members.findOne({ guildId, userId });
    if (!member) {
        member = await create(guildId, userId);
    }
    return member;
};

export async function findServer(guildId: Snowflake) {
    if (!guildId) return null;
    const members = await Members.find({ guildId });
    if (members) return members;
    return null;
}

export async function edit(guildId: Snowflake, userId: Snowflake, data: object) {
    await find(guildId, userId);
    let member = await Members.findOneAndUpdate({ guildId, userId }, data, { new: true });
    return await member!.save();
};

export async function update(guildId: Snowflake, userId: Snowflake) {
    let member = await find(guildId, userId);
    let data = createMissingProperties(def, member)
    return edit(guildId, userId, data);
};

export default Members;