import { Client, Intents, MessageEmbed } from "discord.js";
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
    var newUserChannel = newMember.channel
    var oldUserChannel = oldMember.channel
    var member = newMember.member.user
    var memberUsername = member.tag
    if (oldUserChannel === null && newUserChannel !== null) {
        var currentMember = []
        newUserChannel.members.each((user) => {
            currentMember.push(user.user.tag)
        })
        var embed = new MessageEmbed({
            color: 3066993,
            description: "Someone joined a channel.",
            fields: [
                {
                    name: `${memberUsername}`,
                    value: `has joined ${newUserChannel.name}\n\n**Member List for ${newUserChannel.name}**\n${currentMember.join("\n")}`
                }
            ]
        }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
        sendEmbed(newUserChannel.guildId, logChannel, embed)
    } else if (oldUserChannel !== null && newUserChannel === null) {
        var currentMember = []
        oldUserChannel.members.each((user) => {
            currentMember.push(user.user.tag)
        })
        var memberListMessage = ""
        if (currentMember.length)
            memberListMessage = currentMember.join("\n")
        else memberListMessage = "(None)"
        var currentMembersEmbed = new MessageEmbed({
            color: 15158332,
            description: "Someone left a channel.",
            fields: [
                {
                    name: `${memberUsername}`,
                    value: `has left ${oldUserChannel.name}\n\n**Member List for ${oldUserChannel.name}**\n${memberListMessage}`
                }
            ]
        }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
                ]
            }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
            sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
        }
    } else if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel !== newUserChannel) {
        var oldChannelCurrentMember = []
        oldUserChannel.members.each((user) => {
            oldChannelCurrentMember.push(user.user.tag)
        })
        var newChannelCurrentMember = []
        newUserChannel.members.each((user) => {
            newChannelCurrentMember.push(user.user.tag)
        })
        var memberListMessage = ""
        if (currentMember.length)
            memberListMessage = currentMember.join("\n")
        else memberListMessage = "(None)"
        var currentMembersEmbed = new MessageEmbed({
            color: 15844367,
            description: "Someone moved from a channel to another.",
            fields: [
                {
                    name: `${memberUsername}`,
                    value: `has moved from ${oldUserChannel.name} to ${newUserChannel.name}\n\n**Member List for ${newUserChannel.name}**\n${newChannelCurrentMember.join("\n")}\n\n**Member List for ${oldUserChannel.name}**\n${memberListMessage}`
                }
            ]
        }).setFooter(`Date (DD/MM/YYYY): ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
        sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
    }
})
var timeout
client.on("voiceStateUpdate", async (oldState, newState) => {
    var specialID = "337913859497132032"
    var channel = "913112357100724244"
    if (!oldState || !newState) return
    if (newState.member.user.id === specialID)
        if (newState.selfMute) {
            var time = 15 * 60 * 1000
            timeout = setTimeout(() => {
                newState.setChannel(channel)
            }, time)
        } else if (!newState.selfMute) {
            clearTimeout(timeout)
        }
})
client.login(process.env.TOKEN);
