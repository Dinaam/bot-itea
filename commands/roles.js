const config = require("../config.json");

module.exports = {
  name: "roles",
  description: "!roles",
  execute(message, args) {
    const idChannel = config.id_channel_statuts;
    message.client.channels
      .fetch(idChannel)
      .then((channel) => initialisation(channel));
  },
};

function initialisation(channel) {
  channel
    .send(
      `Ce salon permet de choisir des "statuts" de manière automatique. Pour cela, il faut cliquer sur la réaction souhaitée. Certains statuts sont automatiques (donc pas de réaction)
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    `
    )
   channel.send(
    `- Télétravail 🏡 : `
   ) .then((m) => {
    // L'utilisateur a juste à cliquer
    m.react("👍").then((r) => {
        m.react("👎");
    });
  });
}