const fs = require("fs");
let setting = JSON.parse(fs.readFileSync('./config.json'));

exports.fakeStatus = (faketeks, buffer = fs.readFileSync(setting.pathImg)) => {
    return { 
        key: { 
            fromMe: false, 
            participant: `0@s.whatsapp.net`, 
            ...({ remoteJid: "status@broadcast" }) 
        }, 
        message: { 
            "imageMessage": { 
                "mimetype": "image/jpeg", 
                "caption": faketeks, 
                "jpegThumbnail": buffer
            } 
        } 
    }
}

exports.fakeToko = (fake, buffer = fs.readFileSync(setting.pathImg)) => {
    return {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, 
            ...({ remoteJid: "status@broadcast" })
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": buffer
					},
					"title": fake,
					"currencyCode": "IDR",
					"priceAmount1000": "50000000",
					"productImageCount": 1
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		    }
        }
	}
}