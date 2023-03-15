require("dotenv/config");
const cron = require("cron");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "-";

const path = require("node:path");
const fs = require("fs");
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.name, command);
}

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(msg, args);
  } else if (command === "google") {
    msg.reply("https://www.google.com");
  } else if (command === "fuel") {
    client.commands.get('fuel').execute(client)
  }
});

let scheduledMessage = new cron.CronJob("*/f35 * * * *", () => {
  client.commands.get('fuel').execute(client)
});

scheduledMessage.start();

client.login(process.env.token);
