const config = require("../config.json");

module.exports = {
  name: "help",
  description: "!help",
  execute(message, args) {
    loopTillHandled(message);
  },
};

function loopTillHandled(message) {
    console.log("added message to queue");
    const filter = (reaction, user) => reaction.emoji.name == "✅" || reaction.emoji.name == "⛔" || reaction.emoji.name == "👀";
    const collector = message.createReactionCollector(filter);
    let tabMessageToClear = [];
    const boucle = setInterval(
        (message) => {
          message.channel.messages
            .fetch(message.id)
            .then((msg) => {
              let messageInfo = message.channel.send({
                embed: {
                  color: 15158332,
                  author: {
                    name: message.client.user.username,
                    icon_url: message.client.user.avatarURL,
                  },
                  fields: [
                    {
                      name: "Bah alors ?! Personne veut traiter ce message : ",
                      value: message.content,
                    },
                  ],
                  timestamp: new Date(),
                  footer: {
                    icon_url: message.client.user.avatarURL,
                    text: "© ITEA",
                  },
                },
              }).then((msg) => {
                tabMessageToClear.push(msg);
              });
              
            })
            .catch(console.error);
        },
        config.help_time_loop,
        message
      );
    collector.on('collect',function(r){
        clearInterval(boucle);
        deleteEmbededMessages(tabMessageToClear);
    });
}

function deleteEmbededMessages(tabMessageToClear){
    tabMessageToClear.forEach(element => {
        element.delete();
    });
}
