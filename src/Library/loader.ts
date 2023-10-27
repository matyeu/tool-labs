import { getFilesRecursive, ToolClient } from "./index";
import path from "path";
import chalk from 'chalk';

const Logger = require("./logger");

console.log(chalk.blue(`
 ████████╗ ██████╗  ██████╗ ██╗      ██╗      █████╗ ██████╗ ███████╗
 ╚══██╔══╝██╔═══██╗██╔═══██╗██║      ██║     ██╔══██╗██╔══██╗██╔════╝
    ██║   ██║   ██║██║   ██║██║█████╗██║     ███████║██████╔╝███████╗
    ██║   ██║   ██║██║   ██║██║╚════╝██║     ██╔══██║██╔══██╗╚════██║
    ██║   ╚██████╔╝╚██████╔╝███████╗ ███████╗██║  ██║██████╔╝███████║
    ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝ ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
`))
console.log(chalk.bgBlue("                                                                   "));
console.log(chalk.bgBlue(" © 2023 TOOL-LABS - Discord BOT C.T.F developed by matyeu & zulu.  "));
console.log(chalk.bgBlue("                                                                   "));
console.log('')

export function loadCommands(client: ToolClient) {
    let commandFiles = getFilesRecursive(path.resolve(__dirname, "../Commands"));
    let i = 0;
    for (const commandFile of commandFiles) {
        i++
        import(commandFile).then(exports => {
            let matches = commandFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let commandName = matches[1];
            if (!commandName) return;
            client.slashCommands.set(exports.cmd.data.name, exports);
            client.messageCommands.set(exports.cmd.data.name, exports);
        });
    }

    Logger.command(`${i} loaded commands`);

};

export function loadEvents(client: ToolClient) {
    let eventFiles = getFilesRecursive(path.resolve(__dirname, "../Events"));
    let i = 0;
    for (const eventFile of eventFiles) {
        i++
        let matches = eventFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
        let eventName = matches[1];
        if (!eventName) continue;
        client.on(eventName, (...args) => import(eventFile).then(async listener => await listener.default(client, ...args)));
    }

    Logger.event(`${i} loaded events`);
};

export function loadButtons(client: ToolClient) {
    let buttonFiles = getFilesRecursive(path.resolve(__dirname, "../Interactions/Buttons"));
    let i = 0;
    for (const buttonFile of buttonFiles) {
        i++
        import(buttonFile).then(exports => {
            let matches = buttonFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let buttonName = matches[1];
            if (!buttonName) return;
            if (exports.button) client.buttons.set(exports.button.data.name, exports);
            else client.buttons.set(buttonName, exports);
        });
    }

    Logger.button(`${i} loaded buttons`)
};

export function loadSelectMenus(client: ToolClient) {
    let selectFiles = getFilesRecursive(path.resolve(__dirname, "../Interactions/Selectmenus"));
    let i = 0;
    for (const selectFile of selectFiles) {
        i++
        import(selectFile).then(exports => {
            let matches = selectFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let selectName = matches[1];
            if (!selectName) return;
            if (exports.select) client.selects.set(exports.select.data.name, exports);
            else client.selects.set(selectName, exports);
        });
    }

    Logger.select(`${i} loaded selects`)
};

export function loadModals(client: ToolClient) {
    let modalFiles = getFilesRecursive(path.resolve(__dirname, "../Interactions/Modals"));
    let i = 0;
    for (const modalFile of modalFiles) {
        i++
        import(modalFile).then(exports => {
            let matches = modalFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let modalName = matches[1];
            if (!modalName) return;
            if (exports.modal) client.modals.set(exports.modal.data.name, exports);
            else client.modals.set(modalName, exports);
        });
    }

    Logger.modal(`${i} loaded modals`)
};