import { Client, Intents } from 'discord.js';
import { voiceMember } from "./functions/logs/index.js"
const client = new Client({ intents: Object.values(Intents.FLAGS) });
const updateStateCode = {
    selfMute: 1,
    selfDeaf: 2,
    serverMute: 3,
    serverDeaf: 4,
    streaming: 5
}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('error', (err) => {
    console.log(err)
})
client.on('warn', (warn) => {
    console.log(warn)
})
var voiceChannelMemberList = []
client.on('voiceStateUpdate', (oldMember, newMember) => {
    console.log("VoiceStateUpdate event triggered")
    var newUserChannel = newMember.channel
    var oldUserChannel = oldMember.channel
    if (oldUserChannel === null && newUserChannel !== null) {
        var newRegisteredMember = new voiceMember(newMember.member.user, newUserChannel, client)
        voiceChannelMemberList.push(newRegisteredMember)
        newRegisteredMember.joinEmbed()
    } else if (oldUserChannel !== null && newUserChannel === null) {
        for (let i = 0; i < voiceChannelMemberList.length; i++) {
            const element = voiceChannelMemberList[i]
            element.leaveEmbed()
            if (element.userID === newMember.member.user.id) voiceChannelMemberList.splice(i)
        }
    } else if (oldUserChannel === newUserChannel && oldUserChannel !== null && newUserChannel !== null) {
        var memberData
        for (let i = 0; i < voiceChannelMemberList.length; i++) {
            const element = voiceChannelMemberList[i]
            if (element.userID === newMember.member.user.id) memberData = element
        }
        if (newMember.selfDeaf !== memberData.state.selfDeaf)
            memberData.updateState(updateStateCode.selfDeaf)
        else if (newMember.selfMute !== memberData.state.selfMute)
            memberData.updateState(updateStateCode.selfMute)
        else if (newMember.serverDeaf !== memberData.state.serverDeaf)
            memberData.updateState(updateStateCode.serverDeaf)
        else if (newMember.serverMute !== memberData.state.serverMute)
            memberData.updateState(updateStateCode.serverMute)
        else if (newMember.streaming !== memberData.state.streaming)
            memberData.updateState(updateStateCode.streaming)
    } else if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel !== newUserChannel) {
        for (let i = 0; i < voiceChannelMemberList.length; i++) {
            const element = voiceChannelMemberList[i]
            element.changeChannelEmbed(newUserChannel)
        }
    }
})
client.login(process.env.TOKEN);
