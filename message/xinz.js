"use strict";
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    WA_DEFAULT_EPHEMERAL
} = require("@adiwajshing/baileys");
const fs = require("fs");
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const qrcode = require("qrcode");
const ffmpeg = require("fluent-ffmpeg");
const fetch = require("node-fetch");
const ms = require("parse-ms");
const toMS = require("ms");
const axios = require("axios");
const cheerio = require("cheerio");
const speed = require("performance-now");
const yts = require("yt-search");
const translate = require("@vitalets/google-translate-api");
const listbahasa = require("@vitalets/google-translate-api/languages");
const { default: Axios } = require("axios");
const util = require("util");
const nhSearch = require('nhentai-node-api');
const nhentai = require('nhentai-js');
const mathjs = require('mathjs');
const tts = require('node-gtts');
const FormData = require('form-data');
const getMime = require('file-type');
const gis = require('g-i-s');
const google = require('google-it');
const WSF = require('wa-sticker-formatter')
const petpet = require('pet-pet-gif')
const Nekos = require('nekos.life');
const imgbb = require('imgbb-uploader')
const neko = new Nekos();
const { color, bgcolor } = require("../lib/color");
const { serialize, serializeM, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, logic } = require("../lib/myfunc");
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const _prem = require("../lib/premium");
const _sewa = require("../lib/sewa");
const afk = require("../lib/afk");
const { ind } = require('../help/')
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../lib/banned");
const { yta, ytv } = require("../lib/ytdl");
const { getUser, getPost, searchUser } = require('../lib/instagram');
const { fbdl } = require("../lib/fbdl");
const { fakeStatus, fakeToko } = require("./fakeReply");
const game = require("../lib/game");
const { addBadword, delBadword, isKasar, addCountKasar, isCountKasar, delCountKasar } = require("../lib/badword");

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let setting = JSON.parse(fs.readFileSync('./config.json'));
let mess = JSON.parse(fs.readFileSync('./message/mess.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let ban = JSON.parse(fs.readFileSync('./database/ban.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let autosticker = JSON.parse(fs.readFileSync('./database/autosticker.json'));
let nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'));
let antiviewonce = JSON.parse(fs.readFileSync('./database/antiviewonce.json'));
let badword = JSON.parse(fs.readFileSync('./database/badword.json'));
let grupbadword = JSON.parse(fs.readFileSync('./database/grupbadword.json'));
let senbadword = JSON.parse(fs.readFileSync('./database/senbadword.json'));
let mute = JSON.parse(fs.readFileSync('./database/mute.json'));
let _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
let _level = JSON.parse(fs.readFileSync('./database/level.json'))
let _respon = JSON.parse(fs.readFileSync('./database/respon.json'))
let _stick = JSON.parse(fs.readFileSync('./database/sticker.json'))
let _vn = JSON.parse(fs.readFileSync('./database/vn.json'))
let _image = JSON.parse(fs.readFileSync('./database/image.json'))
let _scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))
let _claim = JSON.parse(fs.readFileSync('./database/claim.json'))
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));

// Hit
global.hit = {}

//Gambar Url
const bgbot = 'https://i.ibb.co/Rpdfnwh/images-q-tbn-ANd9-Gc-Tmn-q-Sq-E0m-Fr-QUEpar-Wd-L-GK5u-Rb-M9661-Xw-usqp-CAU.jpg'


// Game
let tebakgambar = [];
let family100 = [];

let { ownerNumber, limitCount, lolkey, zekskey, gamewaktu, tobzkey, aqulzkey } = setting
moment.tz.setDefault("Asia/Jakarta").locale("id");
     
const getLevelingXp = (userId) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].xp
    }
}
const getLevelingLevel = (userId) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].level
    }
}
const getLevelingId = (userId) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].jid
    }
}
const addLevelingXp = (userId, amount) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        _level[position].xp += amount
        fs.writeFileSync('./database/level.json', JSON.stringify(_level))
    }
}
const addLevelingLevel = (userId, amount) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        _level[position].level += amount
        fs.writeFileSync('./database/level.json', JSON.stringify(_level))
    }
}
const addLevelingId = (userId) => {
    const obj = {jid: userId, xp: 1, level: 1}
    _level.push(obj)
    fs.writeFileSync('./database/level.json', JSON.stringify(_level))
}
const xpGain = new Set()
const isGained = (userId) => {
    return !!xpGain.has(userId)
}
const addCooldown = (userId) => {
    xpGain.add(userId)
    setTimeout(() => {
        return xpGain.delete(userId)
    }, 60000)
}
const addResponBot = (txt, respon) => {
    const obj = { txt: txt, resp: respon }
    _respon.push(obj)
    fs.writeFileSync('./database/respon.json', JSON.stringify(_respon))
}
const checkText = (txt) => {
    let status = false
    Object.keys(_respon).forEach((i) => {
        if (_respon[i].txt === txt) {
            status = true
        }
    })
    return status
}

const getRespon = (txt) => {
    let position = null
    Object.keys(_respon).forEach((i) => {
        if (_respon[i].txt === txt) {
            position = i
        }
    })
    if (position !== null) {
        return _respon[position].resp
    }
}

