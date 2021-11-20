"use strict";

//Module
const { 
    downloadContentFromMessage
 } = require("@adiwajshing/baileys-md");
const fs = require("fs");
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const axios = require("axios");
const xfar = require('xfarr-api');

//Library
const { color, bgcolor } = require("../lib/color");
const { ind } = require('../help/')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, convert, convertGif, convertSticker } = require("../lib/myfunc");
const setting = JSON.parse(fs.readFileSync('./config.json'));
let {
    ownerNumber
} = setting

moment.tz.setDefault("Asia/Jakarta").locale("id");
     
module.exports = async(chika, msg, m) => {
    try {
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
        const ucap = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const fromMe = msg.key.fromMe
		const from = msg.key.remoteJid
		const type = Object.keys(msg.message)[0]
        const content = JSON.stringify(msg.message)
        const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ""
        if (chika.multi){
		    var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/gi) : '#'
        } else {
            if (chika.nopref){
                prefix = ''
            } else {
                prefix = chika.prefa
            }
        }
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? msg.participant : msg.key.remoteJid
        const pushname = msg.pushName
        const isCmd = command.startsWith(prefix)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = chika.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await chika.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender)

		const isUrl = (uri) => {
			return uri.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
		}
        const jsonformat = (json) => {
            return JSON.stringify(json, null, 2)
        }

        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedMsg = (type == 'extendedTextMessage')
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

        const reply = (teks, men) => {
             return chika.sendMessage(from, { text: teks, mention: men ? men : [] }, { quoted: msg })
        }
        const textImg = (teks, buffer = fs.readFileSync(setting.pathImg), mess, men) => {
             return chika.sendMessage(from, { text: teks, jpegThumbnail: buffer, mention: men ? men : [] }, { quoted: mess ? mess : msg })
        }
        const sendMess = (from, teks) => {
             return chika.sendMessage(from, { text: teks })
        }

        const sendContact = (jid, numbers, name, quoted, men) => {
            let number = numbers.replace(/[^0-9]/g, '')
            const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:' + name + '\n'
            + 'ORG:;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
            + 'END:VCARD'
            return chika.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : men ? men : []},{ quoted: quoted })
        }

        const sendFileFromUrl = async (from, url, caption, msg, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return chika.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
                }
            let type = mime.split("/")[0]+"Message"
            if(mime === "application/pdf"){
                return chika.sendMessage(from, { document: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg, mimetype: 'application/pdf'})
            }
            if(mime.split("/")[0] === "image"){
                return chika.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            }
            if(mime.split("/")[0] === "video"){
                return chika.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            }
            if(mime.split("/")[0] === "audio"){
                return chika.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg, mimetype: 'audio/mp4'})
            }
        }
        
        const downloadAndSaveMediaMessage = async(mediatype, filename = 'undefined') => {
            return new Promise(async (resolve, reject) => {
                let type
                if (mediatype == "image") type = "imageMessage"
                if (mediatype == "audio") type = "audioMessage"
                if (mediatype == "video") type = "videoMessage"
                if (mediatype == "sticker") type = "stickerMessage"
                let stream
                if (msg.message.extendedTextMessage == null) stream = await downloadContentFromMessage(msg.message[type], mediatype)
                else stream = await downloadContentFromMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage[type], mediatype)
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(filename, buffer)
                resolve(filename)
            })
        }

        const _0x483176=_0x3dc2;function _0x3fcc(){const _0x1635e4=['1872647kvlITQ','1412458kynqMz','stickerMessage','message','1172799JXjaML','imageMessage','12XZxYdh','68BHkagy','8qylHdg','undefined','writeFileSync','1CxkcSE','2890720AosDed','10600458WErmEd','concat','2633920ijGMiI','quotedMessage','extendedTextMessage','audio','audioMessage','image','175533IqiEDt','from'];_0x3fcc=function(){return _0x1635e4;};return _0x3fcc();}function _0x3dc2(_0x26292f,_0x13bdaa){const _0x3fcc96=_0x3fcc();return _0x3dc2=function(_0x3dc26a,_0x85631){_0x3dc26a=_0x3dc26a-0x1af;let _0x11112d=_0x3fcc96[_0x3dc26a];return _0x11112d;},_0x3dc2(_0x26292f,_0x13bdaa);}(function(_0x431973,_0x5ac35c){const _0x1b26cc=_0x3dc2,_0x394e9d=_0x431973();while(!![]){try{const _0x4261de=parseInt(_0x1b26cc(0x1bc))/0x1*(-parseInt(_0x1b26cc(0x1b2))/0x2)+parseInt(_0x1b26cc(0x1af))/0x3*(parseInt(_0x1b26cc(0x1b8))/0x4)+parseInt(_0x1b26cc(0x1bd))/0x5+parseInt(_0x1b26cc(0x1b7))/0x6*(parseInt(_0x1b26cc(0x1b1))/0x7)+-parseInt(_0x1b26cc(0x1b9))/0x8*(parseInt(_0x1b26cc(0x1b5))/0x9)+parseInt(_0x1b26cc(0x1c0))/0xa+-parseInt(_0x1b26cc(0x1be))/0xb;if(_0x4261de===_0x5ac35c)break;else _0x394e9d['push'](_0x394e9d['shift']());}catch(_0x5a3ecd){_0x394e9d['push'](_0x394e9d['shift']());}}}(_0x3fcc,0x8b6a7));const downloadAndSaveMediaMessage=async(_0x489458,_0x5d9c5b=_0x483176(0x1ba))=>{return new Promise(async(_0x42e4c0,_0x51263a)=>{const _0x21b133=_0x3dc2;let _0x54a42a;if(_0x489458==_0x21b133(0x1c5))_0x54a42a=_0x21b133(0x1b6);if(_0x489458==_0x21b133(0x1c3))_0x54a42a=_0x21b133(0x1c4);if(_0x489458=='video')_0x54a42a='videoMessage';if(_0x489458=='sticker')_0x54a42a=_0x21b133(0x1b3);let _0x428645;if(msg[_0x21b133(0x1b4)][_0x21b133(0x1c2)]==null)_0x428645=await downloadContentFromMessage(msg['message'][_0x54a42a],_0x489458);else _0x428645=await downloadContentFromMessage(msg[_0x21b133(0x1b4)][_0x21b133(0x1c2)]['contextInfo'][_0x21b133(0x1c1)][_0x54a42a],_0x489458);let _0x192481=Buffer[_0x21b133(0x1b0)]([]);for await(const _0x16ebca of _0x428645){_0x192481=Buffer[_0x21b133(0x1bf)]([_0x192481,_0x16ebca]);}fs[_0x21b133(0x1bb)](_0x5d9c5b,_0x192481),_0x42e4c0(_0x5d9c5b);});};

        if (isCmd && !isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
        }
        if (isCmd && isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }

        if (isOwner){
            if (chats.startsWith("> ")){
                console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    textImg(`${evaled}`)
                } catch (err) {
                    textImg(`${err}`)
                }
            } else if (chats.startsWith("++ ")){
                console.log(color('[EVAL JSON]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                try {
                    let evaled = await eval(chats.slice(2))
                    textImg(jsonformat(evaled))
                } catch (err) {
                    textImg(`${err}`)
                }
            } else if (chats.startsWith("$ ")){
                console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                exec(chats.slice(2), (err, stdout) => {
					if (err) return textImg(`${err}`)
					if (stdout) textImg(`${stdout}`)
				})
            }
        }

		switch (command) {
            case prefix+'rule': case prefix+'rules':
                textImg(ind.rules(prefix))
            break
            case prefix+'tos': case prefix+'donate': case prefix+'donasi':
                textImg(ind.tos(ownerNumber[0].split('@')[0], prefix))
            break
            case prefix+'owner':
                for (let x of ownerNumber) {
                    sendContact(from, x, 'Owner - ' + setting.botName, msg)
                }
            break
            case prefix+'menu': {
                textImg(from, `Hai kak ${pushname}, saya ChikaBot\n\nBot ini adalah Beta Multi-Device Whatsapp, Bot ini juga example base untuk menggunakan api xfarr. Ketik ${prefix}allmenu untuk liat list menu`)
            }
            break
            case prefix+'allmenu': {
                textImg(`*Selamat ${ucap} ${pushname} 😖*

⌚Time Server : ${time}
*📚 List-Menu Chika Beta :*

😷 *WEEBS*
├ ${prefix}anime query
├ ${prefix}manga query
├ ${prefix}character query
└──────

🔍 *MISC*
├ ${prefix}film query
├ ${prefix}wattpad query
├ ${prefix}webtoons query
├ ${prefix}drakor query
├ ${prefix}pinterest query
└──────

🎞 *MEDIA*
├ ${prefix}toimg
└──────

⬇️ *DOWNLOADER* 
├ ${prefix}tiktok link
├ ${prefix}ytdl link
├ ${prefix}ytmp3 link
├ ${prefix}ytmp4 link
├ ${prefix}facebook link
├ ${prefix}twitter link
├ ${prefix}instagram link
└──────
                
🙏Thanks For
├ xfarr-Api (https://github.com/xfar05/xfarr-api)
└──────

`)
            }
            break
            //Weebs
            case prefix+'anime':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Anime(q).then(async data => {
                    let txt = `*-------「 ANIME-SEARCH 」-------*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'character': case prefix+'karakter':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Character(q).then(async data => {
                    let txt = `*---「 CHARACTER-SEARCH 」---*\n\n`
                    for (let i of data) {
                        txt += `*📫 Character :* ${i.character}\n`
                        txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'manga':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Manga('naruto').then(async data => {
                    let txt = `*------「 MANGA-SEARCH 」------*\n\n`
                    for (let i of data) {
                         txt += `*📫 Title :* ${i.judul}\n`
                         txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            //Misc
            case prefix+'film':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Film(q).then(async data => {
                    let txt = `*--------「 FILM-SEARCH 」--------*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*🎞️ Type :* ${i.type}\n`
                        txt += `*📟 Quality :* ${i.quality}\n`
                        txt += `*📮Upload :* ${i.upload}\n`
                        txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumb,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'pinterest': case prefix+'pin':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Pinterest(q).then(async data => {
                    await sendFileFromUrl(from,data.url,ind.ok(),msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'wattpad':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Wattpad(q).then(async data => {
                    let txt = `*----「 WATTPAD-SEARCH 」----*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*👀 Reads :* ${i.dibaca}\n`
                        txt += `*🗣️ Voting :* ${i.divote}\n`
                        txt += `*🗂️ Bab :* ${i.bab}\n`
                        txt += `*⏳Time :* ${i.waktu}\n`
                        txt += `*📚 Url :* ${i.url}\n`
                        txt += `*🏷️ Description :* ${i.description}\n -----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumb,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'drakor':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Drakor(q).then(async data => {
                    let txt = `*-----「 DRAKOR-SEARCH 」-----*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*📆 Years :* ${i.years}\n`
                        txt += `*🎥 Genre :* ${i.genre}\n`
                        txt += `*📚 Url :* ${i.url}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'webtonsearch': case prefix+'webtoon':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Webtoons(q).then(async data => {
                    let txt = `*------「 WEBTOONS-SEARCH 」------*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*👍🏻 Like :* ${i.like}\n`
                        txt += `*🤴🏻 Creator :* ${i.creator}\n`
                        txt += `*🎥 Genre :* ${i.genre}\n`
                        txt += `*📚 Url :* ${i.url}\n ----------------------------------------------------------\n`
                    }
                    await textImg(txt)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            //Convert and Media
            case prefix+'toimg': case prefix+'stickertoimg': case prefix+'stoimg': case prefix+'stikertoimg': case prefix+'togif': case prefix+'tovid': case prefix+'tovideo': case prefix+'tomedia':
				if (isQuotedSticker) {
			    	let media = await downloadAndSaveMediaMessage('sticker', 'sticker.webp')
			    	if (msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated) {
                        await textImg(ind.wait())
                        let filenya = await convertSticker(media)     
                        if (command.split(prefix)[1] === 'togif') { 
                            await chika.sendMessage(from, { video: await convertGif(filenya), caption: ind.ok(), gifPlayback: true}, {quoted: msg}).then(res => fs.unlinkSync(media))
                        } else {    
                            await sendFileFromUrl(from, filenya, ind.ok(), msg).then(res => fs.unlinkSync(media))
                        }
					} else {
                        await textImg(ind.wait())
			    		let ran = getRandom('.png')
					    exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
						    fs.unlinkSync(media)
						    if (err) return textImg('Gagal :V')
						    await chika.sendMessage(from, { image: fs.readFileSync(ran), caption: ind.ok() }, { quoted: msg }).then(res => fs.unlinkSync(ran))
					    })
					}
                } else {
                    textImg(ind.wrongFormat(prefix))
                }
	        break
            //Downloader
            case prefix+'tiktok':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('tiktok.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Tiktok(args[1]).then(async data => {
                    let txt = `*----「 TIKTOK DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*🎞️ Type :* ${data.medias[0].extension}\n`
                    txt += `*📟 Quality :* ${data.medias[0].quality}\n`
                    txt += `*💾 Size :* ${data.medias[0].formattedSize}\n`
                    txt += `*📚 Url :* ${data.url}`
                    sendFileFromUrl(from, data.medias[0].url, ind.ok(), msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'facebook': case prefix+'fb': case prefix+'fbdl': case prefix+'facebookdl':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('facebook.com') && !q.includes('fb.watch')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Facebook(args[1]).then(async data => {
                    let txt = `*----「 FACEBOOK DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*🎞️ Type :* ${data.medias[0].extension}\n`
                    txt += `*📟 Quality :* ${data.medias[0].quality}\n`
                    txt += `*💾 Size :* ${data.medias[0].formattedSize}\n`
                    txt += `*📚 Url :* ${data.url}`
                    sendFileFromUrl(from,data.medias[0].url,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'twtdl': case prefix+'twt': case prefix+'twitterdl': case prefix+'twitter':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('twitter.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Twitter(args[1]).then(async data => {
                    let txt = `*----「 TWITTER DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*📟 Quality :* ${data.medias[1].quality}\n`
                    txt += `*💾 Size :* ${data.medias[1].formattedSize}\n`
                    txt += `*📚 Url :* ${data.url}`
                    sendFileFromUrl(from,data.medias[1].url,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
           case prefix+'ig': case prefix+'igdl': case prefix+'instagram': case prefix+'instagramdl':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('instagram.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Instagram(args[1]).then(async data => {
                    let txt = `*----「 INSTAGRAM DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*🎥📸 Total File :* ${data.medias.length}\n`
                    txt += `*📚 Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    await sendFileFromUrl(from,data.thumbnail,txt,msg).then(async res => {
                        for (let i of data.medias) {
                            sendFileFromUrl(from, i.url, '', res)
                        }
                    })
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'mp4': case prefix+'ytmp4':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('youtu.be') && !q.includes('youtube.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Youtube(args[1]).then(async (data) => {
                    let txt = `*----「 YOUTUBE VIDEO 」----*\n\n`
                    txt += `*📟 Quality :* ${data.medias[1].quality}\n`
                    txt += `*🎞️ Type :* ${data.medias[1].extension}\n`
                    txt += `*💾 Size :* ${data.medias[1].formattedSize}\n`
                    txt += `*📚 Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    sendFileFromUrl(from, data.thumbnail, txt, msg)
                    sendFileFromUrl(from, data.medias[1].url, ind.ok(), msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'mp3': case prefix+'ytmp3':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('youtu.be') && !q.includes('youtube.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Youtube(args[1]).then(async (data) => {
                    let txt = `*----「 YOUTUBE AUDIO 」----*\n\n`
                    txt += `*📟 Quality :* ${data.medias[7].quality}\n`
                    txt += `*🎞️ Type :* ${data.medias[7].extension}\n`
                    txt += `*💾 Size :* ${data.medias[7].formattedSize}\n`
                    txt += `*📚 Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    sendFileFromUrl(from, data.thumbnail, txt, msg)
                    await sendFileFromUrl(from, data.medias[7].url, '', msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            default:
            if (isCmd) {
                textImg(ind.cmdNotFound(command, prefix))
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
