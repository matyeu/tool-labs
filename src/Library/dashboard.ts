import { EmbedBuilder } from "discord.js";
import { ToolClient } from ".";
import { SERVER_LIVE, SERVER_DEV, EMBED_SUCCESS, FOOTER_DASHBOARD, EMBED_ERROR, LINK_DISCORD } from "../config";
import { edit as editServer, find as findServer } from "../Models/server";
import { edit as editMember, find as findMember } from "../Models/member";

const express = require("express");
const dashboard = express();
const path = require("path");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const infosSite = require('../infos-site');
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');


const Logger = require("../Library/logger");

module.exports = (client: ToolClient) => {

    const dashboardDirectory = path.resolve(`${process.cwd()}${path.sep}src/Dashboard`);

    const templatesDirectory = path.resolve(`${dashboardDirectory}${path.sep}Templates`)

    dashboard.use("/Public", express.static(path.resolve(`${dashboardDirectory}${path.sep}Public`)))

    const privateKey = fs.readFileSync('chemin/vers/votre/clé-privée.pem', 'utf8');
    const certificate = fs.readFileSync('chemin/vers/votre/certificat.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    const httpsServer = https.createServer(credentials, dashboard);

    passport.serializeUser((user: any, done: any) => {
        done(null, user);
    })

    passport.deserializeUser((obj: any, done: any) => {
        done(null, obj)
    })


    passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.OUATH_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ["identify", "guilds"]
    },
        (accessToken: any, refreshToken: any, profile: any, done: any) => {
            process.nextTick(() => done(null, profile))
        }
    ))

    dashboard.use(session({
        store: new MemoryStore({ checkPeriode: 99999999 }),
        secret: process.env.SSECRET,
        resave: false,
        saveUninitialized: false,
    }))

    dashboard.use(passport.initialize());
    dashboard.use(passport.session());

    dashboard.use(bodyParser.json()); 
    dashboard.use(bodyParser.urlencoded({ extended: true }));

    dashboard.engine("html", require("ejs").renderFile)
    dashboard.set("view engine", "html")

    const renderTemplate = async (res: any, req: any, template: any, data = {}) => {
        let serverConfig: any
        let memberConfig: any
        let member: any

        for (const guild of client.guilds.cache.map(guild => guild)) {
            if (guild.id !== SERVER_LIVE && guild.id !== SERVER_DEV) continue;
            member = await guild.members.fetch(req.user.id);

            serverConfig = await findServer(guild.id);
            memberConfig = await findMember(guild!.id, member.id)
        };
        const baseData = {
            bot: client,
            path: req.path,
            pathSite: infosSite,
            member: req.isAuthenticated() ? member : null,
            serverConfig: serverConfig,
            memberConfig: memberConfig,
            editMember: memberConfig.save(),
        };
        res.render(
            path.resolve(`${templatesDirectory}${path.sep}${template}`),
            Object.assign(baseData, data)
        )
    }

    dashboard.get("/", (req: any, res: any, next: any) => {
        res.redirect("/index");
    });

    dashboard.get("/index", (req: any, res: any, next: any) => {
        req.session.backURL = "/callback"
        next();
    },
        passport.authenticate("discord"));

    dashboard.get('/api/get/server', async (req: any, res: any) => {
        try {
            const data = await findServer(SERVER_DEV);
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        }
    });


    dashboard.get('/api/get/members', async (req: any, res: any) => {
        try {
            const data = await findMember(SERVER_DEV, req.user.id);
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        }
    });