const getResponPosition = (txt) => {
    let position = null
    Object.keys(_respon).forEach((i) => {
        if (_respon[i].txt === txt) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getAllRespon = () => {
    const array = []
    Object.keys(_respon).forEach((i) => {
        array.push(_respon[i].txt)
    })
    return array
}
module.exports = async(xinz, msg, smsg, blocked, _afk, welcome) => {
    try {
        const m = smsg
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
        const ucap = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, chats, isBaileys } = msg
        if (fromMe && isBaileys) return
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product, listMessage, buttonsMessage, contactsArray, groupInviteMessage } = MessageType
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
        if (xinz.multi){
		    var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.+,\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.+,\/\\©^]/gi) : '#'
        } else {
            if (xinz.nopref){
                prefix = ''
            } else {
                prefix = xinz.prefa
            }
        }
        const isCmd = command.startsWith(prefix)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = xinz.user.jid
        const groupMetadata = isGroup ? await xinz.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender)
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isSewa = _sewa.checkSewaGroup(from, sewa)
	    const isBan = cekBannedUser(sender, ban)
        const isClaimOn = _claim.includes(sender)
        const isBlocked = blocked.includes(sender)
        const isAfkOn = afk.checkAfkUser(sender, _afk)
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const isAntiVO = isGroup ? antiviewonce.includes(from) : false
        const isWelcome = isGroup ? welcome.includes(from) : false
        const isAutoSticker = isGroup ? autosticker.includes(from) : false
        const isNsfw = isGroup ? nsfw.includes(from) : false
        const isBadword = isGroup ? grupbadword.includes(from) : false
        const isMuted = isGroup ? mute.includes(from) : false
        const isLevelingOn = isGroup ? _leveling.includes(from) : false
        const isUser = pendaftar.includes(sender)
        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user

        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }   
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function randomNomor(angka){
            return Math.floor(Math.random() * angka) + 1
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        const reply = (teks, id, options) => {
            return xinz.reply(from, teks, id ? id : msg, options)
        }
        const testqq = (from, desk) => {
            return xinz.sendButtons(from, `Pilihan Anda Salah!!`, `Pilih yang bener, jangan ngasal!!`,`Pilih Enable atau Disable`, [{"buttonId": `${prefix}${desk} enable`,"buttonText": {"displayText": "ENABLE"},"type": "RESPONSE"},{"buttonId": `${prefix}${desk} disable`,"buttonText": {"displayText": "DISABLE"},"type": "RESPONSE"}], false, null)
        }
        const mentions = (teks, memberr, id) => {
            let ai = (id == null || id == undefined || id == false) ? xinz.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : xinz.sendMessage(from, teks.trim(), extendedText, {quoted: msg, contextInfo: {"mentionedJid": memberr}})
            return ai
        }
        const textImg = (teks, id, men) => {
            return xinz.textImg(from, teks, id ? id : msg, men ? men : [sender, "0@s.whatsapp.net"])
        }
        async function uptotele(path){
            let form = new FormData();
            form.append('photo', fs.createReadStream(path))
            let data = await Axios({ method: "POST", url: "https://telegra.ph/upload",data: form, headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}`}})
            return 'https://telegra.ph' + data.data[0].src
         }
        async function uptoibb(path){
            return new Promise (async (resolve, reject) => {
            imgbb('91904762b2cd230ce1d861279bd6bf1d', path).then((res) =>{
            resolve(res.url)
		        	}).catch(reject)
        	})
         }
        async function uptoaqulz(path) {
	        let form = new FormData();
            form.append('apikey', aqulzkey)
            form.append('fileToUpload', fs.createReadStream(path))
            let data = await Axios({ method: "POST", url: "https://justaqul.xyz/upload",data: form, headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}`}})
            return data.data.result
        }
        async function getGroup() {
            let totalchat = await xinz.chats.all();let grup = []; let a = []; let b = []
        	for (let c of totalchat){
	        	a.push(c.jid)
        	};for (let d of a){
	        	if (d && d.includes('g.us')){
        		b.push(d)
       		    }};for (let e of b){
	         	let ingfo = await xinz.groupMetadata(e)
	        	grup.push(ingfo)
	        }
	        return grup
        }

        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isList = (type == 'listResponseMessage')
        const isButton = (type == 'buttonsResponseMessage')
        const isViewOnce = (type == 'viewOnceMessage')
        const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? (quotedMsg.type === 'audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? (quotedMsg.type === 'documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false
        const isQuotedList = isQuotedMsg ? (quotedMsg.type === 'listResponseMessage') ? true : false : false
        const isQuotedButton = isQuotedMsg ? (quotedMsg.type === 'buttonsResponseMessage') ? true : false : false
        const isQuotedContact = isQuotedMsg ? (quotedMsg.type === 'contactMessage') ? true : false : false

        // Mode
        if (xinz.mode === 'self'){
            if (!isOwner && !fromMe) return
            if (fromMe && isBaileys) return
        }

        // Only Me
       if (isList && isCmd && !quotedMsg.fromMe) return
       if (isButton && isCmd && !quotedMsg.fromMe) return

        // Roles
        var levelRole = getLevelingLevel(sender)
        var role = 'Copper'
        if (levelRole <= 25) {
            role = 'Silver'
        } else if (levelRole <= 50) {
            role = 'Gold'
        } else if (levelRole <= 75) {
            role = 'Platinum'
        } else if (levelRole < 100) {
            role = 'Exterminator'
        }
        // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                xinz.groupRemove(from, [sender])
            }
        }
        //Anti VO
        if (isGroup && isViewOnce && isAntiVO && xinz.mode !== 'self') {
            let typenya = msg.message.viewOnceMessage.message["videoMessage"] ? msg.message.viewOnceMessage.message.videoMessage : msg.message.viewOnceMessage.message.imageMessage
            typenya["viewOnce"] = false
            typenya["caption"] = `\`\`\`Anti-ViewOnce\n\n\nCaption : ${(typenya.caption === '') ? 'NONE' : typenya.caption}\`\`\``
            let peq = msg.message.viewOnceMessage.message["imageMessage"] ? { key: { fromMe: false, participant: sender, id: msg.key.id }, message: {"viewOnceMessage": {"message": { "imageMessage" : {"viewOnce": true } } } } } :  { key: { fromMe: false, participant: sender, id: msg.key.id }, message: {"viewOnceMessage": {"message": { "imageMessage" : {"viewOnce": true } } } } }
            let pe = await xinz.prepareMessageFromContent(from, msg.message.viewOnceMessage.message, {quoted: peq})
            await xinz.relayWAMessage(pe)
        }
        //Responder
        if (isGroup && !isCmd && !isBaileys) {
            const autoresp = getRespon(chats.toLowerCase())
            if (autoresp !== null && autoresp !== undefined) return reply(autoresp)
            if (_stick.includes(chats.toLowerCase())) {
                xinz.sendSticker(from, `./media/sticker/${chats}.webp`, msg)
            }
            if (_vn.includes(chats.toLowerCase())) {
                xinz.sendMessage(from, fs.readFileSync(`./media/audio/${chats}.mp3`), audio, { quoted: msg, ptt: true})
            }
        }
        if (isGroup && isAutoSticker) {
                if (isImage || isVideo) {
                    let media = await xinz.downloadAndSaveMediaMessage(msg, `./sticker/${sender}`)
                    xinz.sendSticker(from, media, msg).then((res) => fs.unlinkSync(media))
             }
        }

        //function leveling
        if (isGroup && isLevelingOn && isUser && xinz.mode !== 'self' && !isMuted && !isGained(sender)) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                addCooldown(sender)
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 150
                const requiredXp = 200 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await textImg(`*──「 LEVEL UP 」──*\n\n❑ *Name*: @${sender.split('@')[0]}\n❑ *XP*: ${getLevelingXp(sender)}\n❑ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n❑ *Role*: ${role} \n\nCongrats!! 🎉`)
                }
            } catch (err) {
                console.error(err)
            }
        }
        // Badword
        if (isGroup && isBadword && !isOwner && !isGroupAdmins && !fromMe){
            for (let kasar of badword){
                if (chats.toLowerCase().includes(kasar)){
                    if (isCountKasar(sender, senbadword)){
                        if (!isBotGroupAdmins) return reply(`Kamu beruntung karena bot bukan admin`)
                        reply(`*「 ANTI BADWORD 」*\n\nSepertinya kamu sudah berkata kasar lebih dari 5x, maaf kamu akan di kick`)
                        xinz.groupRemove(from, [sender])
                        delCountKasar(sender, senbadword)
                    } else {
                        addCountKasar(sender, senbadword)
                        reply(`Kamu terdeteksi berkata kasar\nJangan ulangi lagi atau kamu akan dikick`)
                    }
                }
            }
        }
        if (isGroup && isBaileys) {
            if (mentioned.length >= groupMembers.length){
                if (!chats.match(/(@)/gi)) {
                    mentions(`Terdeteksi @${sender.split('@')[0]} melakukan hidetag`, [sender], false)
                }
            }
        }

        // Banned 
        if (isBlocked && isCmd && command.split(prefix)[1] !== 'unban')textImg(ind.BlockBan(ownerNumber[0].split('@')[0], prefix))
        if (isBan && isCmd && command.split(prefix)[1] !== 'unban') return textImg(ind.BlockBan(ownerNumber[0].split('@')[0], prefix))
        if (isBan) return
        if (isBlocked) return 
        BannedExpired(ban)

        // MUTE
        if (isMuted){
            if (!isGroupAdmins && !isOwner) return
        }
        // GAME 
        game.cekWaktuFam(xinz, family100)
        game.cekWaktuTG(xinz, tebakgambar)

        // GAME 
        if (game.isTebakGambar(from, tebakgambar) && isUser){
            if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                let list = []
                let kuispref = [`family100`,`tebakgambar`]
                let kuisdesk = [`Game Dimana berusaha menebak jawaban terbanyak berdasarkan survey 100 orang`,`Game kombinasi beberapa gambar yang apabila dirangkai dapat menjadi sebuah kata`]
                let kuistitle = [`Family100 Game`,`Tebak Gambar`]
                let startnum = 0 ; let startnumm = 0
                    for (let x of kuispref) {
                        const yyyy = {
                        title: `${kuistitle[startnum++]}`,
                        description: `${kuisdesk[startnumm++]}`,
                        rowId: `${prefix}${x}`
                      }
                        list.push(yyyy)
                    }
                xinz.sendListMsg(from, `Selamat @${sender.split('@')[0]}`, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebakgambar)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim *${prefix}tebakgambar*`, `Ingin bermain kuis lain? Pilih dibawah`,`Pilih Disini`, `List Kuis`, list, null, [sender])
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
            }
        }
        if (game.isfam(from, family100) && isUser){
            var anjuy = game.getjawaban100(from, family100)
            for (let i of anjuy){
                if (chats.toLowerCase().includes(i)){
                    var htgmi = Math.floor(Math.random() * 20) + 1
                    addBalance(sender, htgmi, balance)
                    await reply(`*Jawaban benar*\n*Jawaban :* ${i}\n*Hadiah :* $${htgmi}\n*Jawaban yang blum tertebak :* ${anjuy.length - 1}`)
                    var anug = anjuy.indexOf(i)
                    anjuy.splice(anug, 1)
                }
            }
            if (anjuy.length < 1){
                let list = []
                let kuispref = [`family100`,`tebakgambar`]
                let kuisdesk = [`Game Dimana berusaha menebak jawaban terbanyak berdasarkan survey 100 orang`,`Game kombinasi beberapa gambar yang apabila dirangkai dapat menjadi sebuah kata`]
                let kuistitle = [`Family100 Game`,`Tebak Gambar`]
                let startnum = 0 ; let startnumm = 0
                    for (let x of kuispref) {
                        const yyyy = {
                        title: `${kuistitle[startnum++]}`,
                        description: `${kuisdesk[startnumm++]}`,
                        rowId: `${prefix}${x}`
                      }
                        list.push(yyyy)
                    }
                xinz.sendListMsg(from, `Family Game`, `Semua jawaban sudah tertebak\nKirim *${prefix}family100* untuk bermain lagi`, `Ingin bermain kuis lain? Pilih dibawah`,`Pilih Disini`, `List Kuis`, list, null)
                family100.splice(game.getfamposi(from, family100), 1)
            }
        }
        // Premium
        _prem.expiredCheck(global.xinz, premium)
        // Sewa
        _sewa.expiredCheck(global.xinz, sewa)

        if (isCmd && !isUser){
			pendaftar.push(sender)
			fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar))
        } 
        // Add hit
        if (isCmd) {
            axios.get('https://api.countapi.xyz/hit/' + setting.botName + '/visits').then(({data}) => hit.all = data.value)
            axios.get(`https://api.countapi.xyz/hit/${setting.botName}${moment.tz('Asia/Jakarta').format('DDMMYYYY')}/visits`).then(({data}) => hit.today = data.value)
        }
        // AFK
        if (isGroup && !isBaileys) {
            if (mentioned.length !== 0){
                if (mentioned.includes(xinz.user.jid)) return textImg(`Iya, ada yg bisa ${setting.botName} Bantu Kak?`)
                for (let ment of mentioned) {
                    if (afk.checkAfkUser(ment, _afk)) {
                        const getId = afk.getAfkId(ment, _afk)
                        const getReason = afk.getAfkReason(getId, _afk)
                        const getTime = Date.now() - afk.getAfkTime(getId, _afk)
                        const heheh = ms(getTime)
                        await mentions(`@${ment.split('@')[0]} sedang afk\n\n*Alasan :* ${getReason}\n*Sejak :* ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu`, [ment], true)
                        xinz.sendMess(ment, `Ada yang mencari anda saat anda offline\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nIn Group : ${groupName}\nPesan : ${chats}`)
                    }
                }
            }
            if (afk.checkAfkUser(sender, _afk)) {
                _afk.splice(afk.getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                await mentions(`@${sender.split('@')[0]} telah kembali`, [sender], true)
            }
        }
        // CMD
        if (isCmd && !isGroup && !isBaileys) {
            addBalance(sender, randomNomor(20), balance)
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
        }
        if (isCmd && isGroup && !isBaileys) {
            addBalance(sender, randomNomor(20), balance)
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
            } else if (chats.startsWith("$ ")){
                console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                exec(chats.slice(2), (err, stdout) => {
					if (err) return textImg(`${err}`)
					if (stdout) textImg(`${stdout}`)
				})
            }
        }

        switch(command){
            case 'prefix': case 'cekprefix':{
                textImg(`${prefix}`)
            }
                break
            case prefix+'pantun':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson(`https://api.lolhuman.xyz/api/random/pantun?apikey=${lolkey}`)
                .then((kontlo)=>{
                    textImg(kontlo.result)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
            }
                break
            case prefix+'menu': case prefix+'help':{
                let qqppp = [{
                    "buttonId": `${prefix}allmenu`,
                    "buttonText": {
                        "displayText": "COMMAND"
                    },
                    "type": "RESPONSE"
                },{
                    "buttonId": `${prefix}rules`,
                    "buttonText": {
                        "displayText": "RULES"
                    },
                    "type": "RESPONSE"
                }]
                xinz.sendButtonsLoc(from, `Hai Kak @${sender.split('@')[0]}\n\nSaya ChikaBot, Bot WhatsApp yg membantu kamu untuk mempermudah sesuatu seperti Membuat Sticker dan Lainnya, Ada Butuh Info Dariku?`, `Note: Kalo kamu pakai wa lama atau mod, dan button ga keliatan, langsung aja ketik ${prefix}allmenu`, qqppp, fs.readFileSync(setting.pathImg), [sender])
                }
                break
             case prefix+'allmenu':{
                    try {
                        var pic = await xinz.getProfilePicture(sender)
                    } catch {
                        var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                    }
                    const jumlahCommand = require('util').inspect(hit.all)
                    const jumlahHarian = require('util').inspect(hit.today)
                    const jumlahUser = pendaftar.length
                    const levelMenu = getLevelingLevel(sender)
                    const xpMenu = getLevelingXp(sender)
                    const reqXp  = 200 * (Math.pow(2, getLevelingLevel(sender)) - 1)
			        const uangku = getBalance(sender, balance)
                    const Limitnya = isPremium ? `UNLIMITED*\n*Expire : ${ms(_prem.getPremiumExpired(sender, premium) - Date.now()).days} day(s) ${ms(_prem.getPremiumExpired(sender, premium) - Date.now()).hours} hour(s) ${ms(_prem.getPremiumExpired(sender, premium) - Date.now()).minutes} minute(s)` : `${getLimit(sender, limitCount, limit)}`
                    var b = xinz.mode
                    let qqppp = [{
                    "buttonId": `${prefix}sewabot`,
                    "buttonText": {
                        "displayText": "SEWABOT"
                    },
                    "type": "RESPONSE"
                    }]
                    xinz.sendButtonsLoc(from, ind.menu(prefix, ucap, pushname, jumlahUser, runtime(process.uptime()), ownerNumber[0].split("@")[0], jumlahHarian, jumlahCommand, sender, time, `*${b.toUpperCase()}*`, levelMenu, xpMenu, reqXp, uangku, role, Limitnya), `Pilih menu dibawah!`, qqppp, await getBuffer(pic), [sender, "0@s.whatsapp.net"]).then((res) =>{
                    let list = []
                    let listmenu = [`groupmenu`,`menupremi`,`textmenu`,`imagemaker`,`kerangmenu`,`praymenu`,`ownermenu`,`funmenu`,`mediamenu`,`weebsmenu`,`downloader`,`stickermenu`,`primbonmenu`,`levelingmenu`,`about`,`18`,`owner`,`sewabot`]
                    let listmenuu = [`Menu Group`,`Premium Menu`,`TextMaker`,`Image Effect`,`Kerang Menu`,`PrayMenu`,`Owner Command`,`Fun Features`,`Misc and Media`,`Weebs Zone`,`Downloader`,`Sticker Editing`,`Primbon`,`Leveling Xp and Balance`,`About Bot`,`Nsfw Command`,`OwnerBot`,`Rent this Bot`]
                    let listmenuuu = [`List Fitur Khusus Admin-Group`,`Hanya bisa dipakai oleh User-Premium`,`List Menu TextMaker`,`Edit Gambarmu menjadi efek yang keren`,`Random Jawaban bot kaka, masa ga tau, ga pernah nonton Spongebob ya?`, `Fitur keagamaan, harap Jangan diPermainkan, ayo kita tingkatkan toleransi 😍😍`,`Ini Cuman Untuk Ownerku`,`Fitur bot yg bisa dipake buat happy-an`,`Butuh Info atau Media, Klik disini`,`Zona Wibu-Only, BaKaa >/\/\<`,`Ingin download Sesuatu?`,`Bikin Sticker dan lainnya kaka`,`Ramalan Primbon buat kamu yg percaya ramalan xixi`,`Tingkatkan xp mu ya beb🥰🥰`,`Fitur ini menampilkan command" lengkap tentang bot`,`Only for 18+ madafaka`,`Kalo mau tau Ownerku, bisa klik ini kok`,`Mau sewaBot kak? info lebih lanjut, Klik ini`]
                    let nombor = 1
                    let startnum = 0
                    let startnumm = 0
                    for (let x of listmenu) {
                        const yy = {title: 'Sub-Menu Ke-' + nombor++,
                    rows: [
                       {
                        title: `${listmenuu[startnum++]}`,
                        description: `${listmenuuu[startnumm++]}`,
                        rowId: `${prefix}${x}`
                      }
                    ]
                   }
                        list.push(yy)
                    }
                    xinz.sendList(from, `Selamat ${ucap}`, `Hai kak @${sender.split('@')[0]}, pilih Menu ChikaBot disini`, `Jangan lupa Donasi ya Kak`,`Pilih Disini`, list, msg, [sender])
                })
            }
                break
//------------------< PRAY Command >-------------------
                case prefix+'listsurah':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    fetchJson(`https://api.lolhuman.xyz/api/quran?apikey=${lolkey}`).then((res) =>{
                    let ini_txt = 'List Surah:\n'
                    for (var x in res.result) {
                        ini_txt += `${x}. ${res.result[x]}\n`
                    }
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                     })
                  .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'renungharian':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    fetchJson('http://docs-jojo.herokuapp.com/api/renungan').then((res) =>{
                    let ini_txt = ''
                    ini_txt += `Judul : ${res.judul}\n`
                    ini_txt += `Isi : ${res.Isi}\n\n`
                    ini_txt += `Pesan : ${res.pesan}\n`
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                     })
                  .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
               case prefix+'alkitabharian':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    fetchJson('http://docs-jojo.herokuapp.com/api/alkitab').then((res) =>{
                    let ini_txt = ''
                    ini_txt += `Ayat : ${res.result.ayat}\n`
                    ini_txt += `Isi : ${res.result.isi}\n\n`
                    ini_txt += `Link : ${res.result.link}\n`
                    xinz.sendFileFromUrl(from, res.result.img, ini_txt, msg)
                    limitAdd(sender, limit)
                     })
                  .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
               case prefix+'asmaulhusna':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    fetchJson(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=${lolkey}`)
                    .then((res) =>{
                    let ini_txt = `No : ${res.result.index}\n`
                    ini_txt += `Latin: ${res.result.latin}\n`
                    ini_txt += `Arab : ${res.result.ar}\n`
                    ini_txt += `Indonesia : ${res.result.id}\n`
                    ini_txt += `English : ${res.result.en}`
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                    })
                  .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'alquranaudio': case prefix+'quranaudio':
                    if (!q) return reply(`Cara Penggunaan : \n${command} Nomor_Surah\n\n ${command} 18/10 (Untuk Membuka Audio Per Ayat)`)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    xinz.sendFileFromUrl(from, `https://api.lolhuman.xyz/api/quran/audio/${args[1]}?apikey=${lolkey}`, '', msg).catch(() => reply(mess.error.api))
                    break
                case prefix+'alquran': case prefix+'surah': case prefix+'surat': case prefix+'quran': case prefix+'alqur\'an': case prefix+'qur\'an':
                    if (!q) return reply(`Cara Penggunaan : \n${command} Nomor_surah\n\n ${command} 18/10 (Untuk Membuka 1 ayat saja pada nomor Surah)\n\n ${command} 18/1-10 (Untuk Membuka Beberapa ayat)`)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    fetchJson(`https://api.lolhuman.xyz/api/quran/${args[1]}?apikey=${lolkey}`)
                    .then((res) =>{
                    let ayat = res.result.ayat
                    let ini_txt = `QS. ${res.result.surah} : 1-${ayat.length}\n\n`
                    for (var x of ayat) {
                        var arab = x.arab
                        var nomor = x.ayat
                        var latin = x.latin
                        var indo = x.indonesia
                        ini_txt += `${arab}\n${nomor}. ${latin}\n${indo}\n\n`
                    }
                    let ini_txtt = ini_txt.replace(/<u>/g, "").replace(/<\/u>/g, "")
                    let ini_txttt = ini_txtt.replace(/<strong>/g, "").replace(/<\/strong>/g, "")
                    let ini_txtttt = ini_txttt.replace(/<u>/g, "").replace(/<\/u>/g, "")
                    textImg(ini_txtttt)
                    limitAdd(sender, limit)
                    })
                  .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'alkitab': case prefix+'alkitabsearch':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (!q) return reply(`Contoh penggunaan ${command} matius`)
                    fetchJson('http://docs-jojo.herokuapp.com/api/alkitabsearch?q=' + q)
                    .then((res) =>{
                    let txt = 'Alkitab Result :\n\n'
                    for (let x of res.result) {
                        txt += `Ayat : ${x.ayat}\n`
                        txt += `Isi : ${x.isi}\n`
                        txt += `Link : ${x.link}\n\n`
                     }
                     textImg(txt)
                    limitAdd(sender, limit)
                    })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
               case prefix+'randomquran': case prefix+'randomalquran':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    fetchJson('https://api.zeks.xyz/api/randomquran?apikey=' + zekskey)
                    .then((res) =>{
                     limitAdd(sender, limit)
                     textImg(jsonformat(res.result))
                     .then((lol) => {
                     if (res.result.ayat >= 50) return xinz.sendMessage(from, `Maaf, Ayat melebihi batas maksimum Bot mengirim Audio`, text, { quoted: lol })
                     xinz.sendFileFromUrl(from, res.result.audio, '', lol)
                     })
                     })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
               case prefix+'jadwalsholat': case prefix+'js': case prefix+'jadwalsolat': case prefix+'jadwalshalat': case prefix+'jadwalshalat': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (!q) return reply(`Contoh penggunaan ${command} jakarta`)
                    var url = `https://m.dream.co.id/jadwal-salat/${q}`
                    axios.get(url).then((res) =>{
                    const $ = cheerio.load(res.data)
                    const a = $('table').find('tbody > tr > td')
                    const daerah = url.split('/')[4]
                    const shubuh = $(a).eq(1).text()
                    const dhuha = $(a).eq(2).text()
                    const dzuhur = $(a).eq(3).text()
                    const ashar = $(a).eq(4).text()
                    const maghrib = $(a).eq(5).text()
                    const isya = $(a).eq(6).text()
                    textImg(jsonformat({daerah, shubuh, dhuha, dzuhur, ashar, maghrib, isya}))
                    limitAdd(sender, limit)
                    })
                    }
                    break
                 case prefix+'nabi': case prefix+'kisahnabi':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (!q) return reply(`Contoh penggunaan ${command} muhammad`)
                    fetchJson('https://kisahnabi-api-zhirrr.vercel.app/api/searchnabi?q=' + q)
                    .then((res) =>{
                    xinz.sendFileFromUrl(from, res.nabi.image, `Nama: ${res.nabi.nama}\nUmur: ${res.nabi.umur}\nLahir: ${res.nabi.lahir}\nTempat: ${res.nabi.tempat}\n\n\n${res.nabi.kisah}`, msg)
                    limitAdd(sender, limit)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(`Mungkin nama Nabi yang anda masukkan Salah`)
                        })
                    break
                case prefix+'hadis': case prefix+'hadees': case prefix+'hadist':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (!q) return reply(`Contoh penggunaan ${command} bukhari 10`)
                    if (args.length < 3) return reply(`Example: ${command} bukhari 10`)
                    const listhades = ['darimi', 'ahmad', 'bukhari', 'muslim', 'malik', 'nasai', 'tirmidzi', 'abu-daud', 'ibnu-majah']
                    if (!listhades.includes(args[1].toLowerCase())) return reply(ind.hadis(command))
                    fetchJson(`https://api.hadith.sutanlab.id/books/${args[1].toLowerCase()}/${args[2]}`)
                    .then((habud) =>{
                    textImg(`${habud.data.contents.arab}\n\n${habud.data.contents.id}\n\n*${habud.data.name}*`)
                                        limitAdd(sender, limit)
                    })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
//------------------< WEEBS Command >-------------------
                case prefix+'slap':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (mentioned.length !== 0){
                    fetchJson ('https://www.nekos.life/api/v2/img/slap').then(({url}) => {
                    xinz.sendSticker(from, url, msg, true, [], {contextInfo: {"mentionedJid": [sender, mentioned[0]]}}).then(async (res) => {
                    await sleep(2000);mentions(`@${mentioned[0].split('@')[0]} slapped @${sender.split('@')[0]}`, [sender, mentioned[0]], true)})
                    })
                } else {
                    reply(`Penggunaan ${command} @tag`)
                }
                 break
                case prefix+'pat':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (mentioned.length !== 0){
                    fetchJson ('https://www.nekos.life/api/v2/img/pat').then(({url}) => {
                    xinz.sendSticker(from, url, msg, true, [], {contextInfo: {"mentionedJid": [sender, mentioned[0]]}}).then(async (res) => {
                    await sleep(2000);mentions(`@${sender.split('@')[0]} pat @${mentioned[0].split('@')[0]}`, [sender, mentioned[0]], true)})
                    })
                } else {
                    reply(`Penggunaan ${command} @tag`)
                }
                 break
                case prefix+'baka':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (mentioned.length !== 0){
                    fetchJson ('https://www.nekos.life/api/v2/img/baka').then(({url}) => {
                    xinz.sendSticker(from, url, msg, true, [], {contextInfo: {"mentionedJid": [sender, mentioned[0]]}}).then(async (res) => {
                    await sleep(2000);mentions(`@${mentioned[0].split('@')[0]} Baka!!`, [sender, mentioned[0]], true)})
                    })
                } else {
                    reply(`Penggunaan ${command} @tag`)
                }
                 break
                case prefix+'hug':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (mentioned.length !== 0){
                    fetchJson ('https://www.nekos.life/api/v2/img/hug').then(({url}) => {
                    xinz.sendSticker(from, url, msg, true, [], {contextInfo: {"mentionedJid": [sender, mentioned[0]]}}).then(async (res) => {
                    await sleep(2000);mentions(`@${mentioned[0].split('@')[0]} hugged @${sender.split('@')[0]}`, [sender, mentioned[0]], true)})
                    })
                } else {
                    reply(`Penggunaan ${command} @tag`)
                }
                 break
                case prefix+'cium':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (mentioned.length !== 0){
                    fetchJson ('https://www.nekos.life/api/v2/img/kiss').then(({url}) => {
                    xinz.sendSticker(from, url, msg, true, [], {contextInfo: {"mentionedJid": [sender, mentioned[0]]}}).then(async (res) => {
                    await sleep(2000);mentions(`@${mentioned[0].split('@')[0]} kissed @${sender.split('@')[0]}`, [sender, mentioned[0]], true)})
                    })
                } else {
                    reply(`Penggunaan ${command} @tag`)
                }
                 break
                case prefix+'waifu': case prefix+'wife':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                     fetchJson('https://waifu.pics/api/sfw/waifu').then((data) => {
                     xinz.sendMessage(from, { url: data.url}, image, { quoted: msg })
                    limitAdd(sender, limit)
                    })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                 }
                  break
                case prefix+'kemono': case prefix+'kemonomimi':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    neko.sfw.kemonomimi()
                     .then((data) =>{
                    xinz.sendFileFromUrl(from, data.url, 'Ini', msg)
                    limitAdd(sender, limit)
                    })
                  .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'elf':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    xinz.sendMessage(from, { url: 'https://api.lolhuman.xyz/api/random/elf?apikey=' + lolkey }, image, { quoted: msg})
                    .then((res) => {
                    limitAdd(sender, limit)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'konachan':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    xinz.sendMessage(from, { url: 'https://api.lolhuman.xyz/api/konachan?apikey=' + lolkey + '&query=' + q }, image, { quoted: msg})
                    .then((res) => {
                    limitAdd(sender, limit)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'fanart':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    xinz.sendMessage(from, { url: 'https://api.lolhuman.xyz/api/random/art?apikey=' + lolkey }, image, { quoted: msg})
                    .then((res) => {
                    limitAdd(sender, limit)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'quotesanime':
                case prefix+'quotesnime':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    fetchJson(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=${lolkey}`)
                    .then((res) => {
                    textImg(`_${res.result.quote}_\n\n*― ${res.result.character}*\n*― ${res.result.anime} ${res.result.episode}*`)
                    limitAdd(sender, limit)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'neko':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    neko.sfw.neko()
                     .then((data) =>{
                    xinz.sendFileFromUrl(from, data.url, 'Ini', msg)
                    limitAdd(sender, limit)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'wp': case prefix+'wallnime': case prefix+'wallpaper':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    neko.sfw.wallpaper()
                     .then((data) =>{
                    xinz.sendFileFromUrl(from, data.url, 'Ini', msg)
                    limitAdd(sender, limit)
                    })
                  .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
            case prefix+'genshininfo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${command} nama*`)
                fetchJson(`https://api.lolhuman.xyz/api/genshin/${q}?apikey=${lolkey}`)
                    .then((res) =>{
                    let ini_txt = `Name : ${res.result.title}\n`
                    ini_txt += `Intro : ${res.result.intro}\n`
                    ini_txt += `Icon : ${res.result.icon}\n`
                    xinz.sendFileFromUrl(from, res.result.cover1, ini_txt, msg).then((pe) => xinz.sendFileFromUrl(from, res.result.cv[0].audio[0], '', pe))
                    limitAdd(sender, limit)
                    })    
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                  break
            case prefix+'manga': case prefix+'searchmanga':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${command} nama*`)
                fetchJson ('https://api.jikan.moe/v4/manga?q=' + q)
                .then((res) =>{
                let list = []
                for ( let x of res.data){
                    const yy = { title: `${x.title}`, description: `${x.synopsis}`,rowId: `${prefix}mangaa ${x.mal_id}`}
                    list.push(yy)
                }
                xinz.sendListMsg(from, `List Manga`, `Hasil Pencarian Manga "${q}"`, `Pilih Manga Anda`,`Pilih Disini`, `Pilih Untuk MoreInfo`, list, msg)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                 }
                   break
            case prefix+'anime': case prefix+'searchanime':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${command} nama*`)
                fetchJson ('https://api.jikan.moe/v4/anime?q=' + q)
                .then((res) =>{
                let list = []
                for ( let x of res.data){
                    const yy = { title: `${x.title}`, description: `${x.synopsis}`,rowId: `${prefix}animee ${x.mal_id}`}
                    list.push(yy)
                }
                xinz.sendListMsg(from, `List Anime`, `Hasil Pencarian Anime "${q}"`, `Pilih Anime Anda`,`Pilih Disini`, `Pilih Untuk MoreInfo`, list, msg)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                 }
                   break
            case prefix+'animee':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.jikan.moe/v4/anime/' + q)
                .then((res) => {
                let txt = `*Anime Info*\n\n*Judul:* *${res.data.title}*\n*English:* *${res.data.title_english}*\n*Japanese:* *${res.data.title_japanese}*\n*Trailer:* *${res.data.trailer.url}*\n*Type Anime:* *${res.data.type}*\n*Adaptasi:* *${res.data.source}*\n*Total Episode:* *${res.data.episodes}*\n*Status:* *${res.data.status}*\n*Ongoing:* *${res.data.airing ? 'Ya' : 'Tidak'}*\n*Aired:* *${res.data.aired.string}*\n*Durasi:* *${res.data.duration}*\n*Rating:* *${res.data.rating}*\n*Score:* *${res.data.score}*\n*Rank:* *${res.data.rank}*\n*Musim:* *${res.data.season + ' ' + res.data.year}*\n*Produser Utama:* *${res.data.producers[0].name}*\n*Studio:* *${res.data.studios[0].name}*\n*Genre:* `
                for (let x of res.data.genres) {
                    txt += `${x.name},`
                }
                txt += `\n\n${res.data.synopsis}\n\nInfo Lebih Lanjut Silahkan Klik ${res.data.url}`
                xinz.sendFileFromUrl(from, res.data.images.jpg.image_url, txt, msg)
                })
                }
                 break
            case prefix+'mangaa':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.jikan.moe/v4/manga/' + q)
                .then((res) => {
                let txt = `*Manga Info*\n\n*Judul:* *${res.data.title}*\n*English:* *${res.data.title_english}*\n*Japanese:* *${res.data.title_japanese}*\n*Total Chapter:* *${res.data.chapters}*\n*Total Volume:* *${res.data.volumes}*\n*Status Manga:* *${res.data.status}*\n*Ongoing:* *${res.data.publishing ? 'Ya' : 'Tidak'}*\n*Published:* *${res.data.published.string}*\n*Score:* *${res.data.scored}*\n*Rank Manga:* *${res.data.rank}*\n*Author:* *${res.data.authors[0].name}*\n*Serial:* *${res.data.serializations[0].name}*\n*Genre:* `
                for (let x of res.data.genres) {
                    txt += `${x.name},`
                }
                txt += `\n\n${res.data.synopsis}\n\nInfo Lebih Lanjut Silahkan Klik ${res.data.url}`
                xinz.sendFileFromUrl(from, res.data.images.jpg.image_url, txt, msg)
                })
                }
                 break
            case prefix+'wait': case prefix+'whatanime':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
	                let bodyForm = new FormData();
        	        bodyForm.append('image', fs.createReadStream(yoooo)) 
                    fetchJson("https://api.trace.moe/search", { method: "POST", body: bodyForm, })
                    .then(async(res) =>{
                    if (res.result && res.result.length <= 0) return reply('Anime not found! :(')
                    let teks = ''
                    if (res.result[0].similarity < 0.92) {
                        teks = '*Low similarity. 🤔*\n\n'
                    }
                    teks += `*Title*: ${res.result[0].filename.split('.mp4')[0]}\n*Episode*: ${res.result[0].episode}\n*Similarity*: ${(res.result[0].similarity * 100).toFixed(1)}%`
                    xinz.sendFileFromUrl(from, res.result[0].video, teks, msg)
                    limitAdd(sender, limit)
                    })    
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
			        fs.unlinkSync(yoooo)
			    	if (err) return reply('Gagal :V')   
	                let bodyForm = new FormData();
        	        bodyForm.append('image', fs.createReadStream(ran)) 
                    fetchJson("https://api.trace.moe/search", { method: "POST", body: bodyForm, })
                    .then(async(res) =>{
                    if (res.result && res.result.length <= 0) return reply('Anime not found! :(')
                    let teks = ''
                    if (res.result[0].similarity < 0.92) {
                        teks = '*Low similarity. 🤔*\n\n'
                    }
                    teks += `*Title*: ${res.result[0].filename.split('.mp4')[0]}\n*Episode*: ${res.result[0].episode}\n*Similarity*: ${(res.result[0].similarity * 100).toFixed(1)}%`
                    xinz.sendFileFromUrl(from, res.result[0].video, teks, msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               }
                    break
//------------------< NSFW Command >-------------------
            case prefix+'lewd': case prefix+'lewds': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isGroup && !isNsfw) return reply(ind.notNsfw())
                   var tag = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone', 'animearmpits', 'animefeets', 'animethighss', 'animebooty', 'biganimetiddies', 'animebellybutton', 'sideoppai', 'ahegao']
                   var randTag = tag[Math.floor(Math.random() * tag.length)]
                   console.log(`Searching lewd from ${randTag} subreddit...`)
                    fetchJson(`https://meme-api.herokuapp.com/gimme/${randTag}/`)
                    .then((data) => {
                    xinz.sendFileFromUrl(from, data.url, data.title, msg)
                    limitAdd(sender, limit)
                    })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                 }
                break
                case prefix+'fetish': case prefix+'fetis': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isGroup && !isNsfw) return reply(ind.notNsfw())
                if (!q) return reply(`Contoh penggunaan ${command} pussy`)
                var listfet = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone', 'animearmpits', 'animefeets', 'animethighss', 'animebooty', 'biganimetiddies', 'animebellybutton', 'sideoppai', 'ahegao', 'hentaianal', 'anal', 'pussy', 'animepussy', 'yaoi', 'yuri', 'hentaiblowjob', 'blowjob', 'futanari', 'kitsunehentai', 'midriffhentai', 'erohentai', 'cumhentai', 'paizuri']
                var anu = q.toLowerCase()
                if (!listfet.includes(q)) {
                let teks = `List Fetish :\n\n`
                for (let x of listfet) {
                teks += `${x}\n`
                }
                teks += `\nContoh penggunaan : ${command} pussy`
                reply(teks)
                }
                console.log(`Searching fetish from ${anu} subreddit...`)
                fetchJson(`https://meme-api.herokuapp.com/gimme/${anu}/`)
                .then((data) => {
                    xinz.sendFileFromUrl(from, data.url, data.title, msg)
                    limitAdd(sender, limit)
                    })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                 }
                    break
            case prefix+'nh': case prefix+'nhentai': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (isGroup && !isNsfw) return reply(ind.notNsfw())
                nhentai.exists(args[1]).then((validate) => {
                if (validate === true) {
                nhentai.getDoujin(args[1]).then((yooi) => {
                var pepe = `*NHENTAI INFO*\n\n*Title:* ${yooi.title}\n*Japanese Title:* ${yooi.nativeTitle}\n*Pages:* ${yooi.details.pages[0]}\n*Artist:* ${yooi.details.artists[0]}\n*Uploaded:* ${yooi.details.uploaded[0]}`
                xinz.sendFileFromUrl(from, yooi.pages[0], pepe, msg)
                limitAdd(sender, limit)
                   })
                } else {
                  reply(`Code tidak valid`)
                }
              })
            }
                     break
                case prefix+'nekopoi': case prefix+'nekoinfo':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isGroup && !isNsfw) return reply(ind.notNsfw())
                if (args.length < 2) return reply(`Penggunaan ${command} _link nekopoi_`)
                if (!isUrl(args[1]) && !args[1].includes('nekopoi.care')) return reply(mess.error.Iv)
                reply(mess.wait)
                    fetchJson(`https://api.lolhuman.xyz/api/nekopoi?apikey=${lolkey}&url=${args[1]}`)
                    .then((data) => {
                    var get_result = data.result
                    let ini_txt = `*Title* : ${get_result.anime}\n`
                    ini_txt += `*Porducers* : ${get_result.producers}\n`
                    ini_txt += `*Duration* : ${get_result.duration}\n`
                    ini_txt += `*Size* : ${get_result.size}\n`
                    ini_txt += `*Sinopsis* : ${get_result.sinopsis}\n`
                    var link = get_result.link
                    for (var x in link) {
                        ini_txt += `\n${link[x].name}\n`
                        var link_dl = link[x].link
                        for (var y in link_dl) {
                            ini_txt += `${y} - ${link_dl[y]}\n`
                        }
                    }
                   xinz.sendFileFromUrl(from, get_result.thumb, ini_txt, msg)
                    limitAdd(sender, limit)
                   })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                   }
                    break
                case prefix+'xnxxsearch':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isGroup && !isNsfw) return reply(ind.notNsfw())
                if (args.length < 2) return reply(`Penggunaan ${command} _query_`)
                reply(mess.wait)
                    fetchJson(`https://api.lolhuman.xyz/api/xnxxsearch?apikey=${lolkey}&query=${q}`)
                    .then((data) =>{
                    var get_result = data.result
                     var ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `*Title* : ${x.title}\n`
                        ini_txt += `*Views* : ${x.views}\n`
                        ini_txt += `*Duration* : ${x.duration}\n`
                        ini_txt += `*Uploader* : ${x.uploader}\n`
                        ini_txt += `*Link* : ${x.link}\n\n`
                    }
                    xinz.sendFileFromUrl(from, get_result[0].thumbnail, ini_txt, msg)
                     limitAdd(sender, limit)
                   })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'xhamstersearch':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isGroup && !isNsfw) return reply(ind.notNsfw())
                if (args.length < 2) return reply(`Penggunaan ${command} _query_`)
                reply(mess.wait)
                    fetchJson(`https://api.lolhuman.xyz/api/xhamstersearch?apikey=${lolkey}&query=${q}`)
                    .then((data) =>{
                    var get_result = data.result
                     var ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `*Title* : ${x.title}\n`
                        ini_txt += `*Views* : ${x.views}\n`
                        ini_txt += `*Duration* : ${x.duration}\n`
                        ini_txt += `*Link* : ${x.link}\n\n`
                    }
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                   })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'waifu18': case prefix+'w18':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (isGroup && !isNsfw) return reply(ind.notNsfw())
                     fetchJson('https://waifu.pics/api/nsfw/waifu').then((data) => {
                     xinz.sendFileFromUrl(from, data.url, 'Ini', msg)
                    limitAdd(sender, limit)
                    })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                 }
                  break
                case prefix+'ceritasex': case prefix+'cersex':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (isGroup && !isNsfw) return reply(ind.notNsfw())
                    fetchJson('http://docs-jojo.herokuapp.com/api/cersex')
                    .then((res) => xinz.sendFileFromUrl(from, res.result.img, res.result.judul + `\n\n` + res.result.cersex))
                    .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'lewdavatar':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (isGroup && !isNsfw) return reply(ind.notNsfw())
                    neko.nsfw.avatar()
                     .then((data) =>{
                    xinz.sendFileFromUrl(from, data.url, 'Ini', msg)
                    limitAdd(sender, limit)
                    })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'femdom':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (isGroup && !isNsfw) return reply(ind.notNsfw())
                    neko.nsfw.femdom()
                     .then((data) =>{
                    xinz.sendFileFromUrl(from, data.url, 'Ini', msg)
                    limitAdd(sender, limit)
                    })
              .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
                case prefix+'chiisaihentai': case prefix+'trap': case prefix+'ecchi':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (isGroup && !isNsfw) return reply(ind.notNsfw())
                    xinz.sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/nsfw/${command.split(prefix)[1]}?apikey=${lolkey}`, 'ini', msg)
                    limitAdd(sender, limit)
                    break
                case prefix+'hololewd': case prefix+'lewdholo':
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (isGroup && !isNsfw) return reply(ind.notNsfw())
                    xinz.sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/nsfw/hololewd?apikey=${lolkey}`, 'ini', msg)
                    limitAdd(sender, limit)
                    break
