"use strict";
let { WAConnection : _WAConnection } = require("@adiwajshing/baileys");
let { MessageType } = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const figlet = require("figlet");
const fs = require("fs");

const { color, XinzLog } = require("./lib/color");
const { serialize, serializeM } = require("./lib/myfunc");
const myfunc = require("./lib/myfunc");


let WAConnection = myfunc.WAConnection(_WAConnection)

let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let _afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let blocked = [];

global.xinz = new WAConnection()
xinz.mode = 'public'
xinz.baterai = {
    baterai: 0,
    cas: false
};
xinz.multi = true
xinz.nopref = false
xinz.prefa = 'anjing'

const start = async(sesion) => {
    xinz.logger.level = 'warn'

    console.log(color(figlet.textSync('Chika-Bot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ CREATED BY XINZTEAM ]'))

    xinz.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(XinzLog('Scan QR ~~'))
    })

    fs.existsSync(sesion) && xinz.loadAuthInfo(sesion)

    xinz.on('connecting', () => {
		console.log(XinzLog('Connecting...'))
	})

    xinz.on('open', (json) => {
		console.log(XinzLog('Connect, Welcome Owner'))
	})

    await xinz.connect({timeoutMs: 30*1000})
    fs.writeFileSync(sesion, JSON.stringify(xinz.base64EncodedAuthInfo(), null, '\t'))

    xinz.on('ws-close', () => {
        console.log(XinzLog('Koneksi terputus, mencoba menghubungkan kembali..'))
    })

    xinz.on('close', async ({ reason, isReconnecting }) => {
        console.log(XinzLog('Terputus, Alasan :' + reason + '\nMencoba mengkoneksi ulang :' + isReconnecting))
        if (!isReconnecting) {
            console.log(XinzLog('Connect To Phone Rejected and Shutting Down.'))
        }
    })

    xinz.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us','s.whatsapp.net'))
        }
    })
    xinz.on('CB:action,,call', async json => {
        const callerid = json[2][0][1].from;
        xinz.sendMessage(callerid, `Maaf bot tidak menerima call`, MessageType.text)
        await xinz.blockUser(callerid, "add")
    })
    xinz.on('CB:action,,battery', json => {
        const a = json[2][0][1].value
        const b = json[2][0][1].live
        xinz.baterai.baterai = a
        xinz.baterai.cas = b
    })
    xinz.on('message-delete', async(json) => {
        require('./message/antidelete')(xinz, json)
    })
    xinz.on('chat-update', async (qul) => {
		if (!qul.hasNewMessage) return
        qul = qul.messages.all()[0]
        if (!qul.message) return
		if (qul.key && qul.key.remoteJid == 'status@broadcast') return
        let msg = serialize(xinz, qul)
        let smsg = serializeM(xinz, qul)
		require('./message/xinz')(xinz, msg, smsg, blocked, _afk, welcome)
	}) 
    xinz.on('group-participants-update', async (anj) => {
        require("./message/group")(xinz, anj, welcome)
    })
}
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

start(`./${setting.sessionName}.json`)
.catch(err => console.log(err))
