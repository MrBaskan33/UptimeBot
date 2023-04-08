const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-çıkart')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteden çıkartılacak kullanıcıyı belirtin.')
            .setRequired(true)),
              
    async execute(client, interaction) {  
      
      const YetkiYok = new EmbedBuilder()
         .setDescription(`<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
         .setColor('Red')
         .setTitle("Hata")
        
      if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869" && interaction.user.id !== "990186530767249419" && interaction.user.id !== "1059475189588570122"){
      return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteÇıkartılmaz = new EmbedBuilder()
        .setDescription(`<:Carpi:1046504575277998130> **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
        .setTitle("Hata")
      
      const KaralisteGitti = new EmbedBuilder()
      .setDescription(`<:Tik:1046504590775947274> ${kullanıcı} **adlı kullanıcı karalisteden çıkartıldı, artık botu kullanabilir.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      
      const KaralistedenÇıkartıldı = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Bir kullanıcı karalisteden çıkartıldı")
         .addFields({name: `<:Karaliste:1047167116727550023> **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: `<:Isim:1047166644281163786> **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${kullanıcı.id}`})
         .addFields({name: `<:Kullanici:1046824624165486685> **Yetkili adı**`, value: `${interaction.user}`})
         .addFields({name: `<:Yetkili:1047167457703497728> **Yetkili tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Yetkili id**`, value: `${interaction.user.id}`})
       
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteÇıkartılmaz]})
     
      if(!Karaliste) {
        
        const KaralistedeYok = new EmbedBuilder()
           .setDescription(`<:Carpi:1046504575277998130> ${kullanıcı} **adlı kullanıcı zaten karalistede bulunmuyor.**`)
           .setColor('Red')
           .setTitle("Hata")
        
        interaction.reply({embeds: [KaralistedeYok]})
      
      } else {
       
        db.delete(`Karaliste_${kullanıcı.id}`)
        db.delete(`KaralisteSebep_${kullanıcı.id}`)
        interaction.reply({embeds: [KaralisteGitti]})
        client.channels.cache.get("1061991452139335731").send({embeds: [KaralistedenÇıkartıldı]})
        
        }
    }
}