//------------------< Premium Command >-------------------
            case prefix+'ytdl':{
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytdl [linkYt]*`)
                let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks2) return reply(mess.error.Iv)
                let list = [{title: `Mau dikirim Audio Apa Video bang`,
                    rows: [
                       {
                        title: `Audio/Mp3`,
                        description: `Need Music Version? Click Here`,
                        rowId: `${prefix}ytmp3 ${args[1]}`
                      },{
                        title: `Video/Mp4`,
                        description: `Need Video Version? Click Here`,
                        rowId: `${prefix}ytmp4 ${args[1]}`
                      }
                    ]
                   }]
               xinz.sendList(from, `Youtube Downloader`, `Pilih Ekstensi Anda Disini👇👇`, `Only Premium yak`,`Pilih Disini`, list, msg)
               }
               break
            case prefix+'ytmp4':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytmp4 [linkYt]*`)
                let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks2) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    ytv(args[1])
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 40000) return xinz.sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Filesize : ${filesizeF}\`\`\`
\`\`\`▢ Link : ${a.data}\`\`\`
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                        const captionsYtmp4 = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                            xinz.sendFileFromUrl(from, thumb, captionsYtmp4, msg)
                            xinz.sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    xinz.sendMess(ownerNumber[0], 'Ytmp4 Error : ' + err)
                    console.log(color('[Ytmp4]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'ytmp3':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
                let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    yta(args[1])
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 30000) return xinz.sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}
\`\`\`▢ Ext : MP3
\`\`\`▢ Filesize : ${filesizeF}
\`\`\`▢ Link : ${a.data}
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                        const captions = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP3\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                            xinz.sendFileFromUrl(from, thumb, captions, msg)
                            xinz.sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    xinz.sendMess(ownerNumber[0], 'Ytmp3 Error : ' + err)
                    console.log(color('[Ytmp3]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'ytmpp4':{
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytmp4 [linkYt]*`)
                let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks2) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    ytv(args[1])
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 40000) return xinz.sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Filesize : ${filesizeF}\`\`\`
\`\`\`▢ Link : ${a.data}\`\`\`
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                        const captionsYtmp4 = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                            xinz.sendFileFromUrl(from, thumb, captionsYtmp4, msg)
                            xinz.sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    xinz.sendMess(ownerNumber[0], 'Ytmp4 Error : ' + err)
                    console.log(color('[Ytmp4]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'ytmpp3':{
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
                let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    yta(args[1])
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 30000) return xinz.sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}
\`\`\`▢ Ext : MP3
\`\`\`▢ Filesize : ${filesizeF}
\`\`\`▢ Link : ${a.data}
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                        const captions = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP3\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                            xinz.sendFileFromUrl(from, thumb, captions, msg)
                            xinz.sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    xinz.sendMess(ownerNumber[0], 'Ytmp3 Error : ' + err)
                    console.log(color('[Ytmp3]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'stickerwm': case prefix+'swm': case prefix+'take': case prefix+'takesticker': case prefix+'takestick':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (args.length < 2) return reply(`Penggunaan ${command} nama|author`)
                let packname1 = q.split('|')[0] ? q.split('|')[0] : q
                let author1 = q.split('|')[1] ? q.split('|')[1] : ' '
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    xinz.sendStickerWm(from, media, msg, packname1, author1).then((res) => fs.unlinkSync(media))
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    xinz.sendStickerWm(from, media, msg, packname1, author1).then((res) => fs.unlinkSync(media))
                } else if (isQuotedSticker) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    xinz.sendStickerWm(from, media, msg, packname1, author1).then((res) => fs.unlinkSync(media))
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
            case prefix+'asupan': case prefix+'ptl': case prefix+'ptlvid':{
                if (!isPremium) return reply(mess.OnlyPrem)
                fetchText('http://sansekai.my.id/sansekai.txt').then((data) => {
                    var wifegerak = data.split('\n')
                    var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                        xinz.sendFileFromUrl(from, `http://sansekai.my.id/ptl_repost/${wifegerakx}`, 'Follow IG: https://www.instagram.com/ptl_repost untuk mendapatkan asupan lebih banyak.', msg)
                })
                }
                break
            case prefix+'pinterest': case prefix+'pinsearch': case prefix+'pinterestsearch':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} kucing`)
                fetchJson(`https://api.justaqul.xyz/pinterest?q=${q}&apikey=${aqulzkey}`).then((data) => {
                    xinz.sendFileFromUrl(from, data.image, `Hasil Pencarian Pinterest : ${q}`, msg)
                })
                }
                break 
            case prefix+'spamcall':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (args.length > 2) return reply(`Cara penggunaan : ${command} no hp`)
                if (isNaN(args[1]) && args[1].startsWith('62')) return reply(`Harus berupa angka dan pastikan tidak memasukkan kode negara, contoh: ${command} 8127668234`)
                fetchJson(`https://api.justaqul.xyz/call?nomor=${args[1]}&apikey=${aqulzkey}`)
                .then((data) => {
                    textImg(data.result)
                    })
               .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                }
                break
            case prefix+'spamsms':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (args.length > 2) return reply(`Cara penggunaan : ${command} no hp`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                try {
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam1?apikey=${lolkey}&nomor=${args[1]}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam2?apikey=${lolkey}&nomor=${args[1]}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam3?apikey=${lolkey}&nomor=${args[1]}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam4?apikey=${lolkey}&nomor=${args[1]}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam5?apikey=${lolkey}&nomor=${args[1]}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam6?apikey=${lolkey}&nomor=${args[1]}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam7?apikey=${lolkey}&nomor=${args[1]}`)
                    await fetchJson(`https://api.lolhuman.xyz/api/sms/spam8?apikey=${lolkey}&nomor=${args[1]}`)
                    reply("Success")
               } catch (err) {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
               }
                }
                break
           case prefix+'nekosearch': {
                if (!isPremium) return reply(mess.OnlyPrem)
                if (isGroup && !isNsfw) return reply(ind.notNsfw())
                if (!q) return reply(`Cara penggunaan : ${command} dropout`)
               fetchJson(`https://api.lolhuman.xyz/api/nekopoisearch?apikey=${lolkey}&query=${q}`)
               .then((data) =>{
               var ini_txt = `*Nekopoi Search:*\n\n`
                    for (var x of data.result) {
                        ini_txt += `*Title* : ${x.title}\n`
                        ini_txt += `*Link* : ${x.link}\n\n`
                    }
                    xinz.sendFileFromUrl(from, data.result[0].thumbnail, ini_txt, msg)
                 })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
}
                    break
            case prefix+'brainlysearch': {
                if (!isPremium) return reply(mess.OnlyPrem)
                fetchJson(`https://api.lolhuman.xyz/api/brainly?apikey=${lolkey}&query=${q}`)
                .then((res) => {
                    var ini_txt = "Brainly Search Result : \n"
                    for (var x of res.result) {
                        ini_txt += `${x.title}\n`
                        ini_txt += `${x.url}\n\n`
                    }
                    textImg(ini_txt)
                    })
                .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    }
                    break
            case prefix+'brainly': {
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} apa itu bot`)
                fetchJson(`https://api.lolhuman.xyz/api/brainly2?apikey=${lolkey}&query=${q}`)
                .then((res) => {
                    var ini_txt = "Brainly Result : \n"
                    for (var x of res.result) {
                        ini_txt += `*Question* :\n ${x.question.content}\n`
                        ini_txt += `*Answer* :\n ${x.answer[0].content}\n\n`
                    }
                    textImg(ini_txt)
                    })
                .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    }
                    break
                case prefix+'addrespon':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} textnya|autoresponnya`)
                    var textnya = q.split('|')[0]
                    var respnya = q.split('|')[1]
                    const checkdulu = checkText(textnya)
                    if (!checkdulu) {
                        addResponBot(textnya, respnya)
                        textImg(ind.respon(textnya, respnya))
                    } else {
                        reply(ind.responAlready(textnya))
                    }
                    }
                    break
                case prefix+'delrespon':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} textnya`)
                    _respon.splice(getResponPosition(q), 1)
                    fs.writeFileSync('./database/respon.json', JSON.stringify(_respon))
                    reply(ind.ok())
                  }
                    break
                case prefix+'listrespon':{
                    let listResponn = '*──「 AUTO-RESPON LIST 」──*\n\n'
                    let nomorListtt = 0
                    const derettt = getAllRespon()
                    for (let i = 0; i < derettt.length; i++) {
                        nomorListtt++
                        listResponn += `${nomorListtt}. ${derettt[i]}\n\n`
                    }
                    textImg(listResponn)
                    }
                    break
                case prefix+'delsticker':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} textnya`)
                    if (_stick.includes(q)) {
                    let anu = _stick.indexOf(q)
                    _stick.splice(anu, 1)
                    fs.writeFileSync('./database/sticker.json', JSON.stringify(_stick))
                    fs.unlinkSync(`./media/sticker/${q}.webp`)
                    reply(ind.stickerDel())
                    } else {
                    reply(ind.stickerNotFound())
                    }
                   }
                    break              
                case prefix+'addsticker':
                case prefix+'addstiker':{
                    if (!q || !isQuotedSticker) return reply(`Example: ${command} wibu dan tag stickernya`)
                    if (_stick.includes(q.toLowerCase())) {
                        reply(ind.stickerAddAlready(q))
                    } else {
                        _stick.push(q.toLowerCase())
                        fs.writeFileSync('./database/sticker.json', JSON.stringify(_stick))
                        var mediaData = await xinz.downloadAndSaveMediaMessage(JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo, `./media/sticker/${q}`)
                        reply(ind.stickerAdd())
                    }
                    }
                    break
                case prefix+'stickerlist':
                case prefix+'liststicker':
                case prefix+'stikerlist':
                case prefix+'liststiker':
                    if (!isGroup) return reply(ind.groupOnly())
                    let stickerList = `*── 「 STICKER DATABASE 」 ──*\n\nTotal: ${_stick.length}\n\n`
                    for (let i of _stick) {
                          stickerList += `➸ ${i.replace(_stick)}\n`
                    }
                    textImg(stickerList)
                    break
                 case prefix+'delvn':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} textnya`)
                    if (_vn.includes(q)) {
                    let anu = _vn.indexOf(q)
                    _vn.splice(anu, 1)
                    fs.writeFileSync('./database/vn.json', JSON.stringify(_vn))
                    fs.unlinkSync(`./media/audio/${q}.mp3`)
                    reply(ind.vnDel())
                    } else {
                    reply(ind.vnNotFound())
                    }
                    }
                    break              
                case prefix+'addvn':{
                    if (!q || !isQuotedAudio) return reply(`Example: ${command} wibu dan tag vn nya`)
                    if (_vn.includes(q.toLowerCase())) {
                        reply(ind.vnAddAlready(q))
                    } else {
                        _vn.push(q.toLowerCase())
                        fs.writeFileSync('./database/vn.json', JSON.stringify(_vn))
                        var mediaData = await xinz.downloadMediaMessage(JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo)
                        fs.writeFileSync(`./media/audio/${q}.mp3`, mediaData)
                        reply(ind.vnAdd())
                    }
                    }
                    break
                case prefix+'vnlist':
                case prefix+'listvn':
                    if (!isGroup) return reply(ind.groupOnly())
                    let vnList = `*── 「 VN DATABASE 」 ──*\n\nTotal: ${_vn.length}\n\n`
                    for (let i of _vn) {
                          vnList += `➸ ${i.replace(_vn)}\n`
                    }
                    textImg(vnList)
                    break
                case prefix+'delimg':
                case prefix+'delimage':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} nama file`)
                    if (_image.includes(q)) {
                    let anu = _image.indexOf(q)
                    _image.splice(q, 1)
                    fs.writeFileSync('./database/image.json', JSON.stringify(_image))
                    fs.unlinkSync(`./media/image/${q}.jpeg`)
                    reply(ind.imageDel())
                    } else {
                    reply(ind.imageNotFound())
                    }
                    }
                    break              
                case prefix+'addimage':
                case prefix+'addimg':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (!q) return reply(`Cara penggunaan : ${command} nama file`)
                if (!isImage || !isQuotedImage) return reply('kirim atau Reply gambar nya')
                    if (_image.includes(q)) {
                        reply(ind.imageAddAlready(q))
                    } else {
                        _image.push(q)
                        fs.writeFileSync('./database/image.json', JSON.stringify(_image))
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                        fs.writeFileSync(`./media/image/${q}.jpeg`, mediaData)
                        reply(ind.imageAdd())
                    }
                  }
                    break
                case prefix+'imglist':
                case prefix+'listimg':
                case prefix+'imagelist':
                case prefix+'listimage':
                    if (!isGroup) return reply(ind.groupOnly())
                    let imageList = `*── 「 IMAGE DATABASE 」 ──*\n\nTotal: ${_image.length}\n\n`
                    for (let i of _image) {
                          imageList += `➸ ${i.replace(_image)}\n`
                    }
                    textImg(imageList)
                    break
                case prefix+'getimage':
                case prefix+'getimg':
                if (!q) return reply(`Cara penggunaan : ${command} nama file`)
                    if (_image.includes(q)) {
                        xinz.sendImage(from, fs.readFileSync(`./media/image/${q}.jpeg`), '', msg)
                    } else {
                    reply(ind.imageNotFound())
                    }
                    break    
//------------------< Sticker / Tools >-------------------
            case prefix+'exif':{
				if (!isOwner) return
				const namaPack = q.split('|')[0] ? q.split('|')[0] : q
				const authorPack = q.split('|')[1] ? q.split('|')[1] : ' '
				setting.packSticker = namaPack
                setting.authorSticker = authorPack
                fs.writeFileSync('./config.json',JSON.stringify(setting, null, 2))
                reply('Done gan')
                exec(`pm2 restart main`)
            }
				break
                case prefix+'waifusticker':
                case prefix+'waifustick':
                case prefix+'animesticker':
                case prefix+'nimesticker':
                case prefix+'nimestick': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    var ano = await fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/animestick')
                    var wifegerak = ano.split('\n')
                    var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                    xinz.sendSticker(from, wifegerakx, msg)
             		limitAdd(sender, limit)
                    }
                    break
                case prefix+'patrik':
                case prefix+'patrick': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    var ano = await fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/patrik')
                    var wifegerak = ano.split('\n')
                    var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                    xinz.sendSticker(from, wifegerakx, msg)
             		limitAdd(sender, limit)
                    }
                    break
                case prefix+'esticker': case prefix+'estik': case prefix+'estick': case prefix+'estiker': case prefix+'emojisticker': case prefix+'emojistiker': case prefix+'emoji': case prefix+'semoji': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length < 2) return reply(`Penggunaan ${command} emoji`)
                    if (args.length === 2) {
                    fetchJson(`https://api.lolhuman.xyz/api/smoji3/${encodeURIComponent(args[1])}?apikey=${lolkey}`)
                    .then((res) =>{
                        let list = []
                        let startnum = 1
                        for (var x in res.result.emoji) {
                        let yy = {title: 'Model ke-' + startnum++,
                        rows: [
                           {
                            title: `${x}`,
                            description: `${x} model`,
                            rowId: `${prefix}esticker ${args[1]} ${res.result.emoji[x]}`
                          }
                        ]
                        }
                        list.push(yy)
                    }
                    xinz.sendList(from, `List Sticker`, `Kan model stickernya banyak tu kak, kaka mau model sticker yg mana ya? Pilih dibawah ya kak`, args[1], `Pilih Disini`, list, msg)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    } else if (args.length === 3) {
                    xinz.sendSticker(from, args[2], msg)
             		limitAdd(sender, limit)
                    }
                    }
                    break
                case prefix+'gura':
                case prefix+'gurastick':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    var ano = await fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/gura')
                    var wifegerak = ano.split('\n')
                    var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                    xinz.sendSticker(from, wifegerakx, msg)
             		limitAdd(sender, limit)
                    }
                    break
                case prefix+'doge':
                case prefix+'dogestick':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    var ano = await fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/anjing')
                    var wifegerak = ano.split('\n')
                    var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                    xinz.sendSticker(from, wifegerakx, msg)
             		limitAdd(sender, limit)
                    }
                    break
                case prefix+'bucinstick':
                case prefix+'bucinsticker':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    var ano = await fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/bucin')
                    var wifegerak = ano.split('\n')
                    var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                    xinz.sendSticker(from, wifegerakx, msg)
             		limitAdd(sender, limit)
                    }
                    break
                case prefix+'ttp2': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                    xinz.sendSticker(from, 'https://api.xteam.xyz/ttp?file&text=' + encodeURIComponent(q), msg)
                  	limitAdd(sender, limit)
                    }
                    break
            case prefix+'tomp3': case prefix+'toaudio':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia)
					reply(mess.wait)
                    let ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal :V')   
                        xinz.sendMessage(from, fs.readFileSync(ran), audio, { quoted: msg })
                        limitAdd(sender, limit)
                        fs.unlinkSync(ran)
                    })
                 } else {
                   reply(`Kirim/reply video dengan caption ${command}`)
                }
                break
            case prefix+'sfire':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    xinz.sendSticker(from, `https://api.zeks.xyz/api/burning-image?apikey=${zekskey}&image=${link}`, msg).then((res) => fs.unlinkSync(yoooo))
                  	limitAdd(sender, limit)
                } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    xinz.sendSticker(from, `https://api.zeks.xyz/api/burning-image?apikey=${zekskey}&image=${link}`, msg).then((res) => fs.unlinkSync(ran))
                  	limitAdd(sender, limit)
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               }
                    break
            case prefix+'pet': case prefix+'petpet':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptoibb(yoooo)
                    let a = await petpet(link, {resolution: 1080})
                    fs.unlinkSync(yoooo)
                    fs.writeFileSync('petpet.gif', a)
                    await WSF.createSticker('petpet.gif', { type: 'full' ,pack: setting.packSticker,author: setting.authorSticker,categories: ["❤"," 😍"," 😘"," 💕"," 😻"," 💑"," 👩‍❤‍👩"," 👨‍❤‍👨"," 💏"," 👩‍❤‍💋‍👩"," 👨‍❤‍💋‍👨"," 🧡"," 💛"," 💚"," 💙"," 💜"," 🖤"," 💔"," ❣"," 💞"," 💓"," 💗"," 💖"," 💘"," 💝"," 💟"," ♥"," 💌"," 💋"," 👩‍❤️‍💋‍👩"," 👨‍❤️‍💋‍👨"," 👩‍❤️‍👨"," 👩‍❤️‍👩"," 👨‍❤️‍👨"," 👩‍❤️‍💋‍👨"," 👬"," 👭"," 👫"," 🥰"," 😚"," 😙"," 👄"," 🌹"," 😽"," ❣️"," ❤️","😀"," 😃"," 😄"," 😁"," 😆"," 😅"," 😂"," 🤣"," 🙂"," 😛"," 😝"," 😜"," 🤪"," 🤗"," 😺"," 😸"," 😹"," ☺"," 😌"," 😉"," 🤗"," 😊","☹"," 😣"," 😖"," 😫"," 😩"," 😢"," 😭"," 😞"," 😔"," 😟"," 😕"," 😤"," 😠"," 😥"," 😰"," 😨"," 😿"," 😾"," 😓"," 🙍‍♂"," 🙍‍♀"," 💔"," 🙁"," 🥺"," 🤕"," ☔️"," ⛈"," 🌩"," 🌧","😯"," 😦"," 😧"," 😮"," 😲"," 🙀"," 😱"," 🤯"," 😳"," ❗"," ❕"," 🤬"," 😡"," 😠"," 🙄"," 👿"," 😾"," 😤"," 💢"," 👺"," 🗯️"," 😒"," 🥵","👋","🎊"," 🎉"," 🎁"," 🎈"," 👯‍♂️"," 👯"," 👯‍♀️"," 💃"," 🕺"," 🔥"," ⭐️"," ✨"," 💫"," 🎇"," 🎆"," 🍻"," 🥂"," 🍾"," 🎂"," 🍰","🌃"]}).then((buffer) => xinz.sendMessage(from, buffer, sticker, { quoted: msg}))
                    fs.unlinkSync('petpet.gif')
                  	limitAdd(sender, limit)
                } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptoibb(ran)
                    let a = await petpet(link, {resolution: 1080})
                    fs.unlinkSync(ran)
                    fs.writeFileSync('petpet.gif', a)
                    await WSF.createSticker('petpet.gif', { type: 'full' ,pack: setting.packSticker,author: setting.authorSticker,categories: ["❤"," 😍"," 😘"," 💕"," 😻"," 💑"," 👩‍❤‍👩"," 👨‍❤‍👨"," 💏"," 👩‍❤‍💋‍👩"," 👨‍❤‍💋‍👨"," 🧡"," 💛"," 💚"," 💙"," 💜"," 🖤"," 💔"," ❣"," 💞"," 💓"," 💗"," 💖"," 💘"," 💝"," 💟"," ♥"," 💌"," 💋"," 👩‍❤️‍💋‍👩"," 👨‍❤️‍💋‍👨"," 👩‍❤️‍👨"," 👩‍❤️‍👩"," 👨‍❤️‍👨"," 👩‍❤️‍💋‍👨"," 👬"," 👭"," 👫"," 🥰"," 😚"," 😙"," 👄"," 🌹"," 😽"," ❣️"," ❤️","😀"," 😃"," 😄"," 😁"," 😆"," 😅"," 😂"," 🤣"," 🙂"," 😛"," 😝"," 😜"," 🤪"," 🤗"," 😺"," 😸"," 😹"," ☺"," 😌"," 😉"," 🤗"," 😊","☹"," 😣"," 😖"," 😫"," 😩"," 😢"," 😭"," 😞"," 😔"," 😟"," 😕"," 😤"," 😠"," 😥"," 😰"," 😨"," 😿"," 😾"," 😓"," 🙍‍♂"," 🙍‍♀"," 💔"," 🙁"," 🥺"," 🤕"," ☔️"," ⛈"," 🌩"," 🌧","😯"," 😦"," 😧"," 😮"," 😲"," 🙀"," 😱"," 🤯"," 😳"," ❗"," ❕"," 🤬"," 😡"," 😠"," 🙄"," 👿"," 😾"," 😤"," 💢"," 👺"," 🗯️"," 😒"," 🥵","👋","🎊"," 🎉"," 🎁"," 🎈"," 👯‍♂️"," 👯"," 👯‍♀️"," 💃"," 🕺"," 🔥"," ⭐️"," ✨"," 💫"," 🎇"," 🎆"," 🍻"," 🥂"," 🍾"," 🎂"," 🍰","🌃"]}).then((buffer) => xinz.sendMessage(from, buffer, sticker, { quoted: msg}))
                    fs.unlinkSync('petpet.gif')
                  	limitAdd(sender, limit)
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               }
                    break
            case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
            case prefix+'stickergif':
            case prefix+'sgif':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    xinz.sendSticker(from, media, msg, true).then((res) => fs.unlinkSync(media))
                  	limitAdd(sender, limit)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    xinz.sendSticker(from, media, msg, true).then((res) => fs.unlinkSync(media))
                  	limitAdd(sender, limit)
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
            case prefix+'stickerp':
            case prefix+'stikerp':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    xinz.sendSticker(from, media, msg).then((res) => fs.unlinkSync(media))
                  	limitAdd(sender, limit)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    xinz.sendSticker(from, media, msg).then((res) => fs.unlinkSync(media))
                  	limitAdd(sender, limit)
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
            case prefix+'toimg':
            case prefix+'stickertoimg':
            case prefix+'stoimg':
            case prefix+'stikertoimg':
            case prefix+'togif':
            case prefix+'tovid':
            case prefix+'tovideo':
            case prefix+'tomedia':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!isQuotedSticker) return reply('Reply stiker nya')
                let encmedia = isSticker ? JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.stickerMessage.contextInfo : JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				let media = await xinz.downloadAndSaveMediaMessage(encmedia)
				if (quotedMsg.stickerMessage.isAnimated === true){
                    reply('blum support gif')
					} else {
                    reply(mess.wait)
					let ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal :V')
						xinz.sendMessage(from, fs.readFileSync(ran), image, {quoted: msg, caption: 'NIH'})
                        limitAdd(sender,  limit)
						fs.unlinkSync(ran)
					})
					}
                }
				break
            case prefix+'attp':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}attp* teks`)
                xinz.sendSticker(from, `https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`, msg)
                limitAdd(sender, limit)
            }
                break
           case prefix+'ttg':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ttg* teks`)
                xinz.sendSticker(from, `https://api.lolhuman.xyz/api/attp?apikey=${lolkey}&text=${encodeURIComponent(q)}`, msg)
                limitAdd(sender, limit)
            }
              break
           case prefix+'ttp':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ttp3* teks`)
                xinz.sendSticker(from, `https://api.lolhuman.xyz/api/ttp3?apikey=${lolkey}&text=${encodeURIComponent(q)}`, msg)
                limitAdd(sender, limit)
            }
                break
            case prefix+'findsticker': case prefix+'findstiker': case prefix+'stickerwa':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (!q) return reply(`Cara penggunaan : ${command} kucing`)
                fetchJson(`https://api.lolhuman.xyz/api/stickerwa?apikey=${lolkey}&query=${q}`).then((data) => {
                    var bokepp = JSON.parse(JSON.stringify(data.result))
                    var bokep2 =  bokepp[Math.floor(Math.random() * bokepp.length)]
                    if (bokep2.stickers.length > 15 && isGroup) return reply("Terdeteksi sticker melebihi 15, harap download melalui personal chat untuk menghindari spam")
                    for (var x of bokep2.stickers) {
                            xinz.sendSticker(from, x, msg)
                    }
                    limitAdd(sender, limit)
                })
                }
                break
            case prefix+'linedl': case prefix+'linestickerdl':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${command}* link sticker_line`)
                if (!isUrl(args[1]) && !args[1].includes('store.line')) return reply(mess.error.Iv)
                fetchJson(`https://api.lolhuman.xyz/api/linestick?apikey=${lolkey}&url=${args[1]}`).then(async(data) => {
                    if (data.result.stickers.length > 15 && isGroup) return reply("Terdeteksi sticker melebihi 15, harap download melalui personal chat untuk menghindari spam")
                    for (var x of data.result.stickers) {
                        xinz.sendSticker(from, x, msg)
                    }
                    limitAdd(sender, limit)
                })
                }
                break
            case prefix+'teledl': case prefix+'telegramdl': case prefix+'telesticker':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${command}* link sticker_telegram`)
                if (!isUrl(args[1]) && !args[1].includes('t.me')) return reply(mess.error.Iv)
                fetchJson(`https://api.lolhuman.xyz/api/telestick?apikey=${lolkey}&url=${args[1]}`).then(async(data) => {
                    if (data.result.sticker.length > 15 && isGroup) return reply("Terdeteksi sticker melebihi 15, harap download melalui personal chat untuk menghindari spam")
                    for (var x of data.result.sticker) {
                            xinz.sendSticker(from, x, msg)
                    }
                    limitAdd(sender, limit)
                })
                }
                break
                case prefix+'stickermeme': case prefix+'memesticker': case prefix+'memestick': case prefix+'stickmeme': case prefix+'stcmeme': case prefix+'textmaker':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (!q) return reply('Textnya bang')
                    var text1 = q.split('|')[0] ? q.split('|')[0] : (q.includes("|") ? '' : q)
			     	var text2 = q.split('|')[1] ? q.split('|')[1] : ''
                    var atas = text1.replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('&', '~a').replace('#', '~h').replace('/', '~s')
                    var bawah = text2.replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('&', '~a').replace('#', '~h').replace('/', '~s')
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var tolink = await uptotele(media)
                    fs.unlinkSync(media)
                    xinz.sendSticker(from, `https://api.memegen.link/images/custom/${atas}/${bawah}.png?background=${tolink}`, msg)
                    limitAdd(sender, limit)
                } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated){
                    reply(mess.wait)
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
			        fs.unlinkSync(media)
				    if (err) return reply('Gagal :V')   
                    var tolink = await uptotele(ran)
                    fs.unlinkSync(ran)
                    xinz.sendSticker(from, `https://api.memegen.link/images/custom/${atas}/${bawah}.png?background=${tolink}`, msg)
                    limitAdd(sender, limit)
                })
                } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command} text atas|text bawah`)
                }
               }
                    break
            case prefix+'translate': case prefix+'tr':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}translate* kodebahasa teks\n*${prefix}translate* kodebahasa <reply message>`)
                if (isQuotedMsg){
                    let bahasanya = args[1].toString()
                    if (!listbahasa.isSupported(bahasanya)) {
                        let ini_txt = `Maaf, Bahasa ${bahasanya} Tidak Terdaftar.\n\nList Bahasa:\n`
                       for (var x in  listbahasa) {
                           ini_txt += `${x} - ${listbahasa[x]}\n`
                        }
                        textImg(ini_txt)
                    }
                    const trans = await translate(quotedMsg.chats, {
                        to: bahasanya
                    })
                    .then((res) => reply(res.text))
                    .catch((err) => {
                        reply(err.toString())
                    })
                    trans
                    limitAdd(sender, limit)
                } else {
                    if (args.length < 3) return reply(`Penggunaan :\n*${prefix}translate* kodebahasa teks\n*${prefix}translate* kodebahasa <reply message>`)
                    let bahasanya = args[1].toString()
                    if (!listbahasa.isSupported(bahasanya)) {
                        let ini_txt = `Maaf, Bahasa ${bahasanya} Tidak Terdaftar.\n\nList Bahasa:\n`
                       for (var x in  listbahasa) {
                           ini_txt += `${x} - ${listbahasa[x]}\n`
                        }
                        textImg(ini_txt)
                    }
                    let textnya = q.slice(args[1].length + 1, q.length)
                    const trans = await translate(textnya, {
                        to: bahasanya
                    })
                    .then((res) => reply(res.text))
                    .catch((err) => {
                        reply(err.toString())
                    })
                    trans
                    limitAdd(sender, limit)
                }
            }
                break
                case prefix+'tts':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}tts* kodebahasa teks\n*${prefix}tts* kodebahasa <reply message>`)
                if (isQuotedMsg){
                    let rano = getRandom('.ogg')
                    let ranm = getRandom('.mp3')
                    let bahasanya = args[1].toString()
                    if (!listbahasa.isSupported(bahasanya)) {
                        let ini_txt = `Maaf, Bahasa ${bahasanya} Tidak Terdaftar.\n\nList Bahasa:\n`
                       for (var x in  listbahasa) {
                           ini_txt += `${x} - ${listbahasa[x]}\n`
                        }
                        textImg(ini_txt)
                    }
                    const ptt = await tts(bahasanya)
                    ptt.save(ranm, quotedMsg.chats, function() {
                        exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
			            	fs.unlinkSync(ranm)
							if (err) return reply('𝗬𝗲𝗮𝗵 𝗴𝗮𝗴𝗮𝗹 ;(, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘆𝗮𝗵 𝘁𝗼𝗱 ^_^')
							xinz.sendMessage(from, fs.readFileSync(rano), audio, { quoted: msg, ptt: true })
						    fs.unlinkSync(rano)
                            limitAdd(sender, limit)
					    	})
                        })
                    .catch(() => reply(mess.error.api))
                } else {
                    if (args.length < 3) return reply(`Penggunaan :\n*${prefix}tts* kodebahasa teks\n*${prefix}tts* kodebahasa <reply message>`)
                    let rano = getRandom('.ogg')
                    let ranm = getRandom('.mp3')
                    let bahasanya = args[1].toString()
                    if (!listbahasa.isSupported(bahasanya)) {
                        let ini_txt = `Maaf, Bahasa ${bahasanya} Tidak Terdaftar.\n\nList Bahasa:\n`
                       for (var x in  listbahasa) {
                           ini_txt += `${x} - ${listbahasa[x]}\n`
                        }
                        textImg(ini_txt)
                    }
                    let textnya = q.slice(args[1].length + 1, q.length)
                    const ptt = await tts(bahasanya)
                    ptt.save(ranm, textnya, function() {
                        exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
			            	fs.unlinkSync(ranm)
							if (err) return reply('𝗬𝗲𝗮𝗵 𝗴𝗮𝗴𝗮𝗹 ;(, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘆𝗮𝗵 𝘁𝗼𝗱 ^_^')
							xinz.sendMessage(from, fs.readFileSync(rano), audio, { quoted: msg, ptt: true })
						    fs.unlinkSync(rano)
                            limitAdd(sender, limit)
					    	})
                        })
                    .catch(() => reply(mess.error.api))
                   }
                    break
            case prefix+'shortlink':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}tinyurl link`)
                if (!isUrl(args[1])) return reply(`Masukkan link yang benar`)
                axios.get(`https://tinyurl.com/api-create.php?url=${args[1]}`)
                .then((a) => reply(`Nih ${a.data}`))
                .catch(() => reply(`Error, harap masukkan link dengan benar`))
                break
            case prefix+'shortlink2':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}tinyurl link`)
                if (!isUrl(args[1])) return reply(`Masukkan link yang benar`)
                axios.get(`https://tobz-api.herokuapp.com/api/bitly?apikey=${tobzkey}&url=${args[1]}`)
                .then((a) => reply(`Nih ${a.data.result}`))
                .catch(() => reply(`Error, harap masukkan link dengan benar`))
                break
            case prefix+'shortlink3':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}tinyurl link`)
                if (!isUrl(args[1])) return reply(`Masukkan link yang benar`)
                axios.get(`http://docs-jojo.herokuapp.com/api/shorturl-at?url=${args[1]}`)
                .then((a) => reply(`Nih ${a.data.result}`))
                .catch(() => reply(`Error, harap masukkan link dengan benar`))
                break
            case prefix+'kurs':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('http://docs-jojo.herokuapp.com/api/kurs')
                .then((kontlo)=>{
                    let ini = 'Info Kurs:\n\n'
                    for (var x of kontlo.result){
                    ini += `Kurs : ${x.kurs}\nTengah: ${x.tengah}\nJual: ${x.jual}\nBeli: ${x.beli}\n\n`
                    }
                    textImg(ini)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
//------------------< NULIS >---------------------
            case prefix+'nulis':
                reply(`*Pilihan*\n${prefix}nuliskiri\n${prefix}nuliskanan\n${prefix}foliokiri\n${prefix}foliokanan`)
                break
            case prefix+'nuliskiri':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}nuliskiri* teks`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '22',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+140+153',
                    fixHeight,
                    './media/nulis/images/buku/setelahkiri.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`})
                    limitAdd(sender, limit)
                })
            }
                break
            case prefix+'nuliskanan':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}nuliskanan* teks`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+128+129',
                    fixHeight,
                    './media/nulis/images/buku/setelahkanan.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkanan.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`})
                    limitAdd(sender, limit)
                })
            }
                break
            case prefix+'foliokiri':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}foliokiri* teks`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '1720x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '4',
                    '-annotate',
                    '+48+185',
                    fixHeight,
                    './media/nulis/images/folio/setelahkiri.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`})
                    limitAdd(sender, limit)
                })
            }
                break
            case prefix+'foliokanan':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}foliokanan* teks`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '3',
                    '-annotate',
                    '+89+190',
                    fixHeight,
                    './media/nulis/images/folio/setelahkanan.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkanan.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`})
                    limitAdd(sender, limit)
                })
            }
                break
