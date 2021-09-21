/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageEmbed } from 'discord.js';
const updateStateCode = {
    selfMute: 1,
    selfDeaf: 2,
    serverMute: 3,
    serverDeaf: 4,
    streaming: 5
};
class VoiceMember {
    constructor(user, channel, client, logChannel) {
        this.client = client;
        this.logChannel = logChannel;
        this.username = user.tag;
        this.guildID = channel.guildId;
        this.channelID = channel.id;
        this.channelName = channel.name;
        this.userID = user.id;
        this.state = {
            selfMute: false,
            selfDeaf: false,
            serverMute: false,
            serverDeaf: false,
            streaming: false
        };
    }
    changeChannelEmbed(newChannel) {
        const embed = new MessageEmbed({
            color: 15844367,
            description: "Someone moved from a channel to another.",
            fields: [
                {
                    name: `${this.username}`,
                    value: `has moved from ${this.channelName} to ${newChannel.name}`
                }
            ],
            timestamp: new Date()
        });
        this.channelID = newChannel.id;
        this.channelName = newChannel.name;
        this.sendEmbed(embed);
    }
    changeStateEmbed(message) {
        const embed = new MessageEmbed({
            color: 15844367,
            description: "Someone changed his/her status on voice channels.",
            fields: [
                {
                    name: `${this.username}`,
                    value: `${message}`
                }
            ],
            timestamp: new Date()
        });
        this.sendEmbed(embed);
    }
    compareDifference(newMember) {
        const temp = {
            selfMute: newMember.selfMute,
            selfDeaf: newMember.selfDeaf,
            serverMute: newMember.serverMute,
            serverDeaf: newMember.serverDeaf,
            streaming: newMember.streaming
        };
        if (this.state.selfDeaf !== temp.selfDeaf)
            this.updateState(updateStateCode.selfDeaf);
        if (this.state.selfMute !== temp.selfMute)
            this.updateState(updateStateCode.selfMute);
        if (this.state.serverDeaf !== temp.serverDeaf)
            this.updateState(updateStateCode.serverDeaf);
        if (this.state.serverMute !== temp.serverMute)
            this.updateState(updateStateCode.serverMute);
        if (this.state.streaming !== temp.streaming)
            this.updateState(updateStateCode.streaming);
    }
    joinEmbed() {
        const embed = new MessageEmbed({
            color: 3066993,
            description: "Someone joined a channel.",
            fields: [
                {
                    name: `${this.username}`,
                    value: `has joined ${this.channelName}`
                }
            ],
            timestamp: new Date()
        });
        this.sendEmbed(embed);
    }
    leaveEmbed() {
        const embed = new MessageEmbed({
            color: 15158332,
            description: 'Someone left a voice channel.',
            fields: [
                {
                    name: `${this.username}`,
                    value: `has left ${this.channelName}`
                }
            ],
            timestamp: new Date()
        });
        this.sendEmbed(embed);
    }
    sendEmbed(embed) {
        this.client.guilds.fetch(this.guildID).then((guild) => {
            guild.channels.cache.get(this.logChannel).send({ embeds: [embed] });
        });
    }
    toggleBoolean(x) {
        if (x)
            return (x = false);
        else
            return (x = true);
    }
    updateState(event) {
        const messageList = {
            selfDeaf: ["has deafened him/herself", "has undeafened him/herself"],
            selfMute: ["has muted him/herself", "has unmuted him/herself"],
            serverDeaf: ["has been server deafened", "has been server undeafened"],
            serverMute: ["has been server muted", "has been server unmuted"],
            streaming: ["has started streaming", "has stopped streaming"]
        };
        let message = "";
        switch (event) {
            case 1:
                message = messageList.selfMute[Number(this.state.selfMute)];
                this.state.selfMute = this.toggleBoolean(this.state.selfMute);
                break;
            case 2:
                message = messageList.selfDeaf[Number(this.state.selfDeaf)];
                this.state.selfDeaf = this.toggleBoolean(this.state.selfDeaf);
                break;
            case 3:
                message = messageList.serverMute[Number(this.state.serverMute)];
                this.state.serverMute = this.toggleBoolean(this.state.serverMute);
                break;
            case 4:
                message = messageList.serverDeaf[Number(this.state.serverDeaf)];
                this.state.serverDeaf = this.toggleBoolean(this.state.serverDeaf);
                break;
            case 5:
                message = messageList.streaming[Number(this.state.streaming)];
                this.state.streaming = this.toggleBoolean(this.state.streaming);
                break;
        }
        this.changeStateEmbed(message);
    }
}
export { VoiceMember };
