const Discord = require('discord.js')
const db = require("croxydb")
const links = db.fetch("UptimeLink") || []
module.exports = {
    name: 'ready',
      
    execute(client) {
     
      console.log(`Bot Aktif`)

      setInterval(function () {
        client.user.setActivity(`/yardım • HarenUptime`)
        }, 30000)
    }
}
