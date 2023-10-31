import { ToolClient } from "../../Library";
import chalk from "chalk";
import mongoose from "mongoose";
import { SERVER_DEV, SERVER_LIVE } from "../../config";
import {edit as editServer, find as findServer, update as updateServer} from "../../Models/server";
import {edit as editMember, find as findMember, update as updateMember} from "../../Models/member";
import { readdirSync } from "fs";

const Logger = require("../../Library/logger");

export default async function (client: ToolClient) {

    console.log(chalk.grey('--------------------------------'));
    Logger.client(`Connected as "${client.user!.tag}"`);
    Logger.client(`For ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users, for ${client.channels.cache.size} channels, for ${client.guilds.cache.size} servers discord !`);

    const startTime = Date.now();
    
    client.user!.setPresence({
        status: "idle",
        activities: [{name: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`, type: 3}]
    });
    
    const connectDB = await mongoose.connect(process.env.APP_DATABASE!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false,
        poolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    }).then(() => {
        const finishTime = Date.now();
        Logger.client(`Connected to the database (${finishTime - startTime} ms)`);
    }).catch(err => {
        Logger.error("Connection failed. Try reconnecting in 5 seconds...");
        setTimeout(() => connectDB, 5000);
        Logger.error(`${err}`)
    })

    mongoose.Promise = global.Promise;

    client.guilds.cache.forEach(async (guild) => {
        const firstInvite = await guild.invites.fetch();
        client.invite.set(guild.id, new Map(firstInvite.map((invite) => [invite.code, invite.uses])));
    });

    for (const guild of client.guilds.cache.map(guild => guild)) {
        if (guild.id !== SERVER_LIVE && guild.id !== SERVER_DEV) continue;

        const serverConfig: any = await findServer(guild.id);

        if (serverConfig.dashboard) require("../../Library/dashboard")(client);
        console.log(chalk.grey('--------------------------------'));
        
        await updateServer(guild.id);

        for (const member of guild.members.cache.map(member => member)) {
            if (member.user.bot) continue;
            await updateMember(guild.id, member.id);
        }

        await import("../../Modules/Tickets").then(exports => exports.default(client, guild));
        await import("../../Modules/Informations").then(exports => exports.default(client, guild));
        
        const categoryFolder = readdirSync('./src/Commands');
        for (const categoryName of categoryFolder) {
            let categoryDatabase = serverConfig.maintenance.category;
            const moduleAlready = categoryDatabase.find((e: any) => e.categoryName == categoryName);

            if (!moduleAlready) {
                categoryDatabase.push({ categoryName, state: false, reason: "" });
                await editServer(guild.id, serverConfig);
            }
        }

        for (const command of client.slashCommands.map(command => command)) {
            const cmdDatabase = serverConfig.maintenance.commandes;
            const cmdName = command.cmd.data.name;

            await guild.commands.create(command.cmd.data);

            const commandAlready = cmdDatabase.find((e: any) => e.cmdName == cmdName);

            if (!commandAlready) {
                cmdDatabase.push({ cmdName, state: false, reason: "" });
                await editServer(guild.id, serverConfig);
            }
        }
    }
}