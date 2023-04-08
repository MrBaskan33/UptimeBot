const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('yardım')
    .setDescription('Uptime yardım menüsü.')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
      
      const Duyuru = db.fetch(`Duyurular`)
      if(!Duyuru) {
       
      const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://cdn.glitch.global/a05428fd-4cef-4667-a4b6-a17f503dbea5/standard%20(3).gif?v=1676280335812")
         .setTitle("HarenUptime • Yardım menüsü")
         .setDescription(`
</yardım:0> Yardım menüsünü gösterir.

</istatistik:0> Bot istatistiklerini gösterir.

</ping:0> Botun ping değerlerini gösterir.

</link-say:0> Sistemdeki link sayılarını gösterir.

</link-ekle:0> Sisteme link eklersiniz.

</link-sil:0> Sistemden link silersiniz.

</link-liste:0> Sistemdeki linklerinizi listeler.

</premium-kontrol:0> Premium üyeliğinizin olup, olmadığını gösterir.

</davet:0> Bot linklerini gösterir.

</uptime-sistemi-kur:0> Sunucuya özel butonlu uptime sistemini kurarsınız.

</uptime-sistemi-sıfırla:0> Sunucudaki uptime sistemini sıfırlar.

**<:Bot:1051374431819284603> Bot duyuruları**
Aktif bir duyuru bulunmuyor.
`)
      interaction.reply({embeds: [Yardım]})
        
      } else {
       
        const duyurular = db.fetch(`Duyurular`).map(y => `**<:Duyuru:1076882238391722136> Duyuru: \`${y}\`**`).join("\n")
        
        const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://cdn.glitch.global/a05428fd-4cef-4667-a4b6-a17f503dbea5/standard%20(3).gif?v=1676280335812")
         .setTitle("HarenUptime • Yardım menüsü")
         .setDescription(`
</yardım:0> Yardım menüsünü gösterir.

</istatistik:0> Bot istatistiklerini gösterir.

</ping:0> Botun ping değerlerini gösterir.

</link-say:0> Sistemdeki link sayılarını gösterir.

</link-ekle:0> Sisteme link eklersiniz.

</link-sil:0> Sistemden link silersiniz.

</link-liste:0> Sistemdeki linklerinizi listeler.

</premium-kontrol:0> Premium üyeliğinizin olup, olmadığını gösterir.

</davet:0> Bot linklerini gösterir.

</uptime-sistemi-kur:0> Sunucuya özel butonlu uptime sistemini kurarsınız.

</uptime-sistemi-sıfırla:0> Sunucudaki uptime sistemini sıfırlar.

**<:Bot:1051374431819284603> Bot duyuruları**
${duyurular || "Aktif bir duyuru bulunmuyor."}
`)
      interaction.reply({embeds: [Yardım]})
        
    }   
  }
}