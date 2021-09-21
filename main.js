import { Client, Intents } from 'discord.js';
// import { channelID, token } from "./config.js";
import { VoiceMember } from "./functions/index.js"
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
var voiceChannelMemberList = []
client.on('voiceStateUpdate', (oldMember, newMember) => {
    console.log("VoiceStateUpdate event triggered")
    var newUserChannel = newMember.channel
    var oldUserChannel = oldMember.channel
    if (oldUserChannel === null && newUserChannel !== null) {
        var newRegisteredMember = new VoiceMember(newMember.member.user, newUserChannel, client, "878928621148966932")
        // var newRegisteredMember = new VoiceMember(newMember.member.user, newUserChannel, client, channelID)
        voiceChannelMemberList.push(newRegisteredMember)
        newRegisteredMember.joinEmbed()
    } else if (oldUserChannel !== null && newUserChannel === null) {
        for (let i = 0; i < voiceChannelMemberList.length; i++) {
            const element = voiceChannelMemberList[i]
            if (element.userID === newMember.member.user.id) {
                element.leaveEmbed()
                voiceChannelMemberList.splice(i)
            }
        }
    } else if (oldUserChannel === newUserChannel && oldUserChannel !== null && newUserChannel !== null) {
        var memberData
        for (let i = 0; i < voiceChannelMemberList.length; i++) {
            const element = voiceChannelMemberList[i]
            if (element.userID === newMember.member.user.id) memberData = element
        }
        if (memberData !== undefined) memberData.compareDifference(newMember)
    } else if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel !== newUserChannel) {
        for (let i = 0; i < voiceChannelMemberList.length; i++) {
            const element = voiceChannelMemberList[i]
            if (element.userID === newMember.member.user.id)
                element.changeChannelEmbed(newUserChannel)
        }
    }
})
client.login(process.env.TOKEN);
// client.login(token)
