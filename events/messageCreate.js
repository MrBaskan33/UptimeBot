const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Collection } = require('discord.js')
const pcooldown = new Collection()
const { prefix, ownerid, botid } = require("../ayarlar.json")
const db = require("croxydb")
const DBL = require("dblapi.js")

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        
        if (message.author.bot) return
        if (!message.content.startsWith(prefix)) return
        let command = message.content.split(" ")[0].slice(prefix.length)
        let args = message.content.split(" ").slice(1)
        let cmd = client.commands.get(command)
        if (!cmd) return
      
 
        if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakim:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/uptimee`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(message.author.id !== "873182701061021696" && message.author.id !== "1068897096951935017" && message.author.id !== "1068902433977286769" && message.author.id !== "1029431477219360869" && message.author.id !== "990186530767249419"){
  
          message.reply({embeds: [Bakımda], components: [Destek]})
       
          }
        }
      
      const Kullanamazsın = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Komutlarımı kullanamazsın")
           .setDescription(`<:Yasak:1047203094380945458> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/uptimee`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
         
        if (db.fetch(`Karaliste_${message.author.id}`)) return message.reply({embeds: [Kullanamazsın], components: [Destek]})
      
        if (message.author.id !== ownerid) {
            if (!pcooldown.has(cmd.name[0])) {
                pcooldown.set(cmd.name[0], new Collection())
            }

            const now = Date.now()
            const timestampt = pcooldown.get(cmd.name[0])
            const cooldownAmount = (cmd.cooldown) * 1000

            if (timestampt.has(message.author.id)) {
                const expiration = timestampt.get(message.author.id) + cooldownAmount

                if (now < expiration) {
                    const timeleft = Math.round((expiration - now) / 1000)

                    const embeduyarı = new EmbedBuilder()
                        .setDescription(`<:Carpi:1046504575277998130> Bu komutu tekrar kullanabilmek için **${timeleft} saniye** beklemelisin.`)
                        .setColor('Red')
                        .setTitle("Hata")
                    message.channel.send({ embeds: [embeduyarı] }).then(msg => {
                        setTimeout(() => { msg.delete() }, expiration - now)
                    })
                    return
                }

            } else {

                timestampt.set(message.author.id, now)
                setTimeout(() => timestampt.delete(message.author.id), cooldownAmount)
            }
        }

        if (cmd.yetki) {

            var yetki = cmd.yetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

            var yetkiyok = new EmbedBuilder()
                .setDescription(`<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **${yetki}** yetkisine sahip olmalısın.`)
                .setColor('Red')
                .setTitle("Hata")
            if (!message.member.permissions.has(`${cmd.yetki}`)) return message.channel.send({ embeds: [yetkiyok] })
        }

        if (cmd.botyetki) {

            var botyetki = cmd.botyetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

            var botyetkiyok = new EmbedBuilder()
                .setDescription(`<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **${botyetki}** yetkisine sahip olmalıyım.`)
                .setColor('Red')
                .setTitle("Hata")
            if (!message.guild.members.me.permissions.has(`${cmd.botyetki}`)) return message.channel.send({ embeds: [botyetkiyok] })
        }

        cmd.execute(client, message, args)

    }
}
