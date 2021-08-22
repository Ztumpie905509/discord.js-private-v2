const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on("ready", () => {
  console.log("This bot is ready");
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  var newUserChannel = newMember.voiceChannel;
  var oldUserChannel = oldMember.voiceChannel;
  if (
    oldUserChannel !== undefined &&
    newUserChannel !== undefined &&
    newUserChannel === oldUserChannel
  ) {
    if (newMember.selfStream || oldMember.selfStream) return;
    client.channels
      .find((x) => {
        return x.name === "logs";
      })
      .send({
        embed: {
          color: 16766720,
          description: "Someone toggled his/her voice status.",
          fields: [
            {
              name: `${newMember.user.username}`,
              value: `was being (un)muted/(un)deafened`,
            },
          ],
          timestamp: new Date(),
        },
      });
  } else if (oldUserChannel === undefined && newUserChannel !== undefined) {
    client.channels
      .find((x) => {
        return x.name === "logs";
      })
      .send({
        embed: {
          color: 3066993,
          description: "Someone joined a voice channel",
          fields: [
            {
              name: `${newMember.user.username}`,
              value: `has joined ${newUserChannel.name}`,
            },
          ],
          timestamp: new Date(),
        },
      });
  } else if (newUserChannel === undefined && oldUserChannel !== undefined) {
    client.channels
      .find((x) => {
        return x.name === "logs";
      })
      .send({
        embed: {
          color: 15158332,
          description: "Someone left a voice channel",
          fields: [
            {
              name: `${oldMember.user.username}`,
              value: `has left ${oldUserChannel.name}`,
            },
          ],
          timestamp: new Date(),
        },
      });
  } else if (newUserChannel !== undefined && oldUserChannel !== undefined) {
    client.channels
      .find((x) => {
        return x.name === "logs";
      })
      .send({
        embed: {
          color: 15844367,
          description: "Someone switched from a voice channel to another",
          fields: [
            {
              name: `${oldMember.user.username}`,
              value: `has switched from ${oldUserChannel.name} to ${newUserChannel.name}`,
            },
          ],
          timestamp: new Date(),
        },
      });
  }
});

client.login(process.env.TOKEN);
