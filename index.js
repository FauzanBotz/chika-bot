//mau ngapaen bang? kaget ya bisa di deoubfuscate?
//DEOUBFUSCATE By NaufalCream
const {
    default: makeWASocket,
    BufferJSON,
    initInMemoryKeyStore,
    DisconnectReason,
    AnyMessageContent,
    delay,
    useSingleFileAuthState
} = require('@adiwajshing/baileys-md')
const figlet = require('figlet')
const fs = require('fs')
const P = require('pino')
const { Boom } = require('@hapi/boom')
const { color, ChikaLog } = require('./lib/color');
let setting = JSON['parse'](fs.readFileSync('./config.json'))
let sesion = './' + setting['sessionName'] + '.json';
const { state, saveState } = useSingleFileAuthState(sesion);

require('./message/chika.js')
nocache('./message/chika.js', module => console.log(color("'" + module + "' Telah berubah!")));

const start = async () => {
    console.log(color(figlet.textSync('Chika Bot MD', {'font': 'Standard', 'horizontalLayout': 'default', 'vertivalLayout': 'default', 'whitespaceBreak': false}), 'cyan'))
    console.log(color('[ By Rashidsiregar28 ]'));

    const client = makeWASocket({
        'printQRInTerminal': true,
        'logger': P({
            'level': 'fatal',
        }),
        'browser': [setting['botName'] + ' By ChikaBot-MD'],
        'auth': state
    });

    console.log(color('Connected....'))

    client['multi'] = true
    client['nopref'] = false
    client['prefa'] = 'anjing'

    client.ev.on('messages.upsert', async m => {
        if (!m['messages']) return;
        if (m['type'] !== 'notify') return;
        const msg = m['messages'][0];
        require('./message/chika.js')(client, msg, m);
    })

    client.ev.on('connection.update', update => {
        const { connection, lastDisconnect: error } = update;
        if (connection === 'close') {
            console.log(ChikaLog('Koneksi terputus....')), console.log(ChikaLog('Mencoba Menghubungkan ulang...'));
            let reason = error?.output.?.statusCode;
            if (reason === DisconnectReason['connectionClosed']) start();
            if (reason === DisconnectReason['connectionLost']) console.log(ChikaLog('koneksi hilang...'));
            if (reason === DisconnectReason['timedOut']) start();
            if (reason === DisconnectReason['loggedOut']) console['log'](ChikaLog('Session logout, please delete ' + sesion + ' and scan again'));
            if (reason === DisconnectReason['badSession']) console.log(ChikaLog('Session tidak valid, please delete ' + sesion + ' and scan again'));
            if (reason === DisconnectReason['restartRequired']) start();
        }
    })

    client.ev.on('creds.update', () => saveState);
};

function nocache(module, cb = () => {}) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
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

start().catch(e => console.log(e));
