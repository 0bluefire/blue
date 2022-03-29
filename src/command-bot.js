
const Discord = require("discord.js");

const config = require("./data/config.json");

const fetch = require("node-fetch");

const cheerio = require("cheerio");

const { map } = require("cheerio/lib/api/traversing");

const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents });

client.login(config.token);

client.on("ready", () => console.log("bot is online"));

client.on("messageCreate", async (message) => {

    console.log(message.content);

    if (!message.content.startsWith(config.prefix))return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (command === "wiki") {
            
        const name  = (`${args[0]}`)

        
        const meta = {

            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36 OPR/82.0.4227.25/xml"
        };

        const headers = new fetch.Headers(meta);

 const webscraper = async () => {

            const response = await fetch(`https://leagueoflegends.fandom.com/wiki/Special:Search?query=${name}&scope=internal&navigationSearch=true`);

            const body = await response.text();

            const $ = cheerio.load(body);

            const result = $(".unified-search__results")

                .children()
                .map(function(i, el) {

                    return {

                        
                        link: $(this).find(".unified-search__result__link").text(),

                    }
                })
                .toArray();
                const url = result[0];
                let urlstring = JSON.stringify(url);
                const cleanurl = urlstring.substring(urlstring.indexOf("h"))
                const cleanerurl = cleanurl.replace(`"}`, ``);   
                console.log(cleanerurl);
                message.reply(`${cleanerurl}`);
        };

        webscraper();
    }
    else (message.reply(`je suis deso ${message.member} mais la commande "${command}" n'est pas terminée ou n'existe pas`))
});