dashboard.post('/api/update/server/buyer', async (req: any, res: any) => {
        try {
            const data = req.body;
            const serverConfig: any = await findServer(SERVER_DEV);
            serverConfig.shop[data.produit][data.buyer]
            editServer(SERVER_DEV, serverConfig);  
        } catch (error) {
          console.error('Erreur lors de la mise à jour :', error);
          res.status(500).json({ error: 'Erreur lors de la mise à jour' });
        }
      });
    dashboard.post('/api/update/members/amount', async (req: any, res: any) => {
        try {
            const data = req.body;
            const memberConfig: any = await findMember(SERVER_DEV, req.user.id);
            memberConfig.shop.amount = data.amount
            editMember(SERVER_DEV, req.user.id, memberConfig);  
        } catch (error) {
          console.error('Erreur lors de la mise à jour :', error);
          res.status(500).json({ error: 'Erreur lors de la mise à jour' });
        }
      });
       dashboard.post('/api/update/ebooks', async (req: any, res: any) => {
        try {
            const data = req.body;
            const serverConfig: any = await findServer(SERVER_DEV);
              serverConfig.shop.ebooks[data.product].buyer = data.buyer
            editServer(SERVER_DEV, serverConfig);  
        } catch (error) {
          console.error('Erreur lors de la mise à jour :', error);
          res.status(500).json({ error: 'Erreur lors de la mise à jour' });
        }
      });
    dashboard.get("/callback", passport.authenticate("discord"), async (req: any, res: any) => {
        for (const guild of client.guilds.cache.map(guild => guild)) {
            if (guild.id !== SERVER_LIVE && guild.id !== SERVER_DEV) continue;

            const member = await guild.members.cache.get(req.user.id)!;

            if (!member) {
                res.redirect(LINK_DISCORD);
            } else {
                const serverConfig: any = await findServer(guild.id);
                serverConfig.stats.visitor++

                await editServer(guild.id, serverConfig);

                const embedLogin = new EmbedBuilder()
                    .setColor(EMBED_SUCCESS)
                    .setAuthor({ name: `${member.displayName} (${member.id})`, iconURL: member.user.displayAvatarURL() })
                    .setDescription(`**${member} vient de se connecter au dashboard !**`)
                    .setTimestamp()
                    .setFooter({ text: FOOTER_DASHBOARD, iconURL: client.user?.displayAvatarURL() })

                await client.getChannel(guild, serverConfig.channels.fluxDash, { embeds: [embedLogin] });

                res.redirect("/home");

                Logger.client(`${member.displayName} login on the dashboard`);
            }
        };
    });

    dashboard.get("/home", (req: any, res: any) => {
        renderTemplate(res, req, "home.ejs")
    });
    dashboard.get("/maj", (req: any, res: any) => {
        renderTemplate(res, req, "maj.ejs")
    });

    dashboard.get("/a-propos-de-nous", (req: any, res: any) => {
        renderTemplate(res, req, "a-propos-de-nous.ejs")
    });


    dashboard.get("/shop/ebooks", async (req: any, res: any) => {
        renderTemplate(res, req, "shop/ebooks.ejs")
    });

    dashboard.get("/shop/accounts", (req: any, res: any) => {
        renderTemplate(res, req, "shop/accounts.ejs")
    });

    dashboard.get("/shop/logs", async (req: any, res: any) => {
        for (const guild of client.guilds.cache.map(guild => guild)) {
            const member = await guild.members.cache.get(req.user.id)!;

            const serverConfig: any = await findServer(guild.id);

            if (member.roles.cache.has(serverConfig.roles.logs)) {
                renderTemplate(res, req, "shop/logs.ejs")
            } else {
                renderTemplate(res, req, "home.ejs")
            }
        }
    });

    dashboard.get("/shop/divers", (req: any, res: any) => {
        renderTemplate(res, req, "shop/divers.ejs")
    });

    dashboard.get('/logout', async (req: any, res: any, next: any) => {
        for (const guild of client.guilds.cache.map(guild => guild)) {
            if (guild.id !== SERVER_LIVE && guild.id !== SERVER_DEV) continue;

            const serverConfig: any = await findServer(guild.id);
            const member = await guild.members.cache.get(req.user.id)!;

            const embedLogin = new EmbedBuilder()
                .setColor(EMBED_ERROR)
                .setAuthor({ name: `${member.displayName} (${member.id})`, iconURL: member.user.displayAvatarURL() })
                .setDescription(`**${member} vient de se déconnecter du dashboard !**`)
                .setTimestamp()
                .setFooter({ text: FOOTER_DASHBOARD, iconURL: client.user?.displayAvatarURL() })

            await client.getChannel(guild, serverConfig.channels.fluxDash, { embeds: [embedLogin] });
            Logger.client(`${member.displayName} logout on the dashboard`);
        };
        req.logout(function (err: any) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });



    client.site = httpsServer.listen(process.env.PORT);
    Logger.client(`Dashboard on: http://${process.env.DOMAIN}:${process.env.PORT}`)


}
