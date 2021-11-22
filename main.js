import { Client, Intents, MessageEmbed } from 'discord.js';
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
    var memberUsername = member.tag
    if (oldUserChannel === null && newUserChannel !== null) {
        var embed = new MessageEmbed({
            color: 3066993,
            description: "Someone joined a channel.",
            fields: [
                {
                    name: `${memberUsername}`,
                    value: `has joined ${newUserChannel.name}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(newUserChannel.guildId, logChannel, embed)
        var currentMember = []
        for (var i = 0; i < newUserChannel.members.size; i++)
            currentMember.push(newUserChannel.members.at(i).user.tag)
        var currentMembersEmbed = new MessageEmbed({
            color: 15844367,
            description: "These are the current members in this voice channel.",
            fields: [
                {
                    name: `${newUserChannel.name}`,
                    value: `${currentMember.join("\n")}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
    } else if (oldUserChannel !== null && newUserChannel === null) {
        var embed = new MessageEmbed({
            color: 15158332,
            description: "Someone left a channel.",
            fields: [
                {
                    name: `${memberUsername}`,
                    value: `has left ${oldUserChannel.name}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(oldUserChannel.guildId, logChannel, embed)
        var currentMember = []
        for (var i = 0; i < oldUserChannel.members.size; i++)
            currentMember.push(oldUserChannel.members.at(i).user.tag)
        var currentMembersEmbed = new MessageEmbed({
            color: 15844367,
            description: "These are the current members in this voice channel.",
            fields: [
                {
                    name: `${oldUserChannel.name}`,
                    value: `${currentMember.join("\n")}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(oldUserChannel.guildId, logChannel, currentMembersEmbed)
    } else if (oldUserChannel === newUserChannel && oldUserChannel !== null && newUserChannel !== null) {
        if (!oldMember.selfDeaf && newMember.selfDeaf) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `has deafened himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        } else if (oldMember.selfDeaf && !newMember.selfDeaf) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `has undeafened himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        }
        if (!oldMember.selfMute && newMember.selfMute) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `has muted himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        } else if (oldMember.selfMute && !newMember.selfMute) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `has unmuted himself/herself.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        }
        if (!oldMember.serverDeaf && newMember.serverDeaf) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `was being deafened.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        } else if (oldMember.serverDeaf && !newMember.serverDeaf) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `was being undeafened.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        }
        if (!oldMember.serverMute && newMember.serverMute) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `was being muted.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        } else if (oldMember.serverMute && !newMember.serverMute) {
            var currentMembersEmbed = new MessageEmbed({
                color: 15844367,
                description: "Someone changed his/her status on voice channels.",
                fields: [
                    {
                        name: `${memberUsername}`,
                        value: `was being unmuted.`
                    }
                ],
                timestamp: new Date()
            })
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        }
    } else if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel !== newUserChannel) {
        var currentMembersEmbed = new MessageEmbed({
            color: 15844367,
            description: "Someone moved from a channel to another.",
            fields: [
                {
                    name: `${memberUsername}`,
                    value: `has moved from ${oldUserChannel.name} to ${newUserChannel.name}`
                }
            ],
            timestamp: new Date()
        })
        sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
    }
})
client.login(process.env.TOKEN);
