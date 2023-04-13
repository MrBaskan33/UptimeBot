const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Collection } = require('discord.js')
const icooldown = new Collection()
const { ownerid, botid } = require("../ayarlar.json")
const db = require("croxydb")

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {

        const command = client.slashcommands.get(interaction.commandName)
        if (!command) return
        
      if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakim:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/uptimee`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869" && interaction.user.id !== "990186530767249419"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       
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
         
        if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek]})
      
        if (interaction.user.id !== ownerid) {
            if (!icooldown.has(interaction.commandName)) {
                icooldown.set(interaction.commandName, new Collection())
            }

            const now = Date.now()
            const timestampt = icooldown.get(interaction.commandName)
            const cooldownAmount = (command.cooldown) * 1000

            if (timestampt.has(interaction.user.id)) {
                const expiration = timestampt.get(interaction.user.id) + cooldownAmount

                if (now < expiration) {
                    const timeleft = Math.round((expiration - now) / 1000)

                    const embeduyarı = new EmbedBuilder()
                        .setDescription(`<:Carpi:1046504575277998130> Bu komutu tekrar kullanabilmek için **${timeleft} saniye** beklemelisin.`)
                        .setColor('Red')
                        .setTitle("Hata")
                    interaction.reply({ embeds: [embeduyarı] })
                    setTimeout(() => { interaction.deleteReply() }, expiration - now)

                    return
                }

            } else {

                timestampt.set(interaction.user.id, now)
                setTimeout(() => timestampt.delete(interaction.user.id), cooldownAmount)
            }
        }

        if (command.yetki) {

            var yetki = command.yetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet').replace(ownerid, 'Bot Sahibi')

            var yetkiyok = new EmbedBuilder()
                .setDescription(`<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **${yetki}** yetkisine sahip olmalısın.`)
                .setColor('Red')
                .setTitle("Hata")
            if (!interaction.member.permissions.has(`${command.yetki}`)) return interaction.reply({ embeds: [yetkiyok] })
        }

        if (command.botyetki) {

            var botyetki = command.botyetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

            var botyetkiyok = new EmbedBuilder()
                .setDescription(`\<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **${botyetki}** yetkisine sahip olmalıyım.`)
                .setColor('Red')
                .setTitle("Hata")
            if (!interaction.guild.members.me.permissions.has(`${command.botyetki}`)) return interaction.reply({ embeds: [botyetkiyok] })
        }

        try {
            command.execute(client, interaction)
        } catch (error) {
            console.error(error)
        }
    }
}
