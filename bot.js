const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const prefix = config.prefix;

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  gereTeletravail();
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) {
    return;
  }

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Une erreur est survenue à l'éxecution de cette commande");
  }
});

function gereTeletravail() {
  let channel = client.guilds.cache
    .get("771414696209285171")
    .channels.cache.get(config.id_channel_statuts);

  channel.messages
    .fetch(config.id_message_teletravail)
    .then((message) => {
      message
        .awaitReactions(
          (reaction, user) =>
            reaction.emoji.name == "👍" || reaction.emoji.name == "👎"
        )
        .then((collected) => {
          console.log("collected", collected);
          if (collected.first().emoji.name == "👍") {
            user.setNickname("🏡 " + user.username);
          } else {
          }
          // reaction.remove(user);
        })
        .catch(() => {
          message.reply("No reaction after 30 seconds, operation canceled");
        });
    });
}

client.login(config.token);
