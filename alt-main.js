import { Client } from "discord.js"
const clientB = new Client()
clientB.on("ready", () => {
    console.log("Alt account also ready.")
})
clientB.on('voiceStateUpdate', (oldMember, newMember) => {
    var logChannel = "925381565989650463"
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
        }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
        }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
            }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
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
        if (oldChannelCurrentMember.length)
            memberListMessage = oldChannelCurrentMember.join("\n")
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
        }).setFooter(`Timestamp: ${new Date().toLocaleString("en-UK", { timeZone: "Asia/Hong_Kong" })}`)
        sendEmbed(newUserChannel.guildId, logChannel, currentMembersEmbed)
    }
})
clientB.login(process.env.BOT_TOKEN_C)
