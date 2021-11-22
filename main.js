import { Client, Intents } from 'discord.js';
function sendEmbed(guildID, logChannel, embed) {
    client.guilds.fetch(guildID).then((guild) => {
        guild.channels.cache.get(logChannel).send({ embeds: [embed] })
    })
}
const client = new Client({ intents: Object.values(Intents.FLAGS) });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('error', (err) => {
    console.log(err)
})
client.on('warn', (warn) => {
    console.log(warn)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
    var logChannel = "878928621148966932"
    console.log("VoiceStateUpdate event triggered")
    var newUserChannel = newMember.channel
    var oldUserChannel = oldMember.channel
    var member = newMember.member.user
    if (oldUserChannel === null && newUserChannel !== null) {
        let embed = new MessageEmbed({
            color: 3066993,
            description: "Someone joined a channel.",
            fields: [
                {
                    name: `${member.username}`,
                    value: `has joined ${newUserChannel.name}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(newUserChannel.guildId, logChannel, embed)
    } else if (oldUserChannel !== null && newUserChannel === null) {
        let embed = new MessageEmbed({
            color: 15158332,
            description: "Someone left a channel.",
            fields: [
                {
                    name: `${member.username}`,
                    value: `has joined ${oldUserChannel.name}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(newUserChannel.guildId, logChannel, embed)
    } else if (oldUserChannel === newUserChannel && oldUserChannel !== null && newUserChannel !== null) {
        if (!oldMember.selfDeaf && newMember.selfDeaf) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `has deafened himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        } else if (oldMember.selfDeaf && !newMember.selfDeaf) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `has undeafened himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        }
        if (!oldMember.selfMute && newMember.selfMute) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `has muted himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        } else if (oldMember.selfMute && !newMember.selfMute) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `has unmuted himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        }
        if (!oldMember.serverDeaf && newMember.serverDeaf) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `was being deafened.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        } else if (oldMember.serverDeaf && !newMember.serverDeaf) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `was being undeafened.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        }
        if (!oldMember.serverMute && newMember.serverMute) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `was being muted.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        } else if (oldMember.serverMute && !newMember.serverMute) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `was being unmuted.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        }
        if (!oldMember.streaming && newMember.streaming) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `has started streaming.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        } else if (oldMember.streaming && !newMember.streaming) {
            var embed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${member.username}`,
                        value: `has stopped streaming.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, embed)
        }
    } else if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel !== newUserChannel) {
        var embed = new MessageEmbed({
            color: 15844367,
            description: "Someone moved from a channel to another.",
            fields: [
                {
                    name: `${member.username}`,
                    value: `has moved from ${oldUserChannel.name} to ${newUserChannel.name}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(newUserChannel.guildId, logChannel, embed)
    }
})
client.login(process.env.TOKEN);
