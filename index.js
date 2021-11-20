const jimp = require('jimp')
const { Composer } = require('micro-bot')

const bot = new Composer()

bot.command('boa', async ctx => {
  const message = ctx.message.text.replace('/boa ', '')
  let baseImage = null

  await jimp.read('./public/boa.png').then(image => {
    baseImage = image
  })

  await jimp.loadFont('./public/comic-sans/comic-sans-bold.fnt').then(font => {
    baseImage.print(font, 370, 30, message.toUpperCase(), 250)
  })

  let buffer = null
  baseImage.getBuffer(jimp.MIME_PNG, (err, buf) => {
    buffer = buf
  })

  ctx.replyWithPhoto({ source: buffer })
})

module.exports = bot

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
