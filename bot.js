require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("message", (message) => {
  if (message.content.includes("!help")) {
    loopTillHandled(message);
  }
});

function loopTillHandled(message) {
  const boucle = setInterval(
    (message) => {
      message.channel.messages
        .fetch(message.id)
        .then((msg) => {
          const item = msg.reactions.cache.find((elem) => {
            return elem.emoji.name == "✅";
          });
          if (item !== undefined) {
            clearInterval(boucle);
            return;
          }
          message.channel.send({
            embed: {
              color: 15158332,
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL,
              },
              fields: [
                {
                  name: "Bah alors ?! Personne veut traiter ce message : ",
                  value: message.content,
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "© ITEA",
              },
            },
          });
        })
        .catch(console.error);
        
    },
    15000,
    message
  );
}

client.login(process.env.TOKEN);
