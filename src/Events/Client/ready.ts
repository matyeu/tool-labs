import { ToolClient } from "../../Library";
import chalk from "chalk";
import mongoose from "mongoose";
import { SERVER_DEV, SERVER_LIVE } from "../../config";
import {edit, find, update} from "../../Models/server";
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
    console.log(chalk.grey('--------------------------------'));

    for (const guild of client.guilds.cache.map(guild => guild)) {
        if (guild.id !== SERVER_LIVE && guild.id !== SERVER_DEV) continue;

        const serverConfig: any = await find(guild.id);
        
        await update(guild.id);
        
        const categoryFolder = readdirSync('./src/Commands');
        for (const categoryName of categoryFolder) {
            let categoryDatabase = serverConfig.maintenance.category;
            const moduleAlready = categoryDatabase.find((e: any) => e.categoryName == categoryName);

            if (!moduleAlready) {
                categoryDatabase.push({ categoryName, state: false, reason: "" });
                await edit(guild.id, serverConfig);
            }
        }

        for (const command of client.slashCommands.map(command => command)) {
            const cmdDatabase = serverConfig.maintenance.commandes;
            const cmdName = command.cmd.data.name;

            await guild.commands.create(command.cmd.data);

            const commandAlready = cmdDatabase.find((e: any) => e.cmdName == cmdName);

            if (!commandAlready) {
                cmdDatabase.push({ cmdName, state: false, reason: "" });
                await edit(guild.id, serverConfig);
            }
        }
    }
}