//------------------< Text Marker >-------------------
            case prefix+'retro': case prefix+'retrotext': case prefix+'retroteks':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text1|text2|text3`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2`)
                reply(mess.wait)
                fetchJson(`https://api.zeks.xyz/api/retro?apikey=${zekskey}&text1=${q.split('|')[0]}&text2=${q.split('|')[1]}&text3=${q.split('|')[2]}`)
                .then((res) =>{
                xinz.sendMessage(from, { url: res.result }, image, { quoted: msg }).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                })
                break
            case prefix+'blackpink': 
            case prefix+'neon':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                xinz.sendMessage(from, { url:`https://api.lolhuman.xyz/api/textprome/${command.split(prefix)[1]}?apikey=${lolkey}&text=${q}` }, image, { quoted: msg }).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'glitch': case prefix+'pornhub':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text1|text2`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2`)
                reply(mess.wait)
                xinz.sendMessage(from, {url: `https://api.lolhuman.xyz/api/textprome2/${command.split(prefix)[1]}?apikey=${lolkey}&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}` }, image, {quoted: msg}).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'harta': case prefix+'hartatahta': case prefix+'tahta':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                xinz.sendMessage(from, { url:`https://api.lolhuman.xyz/api/hartatahta?apikey=${lolkey}&text=${q}`}, image, { quoted: msg }).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
