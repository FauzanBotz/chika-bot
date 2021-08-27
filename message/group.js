"use strict";
const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");
const PhoneNumber = require('awesome-phonenumber')

const { getBuffer, sleep } = require("../lib/myfunc");

let setting = JSON.parse(fs.readFileSync('./config.json'));
let { botName } = setting

module.exports = async(xinz, anj, welcome) => {
    const isWelcome = welcome.includes(anj.jid)
    const mdata = await xinz.groupMetadata(anj.jid)
    const groupName = mdata.subject
    const conts = xinz.contacts[anj.participants[0]] || { notify: anj.jid.replace(/@.+/, '') }
	const pushname = conts.notify || conts.vname || conts.name || PhoneNumber('+' + anj.participants[0].replace('@s.whatsapp.net', '')).getNumber('international')
    if (anj.action === 'add'){
        if (anj.participants[0] === xinz.user.jid){
            await sleep(5000)
            xinz.updatePresence(anj.jid, Presence.composing)
            xinz.sendMessage(anj.jid, `Hai aku ${botName}, silahkan kirim #menu`, MessageType.text)
        } else if (isWelcome){
            try {
                var pic = await xinz.getProfilePicture(anj.participants[0])
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
                xinz.sendButtonsLoc(anj.jid, `Hai @${anj.participants[0].split("@")[0]}, selamat datang di ${groupName}`,`Welcome Messages by ${botName}`, [{"buttonId": `#menu`,"buttonText": {"displayText": "Menu Bot"},"type": "RESPONSE"},{"buttonId": `#rules`,"buttonText": {"displayText": "Rules Bot"},"type": "RESPONSE"},{"buttonId": `#welcome disable`,"buttonText": {"displayText": "Disable Welcome Messages"},"type": "RESPONSE"}], await getBuffer(pic), [anj.participants[0]])
        }
    } else if (anj.action === 'remove' && isWelcome){
        try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        await xinz.sendButtonsLoc(anj.jid, `Sayonara @${anj.participants[0].split("@")[0]}`,`Leave Messages by ${botName}`, [{"buttonId": `#welcome disable`,"buttonText": {"displayText": "Disable Leave Messages"},"type": "RESPONSE"}], await getBuffer(pic), [anj.participants[0]])
    } else if (anj.action == 'promote') {
       try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
    	var teks = `*◪* *PROMOTE DETECT*\n*├─* *Nomor:* ${anj.participants[0].split("@")[0]}\n*└─ ❏* *@${anj.participants[0].split("@")[0]}*`
        var ini_img = await getBuffer(pic)
    	xinz.sendMessage(anj.jid, ini_img, MessageType.image, { caption: teks, contextInfo: {"mentionedJid": [anj.participants[0]]}})
    } else if (anj.action == 'demote') {
       try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        var teks = `*◪* *DEMOTE DETECT*\n*├─* *Nomor:* ${anj.participants[0].split("@")[0]}\n*└─ ❏* *@${anj.participants[0].split("@")[0]}*`
        var ini_img = await getBuffer(pic)
	    xinz.sendMessage(anj.jid, ini_img, MessageType.image, { caption: teks, contextInfo: {"mentionedJid": [anj.participants[0]]}})
    }
}
