<p align="center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStH_A0WKtnRtD_Bla6B71LjtP-GtYOkacYsg&usqp=CAU" alt="CHIKA BOT" width="500"/>


</p>
<p align="center">
<a href="#"><img title="CHIKA BOT" src="https://img.shields.io/badge/CHIKA BOT-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/rashidsiregar28/chika-bot"><img title="Author" src="https://img.shields.io/badge/Author-rashidsiregar28-red.svg?style=for-the-badge&logo=github"></a>
</p>
<p align="center">
<a href="https://github.com/rashidsiregar28/chika-bot"><img title="Followers" src="https://img.shields.io/github/followers/rashidsiregar28?color=blue&style=flat-square"></a>
<a href="https://github.com/rashidsiregar28/chika-bot"><img title="Stars" src="https://img.shields.io/github/stars/rashidsiregar28/chika-bot?color=red&style=flat-square"></a>
<a href="https://github.com/rashidsiregar28/chika-bot/network/members"><img title="Forks" src="https://img.shields.io/github/forks/rashidsiregar28/chika-bot?color=red&style=flat-square"></a>
<a href="https://github.com/rashidsiregar28/chika-bot/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/rashidsiregar28/chika-bot?label=Watchers&color=blue&style=flat-square"></a>
</p>

<p align="center">
  <a href="https://github.com/rashidsiregar28/chika-bot#requirements">Requirements</a> •
  <a href="https://github.com/rashidsiregar28/chika-bot#instalasi">Installation</a> •
  <a href="https://github.com/rashidsiregar28/chika-bot#thanks-to">Thanks to</a> •
  <a href="https://github.com/rashidsiregar28/chika-bot#Official-Group"> Official Group Bot</a> •
  <a href="https://github.com/rashidsiregar28/chika-bot#donate">Donate</a>

<p align='center'>
   <a href="https://twitter.com/rashidsiregar28"><img height="30" src="https://github.com/TobyG74/TobyG74/blob/main/twitter.png?raw=true"></a>&nbsp;&nbsp;
   <a href="https://instagram.com/rashidsiregar28"><img height="30" src="https://github.com/TobyG74/TobyG74/blob/main/instagram.jpg?raw=true"></a>&nbsp;&nbsp;
   <a href="https://www.facebook.com/rashidsiregar28"><img height="30" src="https://github.com/TobyG74/TobyG74/blob/main/facebook.png?raw=true"></a>&nbsp;&nbsp;
   <a href="https://wa.me/628127668234"><img height="30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBc_3WgZjWOtqdKZQbdkxUl5A31GZ_YC35zQ&usqp=CAU"></a>
</P>
</p>
</div>


---

# Chika-Bot
## Information
> ChikaBot ialah recode base dari [Xinz-bot](https://github.com/xinz-team/xinzBot)
>
>

## Bugs and Tester
* Jika kamu menemukan bug jangan lupa buka Issues
* Info Lebih Lanjut, Chat [owner-chika](https://wa.me/628127668234)
* Kamu bisa testing fitur Chika-Bot [disini](https://wa.me/6289513435428?text=.menu)

# Requirements
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker command)
* Lolhuman Api, Regist on [this](https://api.lolhuman.xyz/register) and get a free APIKEY
* Aqulz Api, Regist on [this](https://justaqul.xyz/auth/registration) and get a free APIKEY
* [Image Magic](https://imagemagick.org/script/download.php) ( for nulis command, Centang Kolom 1,2,3,5,6)

# Instalasi
## For Windows
```bash
git clone https://github.com/rashidsiregar28/chika-bot.git
cd chika-bot
npm install
node main pm2 start main.js
```
## For Termux
- sorry, this repo doesn't support termux :(
>[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rashidsiregar28/chika-bot)
>

## For VPS
```bash
apt install nodejs git ffmpeg imagemagick
git clone https://github.com/rashidsiregar28/chika-bot.git
cd chika-bot
npm install
node main or pm2 start main.js
```

## Edit file
- Change ownerNumber on [this section](https://github.com/rashidsiregar28/chika-bot/blob/4d8dc8692e97e2ca60deaa8dc77dab551abf6523/config.json#L2)
- Change botName on [this section](https://github.com/rashidsiregar28/chika-bot/blob/4d8dc8692e97e2ca60deaa8dc77dab551abf6523/config.json#L5)
- Change Apikey Lolhuman on [this section](https://github.com/rashidsiregar28/chika-bot/blob/4d8dc8692e97e2ca60deaa8dc77dab551abf6523/config.json#L7)
- Change Apikey Aqulz on [this section](https://github.com/rashidsiregar28/chika-bot/blob/4d8dc8692e97e2ca60deaa8dc77dab551abf6523/config.json#L10)
- You can edit list and display menu or donate on [this section](https://github.com/rashidsiregar28/chika-bot/blob/main/help/ind.js)
- You can add fiture on [this section](https://github.com/rashidsiregar28/chika-bot/blob/main/message/xinz.js)


## Installing the FFmpeg for Windows
* Unduh salah satu versi FFmpeg yang tersedia dengan mengklik [di sini](https://www.gyan.dev/ffmpeg/builds/).
* Extract file ke `C:\` path.
* Ganti nama folder yang telah di-extract menjadi `ffmpeg`.
* Run Command Prompt as Administrator.
* Jalankan perintah berikut::
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Jika berhasil, akan memberikanmu pesan seperti: `SUCCESS: specified value was saved`.
* Sekarang setelah Anda menginstal FFmpeg, verifikasi bahwa itu berhasil dengan menjalankan perintah ini untuk melihat versi:
```cmd
> ffmpeg -version
```

## Donate
- [Saweria](https://saweria.co/rashidsiregar28)
- [Paypal](https://www.paypal.com/paypalme/rashidsiregar28)

# Official Group
- [Official Group 1](https://chat.whatsapp.com/HLU6B1Mw34QBMUoXAyhec0)
- [Official Group 2](https://chat.whatsapp.com/IwGkynIvQAk1J6wQVDLeFC)

# Thanks to
* [`Baileys`](https://github.com/adiwajshing/Baileys)
* [`Xinz-Team`](https://github.com/Xinz-Team)
* [`Aqulzz`](https://github.com/zennn08)
* [`Nurutomo`](https://github.com/Nurutomo)
* [`Faiz Bastomi`](https://github.com/FaizBastomi)
* [`MhankBarBar`](https://github.com/MhankBarBar)
* [`MRHRTZ`](https://github.com/MRHRTZ)
* [`Mamet`](https://github.com/mamet8/)
* [`SlavyanDesu`](https://github.com/SlavyanDesu)
* [`VideFrelan`](https://github.com/VideFrelan)
* [`TobyG74`](https://github.com/TobyG74)