//------------------< imagemaker >-------------------
            case prefix+'phcomment':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} username|text`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} username|text`)
                try {
                    var pic = await xinz.getProfilePicture(sender)
                } catch {
                    var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                getBuffer('https://nekobot.xyz/api/imagegen?type=phcomment&image=' + await fetchText('https://tinyurl.com/api-create.php?url=' + pic) + '&username=' + q.split('|')[0] + '&text=' + q.split('|')[1] + '&raw=1')
                .then((kontlo)=>{
                    xinz.sendImage(from, kontlo, '', msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'ytcomment': case prefix+'ytc':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} username|text`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} username|text`)
                try {
                    var pic = await xinz.getProfilePicture(sender)
                } catch {
                    var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                getBuffer('https://some-random-api.ml/canvas/youtube-comment?avatar=' + pic + '&username=' + q.split('|')[0] + '&comment=' + q.split('|')[1])
                .then((kontlo)=>{
                    xinz.sendImage(from, kontlo, '', msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'pencil':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://api.lolhuman.xyz/api/editor/pencil?apikey=${lolkey}&img=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://api.lolhuman.xyz/api/editor/pencil?apikey=${lolkey}&img=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'fisheye':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://api.lolhuman.xyz/api/editor/fisheye?apikey=${lolkey}&img=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://api.lolhuman.xyz/api/editor/fisheye?apikey=${lolkey}&img=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'wasted':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/wasted?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/wasted?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'threats':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=threats&url=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=threats&url=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'buriq': case prefix+'burik':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=jpeg&url=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=jpeg&url=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'deep': case prefix+'deepfry':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'magik': case prefix+'magic':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=magik&image=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=magik&image=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'blurpify':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=blurpify&image=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=blurpify&image=${link}&raw=1`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'captcha':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (!q) return reply(`Penggunaan ${command} query lalu reply gambar/sticker`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=captcha&url=${link}&raw=1&username=${q}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://nekobot.xyz/api/imagegen?type=captcha&url=${link}&raw=1&username=${q}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'glass':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/glass?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/glass?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'greyscale':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/greyscale?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/greyscale?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'invert':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/invert?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/invert?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'invertgrey':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/invertgreyscale?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/invertgreyscale?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'brigthness':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/brigthness?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/brigthness?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'sepia':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/sepia?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/sepia?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
            case prefix+'threshold':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    getBuffer(`https://some-random-api.ml/canvas/threshold?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    getBuffer(`https://some-random-api.ml/canvas/threshold?avatar=${link}`)
                    .then(async(res) =>{
                    xinz.sendImage(from, res, 'ini', msg)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
//------------------< Math Random >-------------------
				case prefix+'sange':
					if (!isGroup)return reply(mess.OnlyGrup)
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					let tejsqq = `Yang paling sange di group ini adalah\n*@${aku.jid.split('@')[0]}*`
					mentions(tejsqq, [aku.jid, cintax.jid], true)
					break
				case prefix+'ganteng':
					if (!isGroup)return reply(mess.OnlyGrup)
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					let tejs = `Cowok paling ganteng di group ini adalah\n*@${aku.jid.split('@')[0]}*`
					mentions(tejs, [aku.jid, cintax.jid], true)
					break
				case prefix+'cantik':
					if (!isGroup)return reply(mess.OnlyGrup)
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					let gejs = `Cewek️ paling cantik di group ini adalah\n*@${cintax.jid.split('@')[0]}*`
					mentions(gejs, [aku.jid, cintax.jid], true)
					break
					case prefix+'jadian':
					if (!isGroup)return reply(mess.OnlyGrup)
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					let vejs = `Ciee.. yang lagi jadian\n*@${aku.jid.split('@')[0]}* ♥️ @${cintax.jid.split('@')[0]}\nSemoga Langgeng Hii`
					mentions(vejs, [aku.jid, cintax.jid], true)
					break
				case prefix+'seberapagay': case prefix+'howgay': case prefix+'rategay':
				axios.get(`https://arugaz.herokuapp.com/api/howgay`).then(res => res.data).then(res =>
				textImg(`Nih Liat Data Gay Si ${q}

Persentase Gay : ${res.persen}%
Alert!!! : ${res.desc}`))
				break
				case prefix+'bisakah':
					const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'Ulangi Tod Gua Ga Paham']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + keh, text, { quoted: msg })
					break
					case prefix+'kapankah':
					const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + koh, text, { quoted: msg })
					break
				case prefix+'apakah':
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + kah, text, { quoted: msg })
					break
				case prefix+'rate':
					const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + te + '%', text, { quoted: msg })
					break
				case prefix+'hobby':
					const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + by, text, { quoted: msg })
					break
				case prefix+'truth':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
					const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					xinz.sendImage(from, await getBuffer(`https://blog.elevenia.co.id/wp-content/uploads/2020/04/27420-truth-or-dare.jpg`), 'Truth\n\n' + ttrth, msg)
					break
				case prefix+'dare':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
					const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					xinz.sendImage(from, await getBuffer(`https://blog.elevenia.co.id/wp-content/uploads/2020/04/27420-truth-or-dare.jpg`), 'Dare\n\n' + der , msg)
					break
				case prefix+'cekbapak': // By Ramlan ID
					const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Ramlan ID']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					xinz.sendMessage(from, cek, text, { quoted: msg })
					break
//------------------< Baileys >---------------------
            case prefix+'getpp':
            case prefix+'getpic':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} @tag atau 'group'`)
                if (args[1] === 'group'){
                    reply(mess.wait)
                    try {
                        var pic = await xinz.getProfilePicture(from)
                    } catch {
                        var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                    }
                    xinz.sendImage(from, await getBuffer(pic), 'Nih bang', msg)
                    limitAdd(sender, limit)
                } else if (mentioned.length !== 0){
                    reply(mess.wait)
                    try {
                        var pic = await xinz.getProfilePicture(mentioned[0])
                    } catch {
                        var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                    }
                    xinz.sendImage(from, await getBuffer(pic), 'Nih bang', msg)
                    limitAdd(sender, limit)
                } else {
                    reply(`Penggunaan ${command} @tag atau 'group'`)
                }
                break
            case prefix+'tagme':
                mentions(`@${sender.split("@")[0]}`, [sender], true)
                break
            case prefix+'kontak':
                if (args.length < 2) return reply(`Penggunaan ${command} nomor|nama`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} nomor|nama`)
                if (isNaN(q.split("|")[0])) return reply(`Penggunaan ${command} nomor|nama`)
                xinz.sendContact(from, q.split("|")[0], q.split("|")[1], msg)
                break
            case prefix+'kontag':{
                let arr = [];
                for (let i of groupMembers){
                    arr.push(i.jid)
                }
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (args.length < 2) return reply(`Penggunaan ${command} nomor|nama`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} nomor|nama`)
                if (isNaN(q.split("|")[0])) return reply(`Penggunaan ${command} nomor|nama`)
                xinz.sendContact(from, q.split("|")[0], q.split("|")[1], null, {contextInfo: {"mentionedJid": arr}})
                }
                break
            case prefix+'hidetag':{
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (args.length < 2) return reply(`Masukkan text`)
                let arr = [];
                for (let i of groupMembers){
                    arr.push(i.jid)
                }
                mentions(q, arr, false)
            }
                break
//------------------< ANTI DELETE >------------------- 
            case prefix+'antidelete':
                if (!isOwner && !fromMe && !isGroupAdmins) return reply(mess.GrupAdmin)
				const dataRevoke = JSON.parse(fs.readFileSync('./database/gc-revoked.json'))
				const dataCtRevoke = JSON.parse(fs.readFileSync('./database/ct-revoked.json'))
				const dataBanCtRevoke = JSON.parse(fs.readFileSync('./database/ct-revoked-banlist.json'))
				const isRevoke = dataRevoke.includes(from)
				const isCtRevoke = dataCtRevoke.data
				const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
				if (args.length === 1) return reply(`Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`)
				if (args[1] == 'aktif') {
					if (isGroup) {
						if (isRevoke) return reply(`Antidelete telah diaktifkan di grup ini sebelumnya!`)
						dataRevoke.push(from)
						fs.writeFileSync('./database/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						reply(`Antidelete diaktifkan di grup ini!`)
					} else if (!isGroup) {
						reply(`Untuk kontak penggunaan *${prefix}antidelete ctaktif*`)
					}
				} else if (args[1] == 'ctaktif') {
                    if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
					if (!isGroup) {
						if (isCtRevoke) return reply(`Antidelete telah diaktifkan di semua kontak sebelumnya!`)
						dataCtRevoke.data = true
						fs.writeFileSync('./database/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						reply(`Antidelete diaktifkan disemua kontak!`)
					} else if (isGroup) {
						reply(`Untuk grup penggunaan *${prefix}antidelete aktif*`)
					}
				} else if (args[1] == 'banct') {
                    if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
					if (isBanCtRevoke) return reply(`kontak ini telah ada di database banlist!`)
					if (args.length === 2 || args[2].startsWith('0')) return reply(`Masukan nomer diawali dengan 62! contoh 62859289xxxxx`)
					dataBanCtRevoke.push(args[2] + '@s.whatsapp.net')
					fs.writeFileSync('./database/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
					reply(`Kontak ${args[2]} telah dimasukan ke banlist antidelete secara permanen!`)
				} else if (args[1] == 'mati') {
					if (isGroup) {
						const index = dataRevoke.indexOf(from)
						dataRevoke.splice(index, 1)
						fs.writeFileSync('./database/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						reply(`Antidelete dimatikan di grup ini!`)
					} else if (!isGroup) {
						reply(`Untuk kontak penggunaan *${prefix}antidelete ctmati*`)
					}
				} else if (args[1] == 'ctmati') {
                    if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
					if (!isGroup) {
						dataCtRevoke.data = false
						fs.writeFileSync('./database/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						reply(`Antidelete dimatikan disemua kontak!`)
					} else if (isGroup) {
						reply(`Untuk grup penggunaan *${prefix}antidelete mati*`)
					}
				} else {
                  reply(`Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`)
               }
				break
//------------------< Primbon >-------------------
            case prefix+'artinama': case prefix+'artiname':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} query`)
                fetchJson('https://api.zeks.xyz/api/artinama?apikey=' + zekskey + '&nama=' + q)
                .then((kontlo)=>{
                    textImg(kontlo.result)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'artimimpi': case prefix+'mimpi':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} query`)
                fetchJson('https://api.zeks.xyz/api/artimimpi?apikey=' + zekskey + '&q=' + q)
                .then((kontlo)=>{
                    let b = 'Arti Mimpi :\n\n'
                    for (let x of kontlo.result.array) {
                    b += `${x}\n\n`
                    }
                    textImg(b)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'jodoh': case prefix+'pasangan': case prefix+'partner':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} nama1|nama2`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} nama1|nama2`)
                fetchJson(`https://api.zeks.xyz/api/primbonjodoh?apikey=${zekskey}&nama1=${q.split('|')[0]}&nama2=${q.split('|')[1]}`)
                .then((res)=>{
                    xinz.sendFileFromUrl (from, res.result.thumb, `Pasangan ${res.result.nama1} && ${res.result.nama2}\n\nPositif:\n${res.result.positif}\n\nNegatif:\n${res.result.negatif}`, msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'ramaljadian':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} tanggal|bulan|tahun`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} tanggal|bulan|tahun`)
                fetchJson(`https://api.lolhuman.xyz/api/jadian/${q.split('|')[0]}/${q.split('|')[1]}/${q.split('|')[2]}?apikey=${lolkey}`)
                .then((res)=>{
                    textImg(`Tanggal Jadian ${q.split('|')[0]} - ${q.split('|')[1]} - ${q.split('|')[2]}\n\n${res.result.karakteristik}\n\n${res.result.deskripsi}`)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
//------------------< Media, Misc, and Fun >-------------------
            case prefix+'google':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan :\n*${command} query*`)
                google({ 'query' : q }).then(async (res) =>{
                let txt = 'Hasil Pencarian Google: ' + q + '\n\n'
                for (let x of res) {
                    txt += `*${x.title}*\n`
                    txt += `${x.snippet}\n`
                    txt += `*${x.link}*\n\n`
                }
                reply(txt)
                await limitAdd(sender, limit)
                })
                break
            case prefix+'tourl': case prefix+'tolink':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    textImg(link)
				    fs.unlinkSync(yoooo)
                } else if (isQuotedSticker) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptoibb(yoooo)
                    textImg(link)
				    fs.unlinkSync(yoooo)
                 } else if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    textImg(link)
				    fs.unlinkSync(yoooo)
                 } else if (isQuotedAudio || isQuotedDocument) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptoaqulz(yoooo)
                    textImg(link)
				    fs.unlinkSync(yoooo)
                 } else {
                   reply(`Kirim/reply file (gambar, sticker, document, video, dll) dengan caption ${command}`)
                }
               }
                    break
            case prefix+'fact': case prefix+'fakta': case prefix+'faktaunik':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.lolhuman.xyz/api/random/faktaunik?apikey=' + lolkey)
                .then((kontlo)=>{
                    textImg(kontlo.result)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'bucin': case prefix+'katabijak':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.lolhuman.xyz/api/random/' + command.split(prefix)[1] + '?apikey=' + lolkey)
                .then((kontlo)=>{
                    textImg(kontlo.result)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'quote': case prefix+'quotes':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.lolhuman.xyz/api/random/quotes?apikey=' + lolkey)
                .then((kontlo)=>{
                    textImg(`_${kontlo.result.quote}_\n\n―${kontlo.result.by}`)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'cuaca': case prefix+'weather':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} query`)
                fetchJson(`https://api.lolhuman.xyz/api/cuaca/${q.trim()}?apikey=${lolkey}`)
                .then((res) =>{
                    let get_result = res.result
                    let ini_txt = `Tempat : ${get_result.tempat}\n`
                    ini_txt += `Cuaca : ${get_result.cuaca}\n`
                    ini_txt += `Angin : ${get_result.angin}\n`
                    ini_txt += `Description : ${get_result.description}\n`
                    ini_txt += `Kelembapan : ${get_result.kelembapan}\n`
                    ini_txt += `Suhu : ${get_result.suhu}\n`
                    ini_txt += `Udara : ${get_result.udara}\n`
                    ini_txt += `Permukaan laut : ${get_result.permukaan_laut}\n`
                    xinz.sendMessage(from, { degreesLatitude: get_result.latitude, degreesLongitude: get_result.longitude }, location, { quoted: msg }).then((res) => xinz.sendMessage(from, ini_txt, text, {quoted: res}))
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'jbola': case prefix+'jadwalbola':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.lolhuman.xyz/api/jadwalbola?apikey=' + lolkey)
                .then((kontlo)=>{
                    let ini_txt = 'Jadwal Bola :\n\n'
                    for (let x of kontlo.result){
                    ini_txt += `Pertandingan: ${x.match}\n`
                    ini_txt += `Event atau Liga: ${x.event}\n`
                    ini_txt += `Tanggal: ${x.hari} ${x.jam}\n`
                    ini_txt += `Live di : ${x.tv}\n\n`
                    }
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'news': case prefix+'berita':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.lolhuman.xyz/api/newsinfo?apikey=' + lolkey)
                .then((kontlo)=>{
                    let ini_txt = 'Berita Hari ini :\n\n'
                    for (let x of kontlo.result){
                    ini_txt += `*${x.title}*\n\n`
                    ini_txt += `${x.content}\n\n`
                    ini_txt += `Sumber: ${x.source.name}\n`
                    ini_txt += `Publish : ${x.publishedAt}\n`
                    ini_txt += `Selengkapnya : ${x.url}\n\n`
                    }
                    xinz.sendFileFromUrl(from, kontlo.result[0].urlToImage, ini_txt, msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'corona': case prefix+'covid': case prefix+'covid19': case prefix+'covid-19':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                let country = q ? q : 'indonesia'
                fetchJson('https://coronavirus-19-api.herokuapp.com/countries/' + country.toLowerCase() + '/')
                .then((res)=>{
                    textImg('🌎️ Covid Info - ' + country.charAt(0).toUpperCase() + country.slice(1) + ' 🌍️\n\n✨️ Total Cases: ' + `${res.cases}` + '\n📆️ Today\'s Cases: ' + `${res.todayCases}` + '\n☣️ Total Deaths: ' + `${res.deaths}` + '\n☢️ Today\'s Deaths: ' + `${res.todayDeaths}` + '\n⛩️ Active Cases: ' + `${res.active}` + '.')
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                }
                    break
            case prefix+'jtv': case prefix+'jadwaltv':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} query`)
                fetchJson('https://tobz-api.herokuapp.com/api/jadwaltv?channel=' + args[1].toLowerCase() +'&apikey=' + tobzkey)
                .then((kontlo)=>{
                    let ini_txt = `Jadwal Tv ${args[1].toUpperCase()}\n\n`
                    for (let x of kontlo.result){
                    ini_txt += `${x}\n`
                    }
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
            case prefix+'lk21': case prefix+'movie':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} query`)
                fetchJson(`https://api.lolhuman.xyz/api/lk21?apikey=${lolkey}&query=${q}`)
                .then((kontlo)=>{
                    let get_result = kontlo.result
                    let ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Link : ${get_result.link}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Views : ${get_result.views}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Tahun : ${get_result.tahun}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    ini_txt += `Actors : ${get_result.actors.join(", ")}\n`
                    ini_txt += `Location : ${get_result.location}\n`
                    ini_txt += `Date Release : ${get_result.date_release}\n`
                    ini_txt += `Language : ${get_result.language}\n`
                    ini_txt += `Link Download : ${get_result.link_dl}`
                    xinz.sendFileFromUrl(from, get_result.thumbnail, ini_txt, msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
             case prefix+'math':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (!q) return reply(`yang mau di itung mana?`)
                    if (typeof mathjs.evaluate(q) !== 'number') {
                        await reply(ind.notNum(q))
                    } else {
                        reply(`*── 「 MATH 」 ──*\n\n${q} = ${mathjs.evaluate(q)}`)
                    }
                    limitAdd(sender, limit)
                break
            case prefix+'distance': case prefix+'jarak':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} tempat1|tempat2`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} tempat1|tempat2`)
                fetchJson(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=${lolkey}&kota1=${q.split('|')[0].trim()}&kota2=${q.split('|')[1].trim()}`)
                .then((res) =>{
                    let x = res.result
                    let ini_txt = `Informasi Jarak dari ${q.split('|')[0].trim()} ke ${q.split('|')[1].trim()} :\n\n`
                    ini_txt += `\`\`\`◪ Asal :\`\`\` ${x.from.name}\n`
                    ini_txt += `\`\`\`◪ Garis Lintang :\`\`\` ${x.from.latitude}\n`
                    ini_txt += `\`\`\`◪ Garis Bujur :\`\`\` ${x.from.longitude}\n\n`
                    ini_txt += `\`\`\`◪ Tujuan :\`\`\` ${x.to.name}\n`
                    ini_txt += `\`\`\`◪ Garis Lintang :\`\`\` ${x.to.latitude}\n`
                    ini_txt += `\`\`\`◪ Garis Bujur :\`\`\` ${x.to.longitude}\n\n`
                    ini_txt += `\`\`\`◪ Jarak Tempuh :\`\`\` ${x.jarak}\n`
                    ini_txt += `\`\`\`◪ Waktu Tempuh :\`\`\`\n`
                    ini_txt += `   ╭───────────────❏\n`
                    ini_txt += `❍┤ Kereta Api : ${x.kereta_api}\n`
                    ini_txt += `❍┤ Pesawat : ${x.pesawat}\n`
                    ini_txt += `❍┤ Mobil : ${x.mobil}\n`
                    ini_txt += `❍┤ Motor : ${x.motor}\n`
                    ini_txt += `❍┤ Jalan Kaki : ${x.jalan_kaki}\n`
                    ini_txt += `   ╰───────────────❏\n`
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'hoax': case prefix+'infohoax':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.lolhuman.xyz/api/turnbackhoax?apikey=' + lolkey)
                .then((res) =>{
                    let ini_txt = 'Info Hoax :\n\n'
                    for (var x of res.result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Posted : ${x.posted}\n`
                        ini_txt += `Description : ${x.desc}\n\n`
                    }
                    textImg(ini_txt)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'mutual': case prefix+'next':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                let contt = pendaftar[Math.floor(Math.random() * pendaftar.length)]
                xinz.sendContact(from, contt.split('@')[0], xinz.getName(contt), msg).then((res) => xinz.sendMessage(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`, text, {quoted: res}))
                break
            case prefix+'resepmasakan': case prefix+'receipt': case prefix+'resep':
                if (args.length < 2) return reply(`Penggunaan ${command} nama_makanan`)
                fetchJson('https://mnazria.herokuapp.com/api/resep-search?text=' + q)
                .then((kontlo)=>{
                        let list = []
                        for (let x of kontlo.results){
                        const yy = {
                            title: `${x.title}`,
                            description: `Perkiraan waktu pembuatan ${x.times} dengan serving ${x.serving}`,
                            rowId: `${prefix}resepp ${x.key}`
                          }
                        list.push(yy)
                    }
                    xinz.sendListMsg(from, `List Menu`, `Hasil Pencarian Resep "${q}"`, `Mau Masak Apa Hari Ini`,`Pilih Disini`, `List Resep`, list, msg)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                    break
            case prefix+'resepp':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://mnazria.herokuapp.com/api/resep?key=' + args[1])
                .then((res)=>{
                    let initxt = 'Bahan Yang Dibutuhkan:\n\n'
                    let initxtt = '\nStep by Step:\n\n'
                    for (let x of res.results.ingredient){
                        initxt += `${x}\n`
                    }
                    for (let y of res.results.step){
                        initxtt += `${y}\n`
                    }
                    textImg(`${res.results.title}\n\nPerkiraan Waktu: ${res.results.times}\nServings: ${res.results.servings}\nTingkat Kesulitan: ${res.results.dificulty}\n\n${res.results.desc}\n\n` + initxt + initxtt)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'joke': case prefix+'jokes': case prefix+'randomjoke': case prefix+'randomjokes':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://some-random-api.ml/joke')
                .then((kontlo)=>{
                    textImg(kontlo.joke + '\n\n```~Random Joke```')
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'meme': case prefix+'memes': case prefix+'randommeme': case prefix+'randommemes':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                let yo = ['wholesomeanimemes', 'dankmemes','terriblefacebookmemes','memes','AdviceAnimals','MemeEconomy','nukedmemes','okbuddyretard','historymemes','teenagers'][Math.floor(Math.random() * 10)]
                fetchJson('https://meme-api.herokuapp.com/gimme/' + yo)
                .then((kontlo)=>{
                    xinz.sendFileFromUrl(from, kontlo.url, kontlo.title, msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'wpsearch': case prefix+'wallpapersearch':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} query`)
                let yoqq = ['wallpaper2','wallpaper'][Math.floor(Math.random() * 2)]
                fetchJson(`https://api.lolhuman.xyz/api/${yoqq}?apikey=${lolkey}&query=${q}`)
                .then((kontlo)=>{
                    xinz.sendFileFromUrl(from, kontlo.result, '', msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'sreddit': case prefix+'subreddit': case prefix+'reddit': case prefix+'subredd':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${command} query*`)
                fetchJson('https://meme-api.herokuapp.com/gimme/' + args[1] + '/')
                .then((kontlo)=>{
                    xinz.sendFileFromUrl(from, kontlo.url, kontlo.title, msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'fml': case prefix+'fuckmylife': case prefix+'fmylife': case prefix+'fuvkmylife':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                fetchJson('https://api.zeks.xyz/api/fml?apikey=' + zekskey)
                .then((kontlo)=>{
                    textImg(kontlo.result)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'memeindo': case prefix+'memeindonesia': case prefix+'memesindo': case prefix+'memesindonesia':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                getBuffer('https://api.lolhuman.xyz/api/meme/memeindo?apikey=' + lolkey)
                .then((kontlo)=>{
                    xinz.sendImage(from, kontlo, '', msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'darkjoke': case prefix+'darkjokes':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                getBuffer('https://api.lolhuman.xyz/api/meme/darkjoke?apikey=' + lolkey)
                .then((kontlo)=>{
                    xinz.sendImage(from, kontlo, '', msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'wiki': case prefix+'wikipedia': case prefix+'wikiid':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${command} query*`)
                axios.get(`https://id.m.wikipedia.org/wiki/${q}`)
                .then((res) =>{
                    const $ = cheerio.load(res.data)
                    let wiki = $('#mf-section-0').find('p').text()
                    let thumb = $('#mf-section-0').find('div > div > a > img').attr('src')
                    thumb = thumb ? 'https:' + thumb : 'https://pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'
                    let judul = $('h1#section_0').text()
                    xinz.sendFileFromUrl(from, thumb, judul + '\n\n' + wiki, msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'wikien':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${command} query*`)
                axios.get(`https://en.m.wikipedia.org/wiki/${q}`)
                .then((res) =>{
                    const $ = cheerio.load(res.data)
                    let wiki = $('#mf-section-0').find('p').text()
                    let thumb = $('#mf-section-0').find('div > div > a > img').attr('src')
                    thumb = thumb ? 'https:' + thumb : 'https://pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'
                    let judul = $('h1#section_0').text()
                    xinz.sendFileFromUrl(from, thumb, judul + '\n\n' + wiki, msg)
                    limitAdd(sender, limit)
                })
                 .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'readqr':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    var link = await uptotele(yoooo)
                    fetchJson(`https://api.zeks.xyz/api/qrdecode?apikey=${zekskey}&image=${link}`)
                    .then(async(res) =>{
                    textImg(res.result)
                    limitAdd(sender, limit)
                    })    
                    } else if (isQuotedSticker && !quotedMsg.stickerMessage.isAnimated === true) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                    let yoooo = await xinz.downloadAndSaveMediaMessage(encmedia)
                    let ran = getRandom('.png')
				  exec(`ffmpeg -i ${yoooo} ${ran}`, async (err) => {
						fs.unlinkSync(yoooo)
						if (err) return reply('Gagal :V')   
                    var link = await uptotele(ran)
                    fetchJson(`https://api.zeks.xyz/api/qrdecode?apikey=${zekskey}&image=${link}`)
                    .then(async(res) =>{
                    textImg(res.result)
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                    })
               })
                 } else {
                   reply(`Kirim/reply gambar atau sticker dengan caption ${command}`)
                }
               break
//------------------< INFO >-------------------
            case prefix+'limit': case prefix+'ceklimit': case prefix+'balance': case prefix+'glimit': case prefix+'uangku': case prefix+'bal':
                if (mentioned.length !== 0){
                    textImg(`Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : `${getLimit(mentioned[0], limitCount, limit)}/${limitCount}`}\nLimit Game : ${cekGLimit(mentioned[0], gcount, glimit)}/${gcount}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                } else {
                    textImg(`Limit : ${isPremium ? 'Unlimited' : `${getLimit(sender, limitCount, limit)}/${limitCount}`}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : ${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                }
                break
            case prefix+'owner': case prefix+'creator': {
                    let arrey = []
                    for ( let x of ownerNumber){
                        let getnem = xinz.getName(x)
                        let conara = { displayName: getnem, vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + getnem + '\n' + 'ORG:Kontak\n' + 'TEL;type=CELL;type=VOICE;waid=' + x.split("@")[0] + ':+' + x.split("@")[0] + '\n' + 'END:VCARD'.trim()}
                        arrey.push(conara)
                    }
                    xinz.sendMessage(from, { contacts: arrey }, contactsArray, { quoted: msg})
                .then(async(res) => {
                 let qqpp = [{
                    "buttonId": `${prefix}sc`,
                    "buttonText": {
                        "displayText": "SC BOT"
                    },
                    "type": "RESPONSE"
                }]
                xinz.sendButtons(from, `Hai Kak @${sender.split('@')[0]}`, `Itu Nomer Ownerku, Mau tau soal apa ya?`, `Jangan Sungkan Chat Ya Kak`, qqpp, false, res, [sender])
                })
                }
                break
            case prefix+'sourcecode': case prefix+'sc': case prefix+'src':
                textImg(`Bot ini menggunakan sc : https://github.com/rashidsiregar28/chika-bot`)
                break
            case prefix+'donate':
            case prefix+'donasi':
            case prefix+'tos':
            case prefix+'sumbang':
                 reply(ind.tos(ownerNumber[0].split("@")[0], prefix))
                break
            case prefix+'runtime':
                textImg(`${runtime(process.uptime())}`)
                break
            case prefix+'ping':
            case prefix+'speed':{
                let timestamp = speed();
				let latensi = speed() - timestamp
                textImg(`${latensi.toFixed(4)} Second`)
            }
                break
                case prefix+'report':
                    if (!q) return textImg('mau lapor apa pak')
                    if (isGroup) {
                        xinz.sendMess(ownerNumber[0], `*── 「 REPORT 」 ──*\n\n*From*: ${pushname}\n*ID*: ${sender}\n*Group*: ${groupName}\n*Message*: ${q}`)
                        reply(ind.received(pushname))
                    } else {
                        xinz.sendMess(ownerNumber[0], `*── 「 REPORT 」 ──*\n\n*From*: ${pushname}\n*ID*: ${sender}\n*Message*: ${q}`)
                        reply(ind.received(pushname))
                    }
                    break
                case prefix+'botgroup':
                case prefix+'chikagroup':
                case prefix+'botgrup':
                case prefix+'chikagrup':
                    mentions(ind.groupBot(sender), [sender], true)
                break
                case prefix+'ownergroup':
                case prefix+'ownergrup': {
                    if (!isGroup) return reply(ind.groupOnly())
                    var teks = `Owner Group : @${from.split('-')[0]}`
                    mentions(teks, [`${from.split('-')[0]}@s.whatsapp.net`], true)
                    }
                    break
                case prefix+'rules':
                case prefix+'rule':
                    textImg(ind.rules(prefix))
                    break
                case prefix+'downloader':
                    textImg(ind.menuDownloader(prefix))
                    break
                case prefix+'textmenu':
                    textImg(ind.menuText(prefix))
                    break
                case prefix+'menupremi':
                    textImg(ind.menuPremi(prefix))
                    break
                case prefix+'stickermenu':
                    textImg(ind.menuSticker(prefix))
                    break 
                case prefix+'weebsmenu':
                    textImg(ind.menuWeeaboo(prefix))
                    break 
                case prefix+'funmenu':
                    textImg(ind.menuFun(prefix))
                    break 
                case prefix+'imagemaker':
                    textImg(ind.menuImage(prefix))
                    break 
                case prefix+'kerangmenu':
                    if (!isGroup) return reply(ind.groupOnly())
                    textImg(ind.menuKerang(prefix))
                    break 
                case prefix+'groupmenu':
                    if (!isGroup) return reply(ind.groupOnly())
                    textImg(ind.menuModeration(prefix))
                    break 
                case prefix+'18':
                case prefix+'18+':
                case prefix+'nsfwmenu':
                    if (isGroup && !isNsfw) return reply(ind.notNsfw())
                    textImg(ind.menuNsfw(prefix))
                    break 
                case prefix+'ownermenu':
                    if (!isOwner) return reply(ind.ownerOnly())
                    textImg(ind.menuOwner(prefix))
                    break 
                case prefix+'levelingmenu':
                    if (!isGroup) return reply(ind.groupOnly())
                    if (!isLevelingOn) return reply(ind.levelingNotOn())
                    textImg(ind.menuLeveling(prefix))
                    break 
                case prefix+'praymenu':
                    textImg(ind.menuPray(prefix))
                    break 
                case prefix+'primbonmenu':
                    textImg(ind.menuPrimbon(prefix))
                    break 
                case prefix+'mediamenu':
                    textImg(ind.menuMisc(prefix))
                    break 
                case prefix+'about':
                    textImg(ind.menuBot(prefix))
                    break 
                case prefix+'listgrup': case prefix+'listgroup':{
                let totalchat = await xinz.chats.all()
				let i = []
				let giid = []
                let grupp = []
				for (let mem of totalchat){
					i.push(mem.jid)
				}
				for (let id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
              for (let e of giid){
	         	let ingfo = await xinz.groupMetadata(e)
	        	grupp.push(ingfo)
	        }
			    	let txt = `*List Group*\n\*Total* : *${grupp.length}*\n\n`
				    for (let i = 0; i < grupp.length; i++){
					    txt += `*Nama grup : ${grupp[i].subject}*\n*ID grup : ${grupp[i].id}*\n*Dibuat : ${moment(`${grupp[i].creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss z')}*\n*Jumlah Peserta : ${grupp[i].participants.length}*\n\n`
			    	}
				    await textImg(txt)
                  }
                    break
                case prefix+'leaveall':{
                let totalchat = await xinz.chats.all()
				let i = []
				for (let mem of totalchat){
					i.push(mem.jid)
				}
				for (let id of i){
					if (id && id.includes('g.us')){
                    xinz.sendMess(id, 'Bot sedang pembersihan, total chat:' + i.length)
                   .then(() => xinz.groupLeave(id))
					}
				}
                  }
                    break
                case prefix+'status': 
                case prefix+'stats': 
                case prefix+'stat': 
                case prefix+'botstat': {
                let totalchat = await xinz.chats.all()
				let i = []
				let giid = []
				for (let mem of totalchat){
					i.push(mem.jid)
				}
				for (let id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                let anu = process.uptime()
                let teskny = `*V. Whatsapp :* ${wa_version}
*Baterai :* ${xinz.baterai.baterai}%
*Charge :* ${xinz.baterai.cas === 'true' ? 'Ya' : 'Tidak'}
*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*MCC :* ${mcc}
*MNC :* ${mnc}
*Versi OS :* ${os_version}
*Merk HP :* ${device_manufacturer}
*Versi HP :* ${device_model}
*Group Chat :* ${giid.length}
*Personal Chat :* ${totalchat.length - giid.length}
*Total Chat :* ${totalchat.length}
*Speed :* ${latensii.toFixed(4)} Second
*Runtime :* ${runtime(anu)}`
				reply(teskny)
            }
				break
//------------------< Downloader >-------------------
            case prefix+'playmp4': case prefix+'playvideo': case prefix+'playvid': case prefix+'plav': case prefix+'playvidio':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}playmp4 query*`)
                try {
                    reply(mess.wait)
                    let yut = await yts(q)
                    ytv(yut.videos[0].url)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 40000) return xinz.sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Filesize : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ Link : ${a.data}\`\`\`
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                        const captionisu = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ URL : ${yut.videos[0].url}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                            xinz.sendFileFromUrl(from, thumb, captionisu, msg)
                            xinz.sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    xinz.sendMess(ownerNumber[0], 'PlayMp4 Error : ' + err)
                    console.log(color('[PlayMp4]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'joox': case prefix+'jooxplay':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}joox query*`)
                    reply(mess.wait)
                    fetchJson('https://api.lolhuman.xyz/api/jooxplay?apikey=' + lolkey +'&query=' + q)
                    .then((res) =>{
                    xinz.sendFileFromUrl(from, res.result.image, jsonformat(res.result.info), msg)
                    xinz.sendFileFromUrl(from, res.result.audio[0].link, '', msg)
                    limitAdd(sender, limit)
                    })
                    .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
            }
            break
               case prefix+'mfire': case prefix+'mediafire': case prefix+'mediafiredl': case prefix+'mfiredl': case prefix+'mfdl': {
                if (args.length < 2) return reply(`Kirim perintah *${command}* link mediafire`)
                if (!isUrl(args[1]) && !args[1].includes('mediafire.com')) return reply(mess.error.Iv)
                    axios.get(args[1]).then((res) =>{
                    const $ = cheerio.load(res.data)
                    const link = $('a#downloadButton').attr('href')
                    const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replace('                    ', '')
                    const nama = link.split('/')[5]
                    const mime = nama.split('.')[1]
                    textImg(jsonformat({ nama, mime, size, link }))
                    limitAdd(sender, limit)
                    })
                    }
                    break
               case prefix+'gdrive': case prefix+'drive': case prefix+'googledrive': case prefix+'gdrivedl': case prefix+'drivebypass': {
                if (args.length < 2) return reply(`Kirim perintah *${command}* link drive`)
                if (!isUrl(args[1]) && !args[1].includes('drive.google.com')) return reply(mess.error.Iv)
                fetchJson(`https://api.zeks.xyz/api/gdbypass?apikey=${zekskey}&url=${args[1]}`)
                    .then((res) =>{
                    textImg(`GOOGLE DRIVE BYPASS\n\nNama: ${res.data.file_name}\nLink Download: ${res.data.download_link}\nDirect Link: ${res.data.direct_download}`)
                    limitAdd(sender, limit)
                    })
                    .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
            }
            break
               case prefix+'zippyshare': case prefix+'zippydl': case prefix+'zippysharedl': case prefix+'zippydownloader': case prefix+'zipshare': {
                if (args.length < 2) return reply(`Kirim perintah *${command}* link drive`)
                if (!isUrl(args[1]) && !args[1].includes('zippyshare.com')) return reply(mess.error.Iv)
                fetchJson(`https://api.lolhuman.xyz/api/zippyshare?apikey=${lolkey}&url=${args[1]}`)
                    .then((res) =>{
                    textImg(jsonformat(res.result))
                    limitAdd(sender, limit)
                    })
                    .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
            }
            break
           case prefix+'soundcloud':
                if (args.length < 2) return reply(`Kirim perintah *${command}* link music`)
                if (!isUrl(args[1]) && !args[1].includes('soundcloud.com')) return reply(mess.error.Iv)
                fetchJson(`https://api.zeks.xyz/api/soundcloud?apikey=${zekskey}&url=${args[1]}`)
                    .then((res) =>{
                    xinz.sendFileFromUrl(from, res.result.download, '', msg)
                    limitAdd(sender, limit)
                    })
                    .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
            
            break
           case prefix+'twt': case prefix+'twitterdl': case prefix+'twitter':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}twitter* link twt`)
                if (!isUrl(args[1]) && !args[1].includes('twitter.com')) return reply(mess.error.Iv)
                    reply(mess.wait)
                    fetchJson(`https://api.lolhuman.xyz/api/twitter?apikey=${lolkey}&url=${args[1]}`)
                    .then((res) =>{
                    xinz.sendFileFromUrl(from, res.result[1].link, res.title, msg)
                    limitAdd(sender, limit)
                    })
                    .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
            }
            break
            case prefix+'play':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${command} query*`)
                try {
                    reply(mess.wait)
                    yts(q)
                    .then(async (res) =>{
                    let qqppp = [{
                        "buttonId": `${prefix}ytmpp3 ${res.videos[0].url}`,
                        "buttonText": {
                            "displayText": "AUDIO"
                            },
                        "type": "RESPONSE"
                        },{
                    "buttonId": `${prefix}ytmpp4 ${res.videos[0].url}`,
                    "buttonText": {
                        "displayText": "VIDEO"
                    },
                    "type": "RESPONSE"
                }]
                xinz.sendButtonsLoc(from, `Hai @${sender.split('@')[0]}\n\n${res.videos[0].title}\n\n${res.videos[0].description}`, `video or audio?`, qqppp, await getBuffer('https://img.youtube.com/vi/' + res.videos[0].videoId + '/sddefault.jpg'), [sender])
                    limitAdd(sender, limit)
                })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    xinz.sendMess(ownerNumber[0], 'PlayMp3 Error : ' + err)
                    console.log(color('[PlayMp3]', 'red'), err)
                    reply(mess.error.api)
                }
                break
            case prefix+'playmp3':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}play query*`)
                try {
                    reply(mess.wait)
                    let yut = await yts(q)
                    yta(yut.videos[0].url)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 30000) return xinz.sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP3\`\`\`
\`\`\`▢ Filesize : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ Link : ${a.data}\`\`\`
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                        const captionis = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP3\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ URL : ${yut.videos[0].url}\`\`\`

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                            xinz.sendFileFromUrl(from, thumb, captionis, msg)
                            xinz.sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    xinz.sendMess(ownerNumber[0], 'PlayMp3 Error : ' + err)
                    console.log(color('[PlayMp3]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'igstory':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${command}* _query_`)
                reply(mess.wait)
                fetchJson(`https://api.justaqul.xyz/igstory?username=${args[1]}&apikey=${aqulzkey}`)
                    .then((res) =>{
                        let list = []
                        let startnum = 1
                        for (let i = 0; i < res.result.length; i++){
                        let yy = {title: 'Story ke-' + startnum++,
                        rows: [
                           {
                            title: `Type : ${res.result[i].type}`,
                            rowId: `${prefix}sendfile ${res.result[i].url}`
                          }
                        ]
                        }
                        list.push(yy)
                    }
                    xinz.sendList(from, `List Stories`, `List Stories yg tersedia di username "${args[1]}" `, `Diurutkan Berdasarkan Tanggal Upload`,`Pilih Disini`, list, msg)
                    })
                   .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'hinttt':
                await textImg(monospace(q))
                break
            case prefix+'sendfile':
                await xinz.sendFileFromUrl(from, args[1], '', msg)
                break
            case prefix+'cocofun':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}cocofun* link`)
                if (!isUrl(args[1]) && !args[1].includes('coco.fun')) return reply(mess.error.Iv)
                fetchJson(`https://api.lolhuman.xyz/api/cocofun?apikey=${lolkey}&url=${args[1]}`)
                .then((res) =>{
                let qqpp = [{
                    "buttonId": `${prefix}sendfile ${res.result.withwm}`,
                    "buttonText": {
                        "displayText": "WITH WM"
                    },
                    "type": "RESPONSE"
                },{
                    "buttonId": `${prefix}sendfile ${res.result.nowm}`,
                    "buttonText": {
                        "displayText": "NOWM"
                    },
                    "type": "RESPONSE"
                }]
                xinz.sendButtons(from, `Hai Kak @${sender.split('@')[0]}`, `Cocofun Downloader`, `Mau no wm atau ngga?`, qqpp, false, null, [sender])
                 })
                .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'smule':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}smule* link`)
                if (!isUrl(args[1]) && !args[1].includes('smule.com')) return reply(mess.error.Iv)
                fetchJson(`https://api.lolhuman.xyz/api/smule?apikey=${lolkey}&url=${args[1]}`)
                .then((res) =>{
                let qqpp = [{
                    "buttonId": `${prefix}sendfile ${res.result.audio}`,
                    "buttonText": {
                        "displayText": "AUDIO"
                    },
                    "type": "RESPONSE"
                },{
                    "buttonId": `${prefix}sendfile ${res.result.video}`,
                    "buttonText": {
                        "displayText": "VIDEO"
                    },
                    "type": "RESPONSE"
                }]
                xinz.sendButtons(from, `Hai Kak @${sender.split('@')[0]}`, `Smule Downloader`, `Mau ekstensi apa?`, qqpp, false, null, [sender])
                 })
                .catch((err) => {
                            xinz.sendMess(ownerNumber[0], `${command} Error:` + err)
                            reply(mess.error.api)
                        })
                break
            case prefix+'ig':
            case prefix+'igdl':
            case prefix+'instagram':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ig* link ig`)
                if (!isUrl(args[1]) && !args[1].includes('instagram.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                getPost(args[1].split('/')[4])
                .then((res) => {
                    let { owner_user, post, date, capt } = res
                    let caption = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *INSTAGRAM MEDIA*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Owner : ${owner_user}\`\`\`
\`\`\`▢ Jumlah Media : ${post.length}\`\`\`
\`\`\`▢ Caption :${capt}\`\`\`

_Harap tunggu sebentar, media akan segera dikirim_`
                    xinz.sendMess(from, caption)
                    for (let i = 0; i < post.length; i++){
                        xinz.sendFileFromUrl(from, post[i].url)
                    }
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    xinz.sendMess(ownerNumber[0], 'IG Download Error : ' + err)
                    console.log(color('[IG Download]', 'red'), err)
                    reply(mess.error.api)
                })
            }
                break
            case prefix+'fb':
            case prefix+'fbdl':
            case prefix+'facebook':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}fb* url`)
                if (!isUrl(args[1]) && !args[1].includes('facebook.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                fbdl(args[1])
                .then((res) => {
                    xinz.sendFileFromUrl(from, res.result.links[0].url)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    xinz.sendMess(ownerNumber[0], 'FB Error : ' + err)
                    console.log(color('[FB]', 'red'), err)
                    reply(mess.error.api)
                })
            }
                break
            case prefix+'yts':
            case prefix+'ytsearch':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ytsearch* _query_`)
                reply(mess.wait)
                yts(q)
                .then((res) => {
                    let yt = res.videos
                    let txt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE SEARCH*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
*Hasil Pencarian : ${q}*\n`
                    for (let i = 0; i < 10; i++){
                        txt += `\n─────────────────\n\n\`\`\`▢ Judul : ${yt[i].title}\n\`\`\`▢ ID : ${yt[i].videoId}\n\`\`\`▢ Upload : ${yt[i].ago}\n\`\`\`▢ Ditonton : ${yt[i].views}\n\`\`\`▢ Duration : ${yt[i].timestamp}\n\`\`\`▢ URL : ${yt[i].url}\n`
                    }
                    xinz.sendFileFromUrl(from, yt[0].image, txt, msg)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    xinz.sendMess(ownerNumber[0], 'YT SEARCH Error : ' + err)
                    console.log(color('[YT SEARCH]', 'red'), err)
                    reply(mess.error.api)
                })
            }
                break


//------------------< Stalker >-------------------
            case prefix+'igstalk': case prefix+'stalkig':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}igstalk* _username_`)
                reply(mess.wait)
                getUser(args[1].replace('@', ''))
                .then((res) => {
                    let { username, biography, fullName, subscribersCount, subscribtions, highlightCount, isBusinessAccount, isPrivate, isVerified, profilePicHD, postsCount } = res
                    let caption = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *INSTAGRAM PROFILE*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Username : ${username}\`\`\`
\`\`\`▢ Fullname : ${fullName}\`\`\`
\`\`\`▢ Followers : ${subscribersCount}\`\`\`
\`\`\`▢ Following : ${subscribtions}\`\`\`
\`\`\`▢ Post Count : ${postsCount}\`\`\`
\`\`\`▢ HighlightCount : ${highlightCount}\`\`\`
\`\`\`▢ PrivateAccount : ${isPrivate ? 'Yes' : 'No'}\`\`\`
\`\`\`▢ VerifiedAccount : ${isVerified ? 'Yes' : 'No'}\`\`\`
\`\`\`▢ BusinessAccount : ${isBusinessAccount ? 'Yes' : 'No'}\`\`\`
\`\`\`▢ Biography :\`\`\` \n${biography}`
                    xinz.sendFileFromUrl(from, profilePicHD, caption, msg)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    xinz.sendMess(ownerNumber[0], 'IG Stalk Error : ' + err)
                    console.log(color('[IG Stalk]', 'red'), err)
					reply(mess.error.api)
                })
            }
                break
            case prefix+'ghstalk': case prefix+'githubstalk': case prefix+'gitstalk':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ghstalk* _username_`)
                reply(mess.wait)
                axios.get(`https://api.github.com/users/${args[1]}`)
                .then((res) => res.data)
                .then((res) =>{
                    let { login, type, name, followers, following, created_at, updated_at, public_gists, public_repos, twitter_username, bio, hireable, email, location, blog, company, avatar_url, html_url } = res
                    let txt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *GITHUB USER*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
\`\`\`▢ Username : ${login}\`\`\`
\`\`\`▢ Name : ${name}\`\`\`
\`\`\`▢ Followers : ${followers}\`\`\`
\`\`\`▢ Following : ${following}\`\`\`
\`\`\`▢ Created at :  ${moment(created_at).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\`\`\`
\`\`\`▢ Updated at : ${moment(updated_at).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\`\`\`
\`\`\`▢ Public Gists : ${public_gists}\`\`\`
\`\`\`▢ Public Repos : ${public_repos}\`\`\`
\`\`\`▢ Twitter : ${twitter_username}\`\`\`
\`\`\`▢ Email : ${email}\`\`\`
\`\`\`▢ Location : ${location}\`\`\`
\`\`\`▢ Blog : ${blog}\`\`\`
\`\`\`▢ Link : ${html_url}\`\`\`
\`\`\`▢ Bio :\`\`\`\n${bio}`
                    xinz.sendFileFromUrl(from, avatar_url, txt, msg)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    xinz.sendMess(ownerNumber[0], 'GH Stalk Error : ' + err)
                    console.log(color('[GH Stalk]', 'red'), err)
					reply(mess.error.api)
                })
            }
                break
//------------------< Sewa >-------------------
            case prefix+'sewa':
                if (!isGroup)return reply(mess.OnlyGrup)
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}+sewa* add/del waktu`)
                if (args[1].toLowerCase() === 'add'){
                        _sewa.addSewaGroup(from, args[2], sewa)
                        reply(`Success`)
                } else if (args[1].toLowerCase() === 'del'){
                    sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
                fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
                } else {
                   reply(`Penggunaan :\n*${prefix}+sewa* add/del waktu`)
                }
                break
//------------------< Premium >-------------------
            case prefix+'sewabot':
                reply(ind.menuPrice(ownerNumber[0], pushname))
            break
            case prefix+'uptopremium':
                reply(ind.UpToPremi(ownerNumber[0], prefix))
            break
            case prefix+'reset':{
                if (!isOwner) return reply(mess.OnlyOwner)
                    var reset = []
                     _claim = reset
                     glimit = reset
                     limit = reset
                     console.log('Hang tight, it\'s time to reset')
                     fs.writeFileSync('./database/claim.json', JSON.stringify(_claim))
                     fs.writeFileSync('./database/limit.json', JSON.stringify(limit))
                     fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit))
                     textImg(ind.doneOwner())
             }
                break
            case prefix+'premium': case prefix+'prem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}premium* add/del @tag waktu\natau *${prefix}premium* add/del nomor waktu`)
                if (args[1].toLowerCase() === 'add'){
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                    _prem.addPremiumUser(mentioned[0], args[3], premium)
                    }
                    let timez = ms(toMS(args[3]))
                    xinz.sendMess(mentioned[0], `Anda telah ditambahkan oleh owner sebagai salah satu user premium bot, Sisa aktif premium anda adalah ${timez.days} day(s) ${timez.hours} hour(s) ${timez.minutes} minute(s)`)
                    reply('Sukses')
                } else {
                    _prem.addPremiumUser(args[2] + '@s.whatsapp.net', args[3], premium)
                    let timez = ms(toMS(args[3]))
                    xinz.sendMess(args[2] + '@s.whatsapp.net', `Anda telah ditambahkan oleh owner sebagai salah satu user premium bot, Sisa aktif premium anda adalah ${timez.days} day(s) ${timez.hours} hour(s) ${timez.minutes} minute(s)`)
                    reply('Sukses')
                }
                } else if (args[1].toLowerCase() === 'del'){
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        premium.splice(_prem.getPremiumPosition(mentioned[i], premium), 1)
                        fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                        xinz.sendMess(mentioned[i], `Anda telah dihapus dari daftar premium oleh owner, merasa Hal ini janggal? silahkan Chat owner`)
                    }
                    reply('Sukses')
                } else {
                    premium.splice(_prem.getPremiumPosition(args[2] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                        xinz.sendMess(args[2] + '@s.whatsapp.net', `Anda telah dihapus dari daftar premium oleh owner, merasa Hal ini janggal? silahkan Chat owner`)
                }
                } else {
                reply(`Penggunaan :\n*${prefix}premium* add/del @tag waktu\natau *${prefix}premium* add/del nomor waktu`)
                }
                break
            case prefix+'premiumcheck':
            case prefix+'cekpremium':
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}uptopremium* untuk membeli premium`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix+'sewacheck':
            case prefix+'ceksewa': {
                if (!isGroup)return reply(mess.OnlyGrup)
                if (!isSewa) return reply(`Group ini tidak terdaftar dalam list sewabot. Ketik ${prefix}sewabot untuk info lebih lanjut`)
                let cekvip = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                }
                break
            case prefix+'listprem':
            case prefix+'premiumlist':{
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium){
                    men.push(i.id)
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*ID :* @${i.id.split("@")[0]}\n*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                }
                mentions(txt, men, true)
                }
                break
            case prefix+'sewalist': case prefix+'listsewa':
                let txt = `List Sewa\nJumlah : ${sewa.length}\n\n`
                for (let i of sewa){
                    let cekvipp = ms(i.expired - Date.now())
                    txt += `*ID :* ${i.id} \n*Expire :* ${cekvipp.days} day(s) ${cekvipp.hours} hour(s) ${cekvipp.minutes} minute(s) ${cekvipp.seconds} second(s)\n\n`
                }
                reply(txt)
                break
//------------------< BAN >-------------------
            case prefix+'ban':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args[1].toLowerCase() === 'add'){
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        addBanned(mentioned[0], args[3], ban)
                    }
                    reply('Sukses')
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber[0]) return reply(`Tidak bisa ban Owner`)
                    addBanned(quotedMsg.sender, args[2], ban)
                    reply(`Sukses ban target`)
                } else if (!isNaN(args[2])) {
                    addBanned(args[2] + '@s.whatsapp.net', args[3], ban)
                    reply('Sukses')
                 }
                } else if (args[1].toLowerCase() === 'del'){
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        unBanned(mentioned[i], ban)
                    }
                    reply('Sukses')
                }if (isQuotedMsg) {
                    unBanned(quotedMsg.sender, ban)
                    reply(`Sukses unban target`) 
                } else if (!isNaN(args[2])) {
                    unBanned(args[2] + '@s.whatsapp.net', ban)
                    reply('Sukses')
                }
                } else {
                    reply(`Kirim perintah ${prefix}ban add/del (@tag atau nomor atau reply pesan orang yang ingin di ban) masa_ban`)
                }
                break
            case prefix+'listblock':
            case prefix+'listban':
                let txtx = `List Banned\nJumlah : ${ban.length}\n\n`
                let menx = [];
                for (let i of ban){
                    menx.push(i.id)
                    txtx += `*ID :* @${i.id.split("@")[0]}\n`
                    if (i.expired === 'PERMANENT'){
                        let cekvip = 'PERMANENT'
                        txtx += `*Expire :* PERMANENT\n\n`
                    } else {
                        let cekvip = ms(i.expired - Date.now())
                        txtx += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                    }
                 }
                 txtx += '\n\nThis is list of blocked number :\n\n'
					for (let block of blocked) {
                        menx.push(block)
						txtx += `~> @${block.split('@')[0]}\n`
					}
					txtx += `Total : ${blocked.length}\n\n`
                mentions(txtx, menx, true)
                break
            case prefix+'unblock':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command} nomer`)
                await xinz.blockUser(args[1] + '@s.whatsapp.net', "remove")
                break
//------------------< Game >-------------------
            case prefix+'lb': case prefix+'leaderboard':{
                    if (isGroup && !isLevelingOn) return reply(ind.levelingNotOn())
                let top = '*──「 LEADERBOARD LEVEL 」──*\n\n'
                let arrTop = []
                     var nom = 0
                     _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                    for (let i = 0; i < 10; i++) {
                        var roless = 'Copper'
                        if (_level[i].level <= 25) {
                            roless = 'Silver'
                        } else if (_level[i].level <= 50) {
                            roless = 'Gold'
                        } else if (_level[i].level <= 75) {
                            roless = 'Platinum'
                        } else if (_level[i].level < 100) {
                            roless = 'Exterminator'
                        }
                     arrTop.push(_level[i].jid)
                        nom++
                        top += `◪ *${nom}. @${_level[i].jid.replace('@s.whatsapp.net', '')}*\n├❑ *XP: ${_level[i].xp}*\n├❑ *Level: ${_level[i].level}*\n└❑ *Role: ${roless}*\n\n`
                    }
                       let topp = '*── 「 TOPGLOBAL BALANCE 」 ──*\n\n'
                   balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                for (let i = 0; i < 10; i ++){
                    topp += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let toppp = '*── 「 TOPLOCAL BALANCE 」 ──*\n\n'
                let anggroup = groupMembers.map(a => a.jid)
                for (let i = 0; i < balance.length; i ++){
                    if (anggroup.includes(balance[i].id)) {
                        toppp += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                        arrTop.push(balance[i].id)
                    }
                }
                mentions(top + '\n\n' + topp + '\n\n' + toppp, arrTop, true)
            }
                break
                case prefix+'level':
                case prefix+'xp':{
                if (isGroup && !isLevelingOn) return reply(ind.levelingNotOn())
                    try {
                        var pic = await xinz.getProfilePicture(sender)
                    } catch {
                        var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                    }
                   var tolink = await fetchText('https://tinyurl.com/api-create.php?url=' + pic)
                    const userLevel = getLevelingLevel(sender)
                    const userXp = getLevelingXp(sender)
                    const requiredXp = 200 * (Math.pow(2, getLevelingLevel(sender)) - 1)
                     var link = `https://api.lolhuman.xyz/api/rank?apikey=${lolkey}&img=${tolink}&background=${bgbot}&username=${encodeURIComponent(pushname)}&level=${userLevel}&ranking=${role}&currxp=${userXp}&xpneed=${requiredXp}`
                    const levelnya = `*──「 LEVEL INFO 」──*\n\n❑ *Name: @${sender.split('@')[0]}*\n❑ *XP: ${userXp} / ${requiredXp}*\n❑ *Level: ${userLevel}*\n❑ *Role: ${role}*`
                    xinz.sendImage(from, await getBuffer(link), levelnya, msg, [sender])
              }
                    break
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $25 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                let ane = Number(nebal(args[1]) * 25)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, nebal(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
            case prefix+'buygamelimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $20 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                let ane = Number(nebal(args[1]) * 20)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, nebal(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
                case prefix+'claim':
                case prefix+'klaim':
                    if (isClaimOn) return reply(ind.claimOnAlready())
                    addLevelingXp(sender, 10000)
                    let hadippp = randomNomor(1000)
                    addBalance(sender, hadippp, balance)
                    _claim.push(sender)
                    fs.writeFileSync('./database/claim.json', JSON.stringify(_claim))
                    reply(ind.claimOn(hadippp))
                    break
            case prefix+'suit':
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (args.length < 2) return reply(`Penggunaan ${command} gunting/kertas/batu`)
                let suit = ["gunting", "batu", "kertas"];
                let isSuit = suit.includes(q)
                if (isSuit){
                    let suit1 = suit[Math.floor(Math.random() * (suit.length))]
                    let hadi = randomNomor(30)
                    if (q === suit[0]){
                        if (suit1 === "gunting"){
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nseri`)
                        } else if (suit1 === "batu"){
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nKamu kalah`)
                        } else {
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nKamu menang\nHadiah : ${hadi} balance`)
                            addBalance(sender, hadi, balance)
                        }
                    } else if (q === suit[1]){
                        if (suit1 === "batu"){
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nSeri`)
                        } else if (suit1 === "kertas"){
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nKamu kalah`)
                        } else {
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nKamu menang\nHadiah : ${hadi} balance`)
                            addBalance(sender, hadi, balance)
                        }
                    } else if (q === suit[2]){
                        if (suit1 === "kertas"){
                            reply('seri')
                        } else if (suit1 === "gunting"){
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nKamu kalah`)
                        } else {
                            reply(`Kamu ${q}\nKomputer  ${suit1}\nKamu menang\nHadiah : ${hadi} balance`)
                            addBalance(sender, hadi, balance)
                        }
                    }
                    gameAdd(sender, glimit)
                } else {
                    reply(`Penggunaan ${command} gunting/kertas/batu`)
                }
                break
                case prefix+'slot':
                    if (isGroup && !isLevelingOn) return reply(ind.levelingNotOn())
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                    const sotoy = ['🍊 : 🍒 : 🍐','🍒 : 🔔 : 🍊','🍇 : 🍒 : 🍐','🍊 : 🍋 : 🔔','🔔 : 🍒 : 🍐','🔔 : 🍒 : 🍊','🍊 : 🍋 : 🔔','🍐 : 🍒 : 🍋','🍐 : 🍐 : 🍐','🍊 : 🍒 : 🍒','🔔 : 🔔 : 🍇','🍌 : 🍒 : 🔔','🍐 : 🔔 : 🔔','🍊 : 🍋 : 🍒','🍋 : 🍋 : 🍌','🔔 : 🔔 : 🍇','🔔 : 🍐 : 🍇','🔔 : 🔔 : 🔔','🍒 : 🍒 : 🍒','🍌 : 🍌 : 🍌','🍇 : 🍇 : 🍇']
                    const somtoy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
                    const somtoyy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
                    const somtoyyy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
                    if (somtoyy  == '🍌 : 🍌 : 🍌') {
	     	        textImg(`[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN @${sender.split('@')[0]}* ]\n\nYou Get *5000Xp*`)
                    addLevelingXp(sender, 5000)
	     	        } else if (somtoyy == '🍒 : 🍒 : 🍒') {
	     	        textImg(`[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN @${sender.split('@')[0]}* ]\n\nYou Get *5000Xp*`)
                    addLevelingXp(sender, 5000)
	     	        } else if (somtoyy == '🔔 : 🔔 : 🔔') {
	     	        textImg(`[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN @${sender.split('@')[0]}* ]\n\nYou Get *5000Xp*`)
                    addLevelingXp(sender, 5000)
	     	        } else if (somtoyy == '🍐 : 🍐 : 🍐') {
	     	        textImg(`[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN @${sender.split('@')[0]}* ]\n\nYou Get *5000Xp*`)
                    addLevelingXp(sender, 5000)
	     	        } else if (somtoyy == '🍇 : 🍇 : 🍇') {
	     	        textImg(`[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *YOU WIN @${sender.split('@')[0]}* ]\n\nYou Get *5000Xp*`)
                    addLevelingXp(sender, 5000)
	     	        } else {
	     	        textImg(`[  🎰 | *SLOTS* ]\n-----------------\n${somtoy}\n${somtoyy} <=====\n${somtoyyy}\n-----------------\n[  🎰 | *LOST @${sender.split('@')[0]}* ]\n\n Xp mu berkurang 750`)
                    addLevelingXp(sender, -750)
	     	        }
                    gameAdd(sender, glimit)
                    break
            case prefix+'dadu':
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (args.length > 2) return reply(`Penggunaan ${command} angka atau ${command} (Jika mendapat angka 6 akan mendapatkan sejumlah balance)`)
                let dadu = ["1", "2", "3", "4", "5", "6"];
                let isDadu = dadu.includes(q)
                let hadiaq = randomNomor(30)
                let rend = randomNomor(6)
                    await xinz.sendSticker(from, `./media/filebot/${rend}.webp`, msg )
                    gameAdd(sender, glimit)
                    if (rend === "6"){
                    textImg(`Selamat ${pushname}, mendapatkan angka 6 dan dapat ${hadiaq} balance`)
                    addBalance(sender, hadiaq, balance)
                   }
                break
            case prefix+'tebakgambar':{
                if (!isGroup)return reply(mess.OnlyGrup)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, tebakgambar)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson(`http://api.lolhuman.xyz/api/tebak/gambar?apikey=${lolkey}`)
                let anih = anu.result.answer.toLowerCase()
                game.addgambar(from, anih, gamewaktu, tebakgambar)
                const petunjuk = anu.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
                let be = await xinz.prepareMessage(from, await getBuffer(anu.result.image), image)
                let qweriio = be.message["ephemeralMessage"] ? be.message.ephemeralMessage : be
                xinz.sendButtons(from, `Tebak Gambar`, monospace(`Silahkan jawab soal berikut ini\n\nWaktu : ${gamewaktu}s`), `Klik dibawah untuk petunjuk`, [{"buttonId": `${prefix}hinttt ${petunjuk}`,"buttonText": {"displayText": "HINT"},"type": "RESPONSE"}], true, null, null, qweriio.message.imageMessage)
                gameAdd(sender, glimit)
            }
                break
            case prefix+'family100':{
                if (!isGroup)return reply(mess.OnlyGrup)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isfam(from, family100)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await axios.get(`http://api.lolhuman.xyz/api/tebak/family100?apikey=${lolkey}`)
                reply(`*JAWABLAH SOAL BERIKUT*\n\n*Soal :* ${anu.data.result.question}\n*Total Jawaban :* ${anu.data.result.aswer.length}\n\nWaktu : ${gamewaktu}s`)
                let anoh = anu.data.result.aswer
                let rgfds = []
                for (let i of anoh){
                    let fefs = i.split('/') ? i.split('/')[0] : i
                    let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ','') : fefs
                    let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
                    rgfds.push(axsf.toLowerCase())
                }
                game.addfam(from, rgfds, gamewaktu, family100)
                gameAdd(sender, glimit)
            }
                break
//------------------< Owner >-------------------
            case prefix+'self':{
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                xinz.mode = 'self'
                textImg('Berhasil berubah ke mode self')
            }
                break
            case prefix+'publik': case prefix+'public':{
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                xinz.mode = 'public'
                textImg('Berhasil berubah ke mode public')
            }
                break
            case prefix+'clearall':{
                if (!isOwner) return reply(mess.OnlyOwner)
                let chiit = await xinz.chats.all()
                for (let i of chiit){
                    xinz.modifyChat(i.jid, 'clear', {
                        includeStarred: false
                    })
                }
                reply(`Selesai`)
            }
                break
               case prefix+'shutdown':
                    if (!isOwner) return reply(mess.OnlyOwner)
                    reply(`otsukaresama deshita ~👋`)
				    .then(() => xinz.close())
                    break
            case prefix+'setprefix':
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
                if (q === 'multi'){
                    xinz.multi = true
                    xinz.nopref = false
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                } else if (q === 'nopref'){
                    xinz.multi = false
                    xinz.nopref = true
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                } else {
                    xinz.multi = false
                    xinz.nopref = false
                    xinz.prefa = `${q}`
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                }
                break
            case prefix+'setname':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan text`)
               await xinz.updateProfileName(q)
                    reply(`Success`)
	            break
            case prefix+'give':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`cara penggunaan : ${command} @tag/nomor jumlah_xp`)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        addLevelingXp(mentioned[0], args[2])
                    }
                    reply('Sukses')
                } else {
                   addLevelingXp(args[1] + '@s.whatsapp.net', args[2])
                await reply(`Success`)
                }
	      	break
                case prefix+'setstat': case prefix+'setstats': case prefix+'setstatus':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan text`)
                await xinz.setStatus(q)
                reply(`Success`)
		    break
            case prefix+'bc':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan text`)
                let chiit = await xinz.chats.all()
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiit){
                        xinz.sendMessage(i.jid, media, image, {caption: q})
                    }
                    reply(`Sukses`)
                } else if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiit){
                        xinz.sendMessage(i.jid, media, video, {caption: q})
                    }
                    reply(`Sukses`)
                } else {
                    for (let i of chiit){
                        xinz.sendMessage(i.jid, q, text)
                    }
                    reply(`Sukses`)
                }
                break
//------------------< G R U P >-------------------
            case prefix+'delete':
			case prefix+'del':
			case prefix+'d':
            case prefix+'odel':
            case prefix+'odelete':
				if (!isGroup)return reply(mess.OnlyGrup)
                if (command.split(prefix)[1] === 'odelete' && !isPremium) return reply(mess.OnlyPrem)
                if (command.split(prefix)[1] === 'odel' && !isPremium) return reply(mess.OnlyPrem)
				if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
                if (isSticker) return xinz.deleteMessage(from, { id: msg.message.stickerMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
				xinz.deleteMessage(from, { id: msg.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
				break
            case prefix+'afk':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
                if (body.slice(150)) return reply('Alasanlu kepanjangan')
                let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
                afk.addAfkUser(sender, Date.now(), reason, _afk)
                mentions(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, [sender], true)
                break
            case prefix+'infogrup':
            case prefix+'infogroup':
            case prefix+'grupinfo':
            case prefix+'groupinfo':
                if (!isGroup) return reply(mess.OnlyGrup)
                try {
                    var pic = await xinz.getProfilePicture(from)
                } catch {
                    var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                let ingfo = `*G R O U P I N F O*\n\n*Name :* ${groupName}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelcome ? 'Aktif' : 'Mati'}\n*AutoSticker :* ${isAutoSticker ? 'Aktif' : 'Mati'}\n*Nsfw :* ${isNsfw ? 'Aktif' : 'Mati'}\n*AntiLink :* ${isAntiLink ? 'Aktif' : 'Mati'}\n*AntiViewOnce :* ${isAntiVO ? 'Aktif' : 'Mati'}\n*AntiBadword :* ${isBadword ? 'Aktif' : 'Mati'}\n*Desc :* \n${groupMetadata.desc}`
                xinz.sendMessage(from, await getBuffer(pic), image, {quoted: msg, caption: ingfo, contextInfo: {"mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')]}})
                break
           case prefix+'add': case prefix+'oadd':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (command.split(prefix)[1] === 'oadd' && !isPremium) return reply(mess.OnlyPrem)
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                try {
                    var pic = await xinz.getProfilePicture(from)
                } catch {
                    var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                var pepeqq = await getBuffer(pic)
				if (isQuotedMsg && args.length < 2) {
                    xinz.groupAdd(from, [quotedMsg.sender])
                    .then((res) => {
                        if (res.participants[0][quotedMsg.sender.split("@")[0] + '@c.us'].code === "403"){
                            let au = res.participants[0][quotedMsg.sender.split("@")[0] + '@c.us']
                            xinz.sendMessage(quotedMsg.sender, { groupName: groupName, groupJid: from, inviteCode: au.invite_code, inviteExpiration: au.invite_code_exp, caption: `Invited By ChikaBot`, jpegThumbnail: pepeqq }, groupInviteMessage)
                            reply(`Mengirimkan groupInvite kepada nomor tersebut`)
                        } else if (res.participants[0][quotedMsg.sender.split("@")[0] + '@c.us'].code === "408"){
                            reply(`Gagal menambah kan doi dengan alasan: *Dia baru keluar group baru-baru ini*`)
                        } else if (res.participants[0][quotedMsg.sender.split("@")[0] + '@c.us'].code === "401"){
                            reply(`Gagal menambah kan doi dengan alasan: *Bot di block oleh yang bersangkutan*`)
                        } else {
                            reply(jsonformat(res))
                        }
                    })
                    .catch((err) => reply(jsonformat(err)))
                } else if (args.length < 3 && !isNaN(args[1])){
					xinz.groupAdd(from, [args[1] + '@s.whatsapp.net'])
					.then((res) => {
                        if (res.participants[0][args[1] + '@c.us'].code === "403"){
                            let au = res.participants[0][args[1] + '@c.us']
                            xinz.sendMessage(args[1] + '@s.whatsapp.net', { groupName: groupName, groupJid: from, inviteCode: au.invite_code, inviteExpiration: au.invite_code_exp, caption: `Invited By ChikaBot`, jpegThumbnail: pepeqq }, groupInviteMessage)
                            reply(`Mengirimkan groupInvite kepada nomor tersebut`)
                        } else if (res.participants[0][args[1] + '@c.us'].code === "408"){
                            reply(`Gagal menambah kan doi dengan alasan: *Dia baru keluar group baru-baru ini*`)
                        } else if (res.participants[0][args[1] + '@c.us'].code === "401"){
                            reply(`Gagal menambah kan doi dengan alasan: *Bot di block oleh yang bersangkutan*`)
                        } else {
                            reply(jsonformat(res))
                        }
                    })
					.catch((err) => reply(jsonformat(err)))
				} else {
                    reply(`Kirim perintah ${prefix}add nomor atau reply pesan orang yang ingin di add`)
                }
                break
            case prefix+'kick': case prefix+'okick':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (command.split(prefix)[1] === 'okick' && !isPremium) return reply(mess.OnlyPrem)
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    if (mentioned.includes(ownerNumber[0])) return reply(`Tidak bisa kick Owner`)
                    if (mentioned.includes(from.split("-")[0] + '@s.whatsapp.net')) return reply(`Tidak bisa kick owner group`)
                    xinz.groupRemove(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber[0]) return reply(`Tidak bisa kick Owner`)
                    if (quotedMsg.sender.split("@")[0] === from.split("-")[0]) return reply(`Tidak bisa kick owner group`)
                    xinz.groupRemove(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    if (args[1] === ownerNumber[0].split("@")[0]) return reply(`Tidak bisa kick Owner`)
                    if (args[1] === from.split("-")[0]) return reply(`Tidak bisa kick owner group`)
                    xinz.groupRemove(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}kick @tag atau nomor atau reply pesan orang yang ingin di kick`)
                }
                break
            case prefix+'promote': case prefix+'opromote':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (command.split(prefix)[1] === 'opromote' && !isPremium) return reply(mess.OnlyPrem)
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    xinz.groupMakeAdmin(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    xinz.groupMakeAdmin(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    xinz.groupMakeAdmin(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}promote @tag atau nomor atau reply pesan orang yang ingin di promote`)
                }
                break
            case prefix+'demote': case prefix+'odemote':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (command.split(prefix)[1] === 'odemote' && !isPremium) return reply(mess.OnlyPrem)
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    xinz.groupDemoteAdmin(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber[0]) return reply(`Tidak bisa kick Owner`)
                    xinz.groupDemoteAdmin(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    xinz.groupDemoteAdmin(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}demote @tag atau nomor atau reply pesan orang yang ingin di demote`)
                }
                break
            case prefix+'linkgc': case prefix+'linkgrup': case prefix+'linkgroup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                xinz.groupInviteCode(from)
                .then((res) => reply('https://chat.whatsapp.com/' + res))
                break
            case prefix+'leave': case prefix+'oleave':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (command.split(prefix)[1] === 'oleave' && !isPremium) return reply(mess.OnlyPrem)
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                reply('bye...')
                .then(() => xinz.groupLeave(from))
                break
            case prefix+'setdesc':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setdesc desc`)
                xinz.groupUpdateDescription(from, q)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
                case prefix+'revoke':
			    case prefix+'revokegroup':
				case prefix+'revokelink': {
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		        var linkgc = await xinz.revokeInvite(from)
                mentions(`Link Group Berhasil direset oleh admin @${sender.split('@')[0]}`, [sender], true)
            }
					break
            case prefix+'setgrupname':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setgrupname name`)
                xinz.groupUpdateSubject(from, q)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'sider': case prefix+'chatinfo':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
                    xinz.messageInfo(from, msg.message.extendedTextMessage.contextInfo.stanzaId)
                    .then((res) => {
                        let anu = []
                        let txt = `*Info Chat*\n\n`
                        for (let i = 0; i < res.reads.length; i++){
                            anu.push(res.reads[i].jid)
                            txt += `@${res.reads[i].jid.split("@")[0]}\n`
                            txt += `Waktu membaca : ${moment(`${res.reads[i].t}` * 1000).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n\n`
                        }
                        mentions(txt, anu, true)
                    })
                    .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'group':
            case prefix+'grup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                xinz.groupSettingChange(from, "announcement", false)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                } else if (args[1].toLowerCase() === 'disable'){
                xinz.groupSettingChange(from, "announcement", true)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                } else if (args[1].toLowerCase() === 'close'){
                xinz.groupSettingChange(from, "announcement", true)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                } else if (args[1].toLowerCase() === 'open'){
                xinz.groupSettingChange(from, "announcement", false)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                } else {
                testqq(from, `group`)
               }
                break
            case prefix+'setppgrup':
            case prefix+'groupicon':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    xinz.updateProfilePicture(from, media)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`*Kirim atau tag gambar dengan caption ${command}*`)
                }
                break
            case prefix+'join':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}join* link grup`)
                if (!isUrl(args[1]) && !args[1].includes('chat.whatsapp.com')) return reply(mess.error.Iv)
                let code = args[1].replace('https://chat.whatsapp.com/', '')
                xinz.acceptInvite(code)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'tagall':
            case prefix+'otagall':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (command.split(prefix)[1] === 'otagall' && !isPremium) return reply(mess.OnlyPrem)
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                let arr = [];
                let txti = `*[ TAG ALL ]*\n\n${q ? q : ''}\n\n`
                for (let i of groupMembers){
                    txti += `=> @${i.jid.split("@")[0]}\n`
                    arr.push(i.jid)
                }
                mentions(txti, arr, true)
                break
//------------------< Enable / Disable >-------------------
            case prefix+'antibadword':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isBadword) return reply(`Udah aktif`)
                    grupbadword.push(from)
					fs.writeFileSync('./database/grupbadword.json', JSON.stringify(grupbadword))
					reply(`antibadword grup aktif, kirim ${prefix}listbadword untuk melihat list badword`)
                } else if (args[1].toLowerCase() === 'disable'){
                    anu = grupbadword.indexOf(from)
                    grupbadword.splice(anu, 1)
                    fs.writeFileSync('./database/grupbadword.json', JSON.stringify(grupbadword))
                    reply('antibadword grup nonaktif')
                } else {
                    testqq(from, `antibadword`)
                }
                break
            case prefix+'listbadword':
                let bi = `List badword\n\n`
                for (let boo of badword){
                    bi += `- ${boo}\n`
                }
                bi += `\nTotal : ${badword.length}`
                reply(bi)
                break
            case prefix+'addbadword':
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (args.length < 2) return reply(`masukkan kata`)
                if (isKasar(args[1].toLowerCase(), badword)) return reply(`Udah ada`)
                addBadword(args[1].toLowerCase(), badword)
                reply(`Sukses`)
                break
            case prefix+'delbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`masukkan kata`)
                if (!isKasar(args[1].toLowerCase(), badword)) return reply(`Ga ada`)
                delBadword(args[1].toLowerCase(), badword)
                reply(`Sukses`)
                break
            case prefix+'clearbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`tag atau nomor`)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                    delCountKasar(mentioned[i], senbadword)
                    }
                    reply('Sukses')
                } else {
                    delCountKasar(args[1] + '@s.whatsapp.net', senbadword)
                    reply('Sukses')
                }
                break
            case prefix+'mute':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                if (isMuted) return reply(`udah mute`)
                mute.push(from)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot berhasil dimute di chat ini`)
                } else if (args[1].toLowerCase() === 'disable'){
                let anu = mute.indexOf(from)
                mute.splice(anu, 1)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot telah diunmute di group ini`)
                } else {
                    testqq(from, `mute`)
                }
                break
            case prefix+'antilink':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isAntiLink) return reply(`Udah aktif`)
                    antilink.push(from)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					reply('Antilink grup aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = antilink.indexOf(from)
                    antilink.splice(anu, 1)
                    fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
                    reply('Antilink grup nonaktif')
                } else {
                    testqq(from, `antilink`)
                }
                break
            case prefix+'antiviewonce': case prefix+'antivo':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isAntiVO) return reply(`Udah aktif`)
                    antiviewonce.push(from)
					fs.writeFileSync('./database/antiviewonce.json', JSON.stringify(antiviewonce))
					reply('Antiview Once grup aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = antiviewonce.indexOf(from)
                    antiviewonce.splice(anu, 1)
                    fs.writeFileSync('./database/antiviewonce.json', JSON.stringify(antiviewonce))
                    reply('antiviewonce grup nonaktif')
                } else {
                    testqq(from, `antiviewonce`)
                }
                break
            case prefix+'welcome':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isWelcome) return reply(`Udah aktif`)
                    welcome.push(from)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
					reply('Welcome aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = welcome.indexOf(from)
                    welcome.splice(anu, 1)
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    reply('Welcome nonaktif')
                } else {
                    testqq(from, `welcome`)
                }
                break
            case prefix+'autosticker':
            case prefix+'autostiker':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isAutoSticker) return reply(`Udah aktif`)
                    autosticker.push(from)
					fs.writeFileSync('./database/autosticker.json', JSON.stringify(autosticker))
					reply('autosticker aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = autosticker.indexOf(from)
                    autosticker.splice(anu, 1)
                    fs.writeFileSync('./database/autosticker.json', JSON.stringify(autosticker))
                    reply('autosticker nonaktif')
                } else {
                    testqq(from, `autosticker`)
                }
            break
            case prefix+'nsfw':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isNsfw) return reply(`Udah aktif`)
                    nsfw.push(from)
					fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
					reply('nsfw aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = nsfw.indexOf(from)
                    nsfw.splice(anu, 1)
                    fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
                    reply('nsfw nonaktif')
                } else {
                    testqq(from, `nsfw`)
                }
                break
            case prefix+'leveling':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isLevelingOn) return reply(`Udah aktif`)
                    _leveling.push(from)
					fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
					reply('leveling aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = _leveling.indexOf(from)
                    _leveling.splice(anu, 1)
                    fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
                    reply('levelinh nonaktif')
                } else {
                    testqq(from, `leveling`)
                }
                break
            default:
            if (isCmd) {
                textImg(ind.cmdNotFound(command ,prefix))
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
