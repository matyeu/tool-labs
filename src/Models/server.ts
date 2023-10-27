import { model, Schema } from "mongoose";
import { Snowflake } from "discord.js";
import { createMissingProperties } from "../Library";

const Logger = require("../Library/logger");

const Server = model(
    "Server",
    new Schema({
        serverId: String,
        prefix: String,
        administrators: Array,
        category: {
            challenge: String,
        },
        channels: {
            logs: {
                tickets: String,
            },
            challenge: String,
            challengeSuspect: String,
            classement: String,
            candidature: String,
            createMission: String,
            mission: String,
            staff: String,
            documentation: String,
        },
        roles: {
            suspect: String,
            invite: String,
        },
        maintenance: {
            state: Boolean,
            reason: String,
            commandes: Array,
            category: Array,
        },
        modules: {
            tickets: Boolean,
            informations: Boolean,
        },
        challenge: {
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
                suspect: Array
            }
        },
        stats: {
            challenge: Number,
            suspect: Number
        }
    })
)

export const def = {
    serverId: "",
    prefix: "!",
    administrators: "916444775861850175",
    category: {
        challenge: "",
    },
    channels: {
        logs: {
            tickets: "",
        },
        challenge: "",
        challengeSuspect: "",
        classement: "",
        candidature: "",
        createMission: "",
        mission: "",
        staff: "",
        documentation: "",
    },
    roles: {
        suspect: "",
        invite: "",
    },
    maintenance: {
        state: false,
        reason: "",
        commandes: Array,
        category: Array,
    },
    modules: {
        tickets: false,
        informations: false
    },
    challenge: {
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
            suspect: Array
        }
    },
    stats: {
        challenge: 0,
        suspect: 0
    }
};

export async function create(id: Snowflake) {
    let guild = new Server(createMissingProperties(def, { serverId: id }));
    await guild.save();
    Logger.database("Creating a server in the database");
    return guild;
}

export async function find(id: Snowflake) {
    let guild = await Server.findOne({ serverId: id });
    if (!guild) guild = await create(id);
    return guild;
}

export async function edit(id: Snowflake, data: object) {
    await find(id);
    let guild = await Server.findOneAndUpdate({ serverId: id }, data, {
        new: true,
    });
    Logger.database("Updating a server in the database");
    return await guild!.save();
}

export async function update(id: Snowflake) {
    let guild = await find(id);
    let data = createMissingProperties(def, guild);
    return edit(id, data);
}

export default Server;