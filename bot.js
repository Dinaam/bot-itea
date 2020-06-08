require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.on('message', message => {
    if (message.content.includes('!help')) {
        loopTillHandled(message);
    }

});

client.on("messageReactionAdd", async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }
  }
  console.log(`${ reaction.message }`);
  if (reaction.emoji.name == "👌") {

  }
});

function loopTillHandled(message) {
  
  setInterval(displayEmbed, 1000, message);
}

function displayEmbed(message) {
  console.log("message", message);
  const embed = new Discord.MessageEmbed();
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
  console.log("ok => ", message.content);
}
client.login(process.env.TOKEN);
