const Discord = require('discord.js')
const db = require("croxydb")
const links = db.fetch("UptimeLink") 
module.exports = {
    name: 'ready',
      
    execute(client) {
      
      const style = 'R'
 const starttime = `<t:${Math.floor(client.readyAt / 1000)}` + (style ? `:${style}` : '') + '>'
      console.log(`Bot Aktif`)
let kanal = client.channels.cache.get("1069672809896345742")
  const aktifoldum = new Discord.EmbedBuilder()
.addFields({name: `<:Tik:1065696785395355678> Bot başlatıldı`, value: `\`Son başlatma zamanı:\` ${starttime}`})
.addFields({name: `<:Bot:1065675104027148338> Aktif tuttuğum projeler`, value: `\`${db.fetch("UptimeLink").length}\``})
.setColor("Green")
kanal.send({embeds: [aktifoldum]})
      
      setInterval(function () {
        client.user.setActivity(`/yardım • HarenUptime`)
        }, 30000)
    }
}
