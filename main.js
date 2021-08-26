"use strict";
let { WAConnection : _WAConnection } = require("@adiwajshing/baileys");
let { MessageType } = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const figlet = require("figlet");
const fs = require("fs");

const { color, XinzLog } = require("./lib/color");
const { serialize, serializeM } = require("./lib/myfunc");
const myfunc = require("./lib/myfunc");
const afk = require("./lib/afk");

let WAConnection = myfunc.WAConnection(_WAConnection)

let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
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

require('./message/xinz.js')
nocache('./message/xinz.js', module => console.log(color(`'${module}' Telah berubah!`)))

const start = async(sesion) => {
    xinz.logger.level = 'warn'

    // MENG WE EM
    console.log(color(figlet.textSync('Chika-Bot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ CREATED BY XINZTEAM ]'))

    // Menunggu QR
    xinz.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(XinzLog('Scan QR ~~'))
    })

    // Restore Sesion
    fs.existsSync(sesion) && xinz.loadAuthInfo(sesion)

    // Mencoba menghubungkan
    xinz.on('connecting', () => {
		console.log(XinzLog('Connecting...'))
	})

    // Konek
    xinz.on('open', (json) => {
		console.log(XinzLog('Connect, Welcome Owner'))
	})

    // Write Sesion
    await xinz.connect({timeoutMs: 30*1000})
    fs.writeFileSync(sesion, JSON.stringify(xinz.base64EncodedAuthInfo(), null, '\t'))

    // Ya gitulah
    xinz.on('ws-close', () => {
        console.log(XinzLog('Koneksi terputus, mencoba menghubungkan kembali..'))
    })

    // Ntahlah
    xinz.on('close', async ({ reason, isReconnecting }) => {
        console.log(XinzLog('Terputus, Alasan :' + reason + '\nMencoba mengkoneksi ulang :' + isReconnecting))
        if (!isReconnecting) {
            console.log(XinzLog('Connect To Phone Rejected and Shutting Down.'))
        }
    })

    // Block
    xinz.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us','s.whatsapp.net'))
        }
    })

    // Action Call
    xinz.on('CB:action,,call', async json => {
        const callerid = json[2][0][1].from;
        xinz.sendMessage(callerid, `Maaf bot tidak menerima call`, MessageType.text)
        await xinz.blockUser(callerid, "add")
    })

    // Action Battery
    xinz.on('CB:action,,battery', json => {
        const a = json[2][0][1].value
        const b = json[2][0][1].live
        xinz.baterai.baterai = a
        xinz.baterai.cas = b
    })

    // Anti delete
    xinz.on('message-delete', async(json) => {
        require('./message/antidelete')(xinz, json)
    })

    // Chat
    xinz.on('chat-update', async (qul) => {
		if (!qul.hasNewMessage) return
        qul = qul.messages.all()[0]
        if (!qul.message) return
		if (qul.key && qul.key.remoteJid == 'status@broadcast') return
        let msg = serialize(xinz, qul)
        let smsg = serializeM(xinz, qul)
		require('./message/xinz')(xinz, msg, smsg, blocked, _afk, welcome)
	})

    // Event Group 
    xinz.on('group-participants-update', async (anj) => {
        require("./message/group")(xinz, anj, welcome)
    })
}
/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
 function nocache(module, cb = () => { }) {
    console.log(color(`Module ${module} Dipantau oleh kang Bakso`))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
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
