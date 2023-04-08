const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const ms = require('ms')
const moment = require('moment')
require('moment-duration-format')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('süreli-premium')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Premium verilecek kullanıcıyı belirtin.')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('süre')
            .setDescription('Premium verilecek süreyi belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
      if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869" && interaction.user.id !== "1059475189588570122"){
      return interaction.reply({embeds: [YetkiYok]});
}
      
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const süre = interaction.options.getString('süre');

      const PremiumÜye = db.fetch(`PremiumÜye_${kullanıcı.id}`);
      
      const PremiumVar = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Hata")
         .setDescription(`<:Carpi:1046504575277998130> ${kullanıcı} **adlı kullanıcının zaten premium üyeliği bulunuyor.**`)
        
      if(!PremiumÜye) {
      
      let PremiumBitiş = Date.now() + ms(süre.replace('gün', 'day').replace('saat', 'hours').replace('hafta', 'week'))
      db.set(`PremiumÜye_${kullanıcı.id}`, true)
      db.add(`PremiumSayı`, 1)
      db.set(`Premium_${kullanıcı.id}`, {Bitiş: PremiumBitiş, Başlangıç: Date.now()})
        
      const PremiumEklendi = new EmbedBuilder()
         .setColor("Green")
         .setTitle ("Başarılı")
         .setDescription(`<:Tik:1046504590775947274> ${kullanıcı} **adlı kullanıcıya premium verildi. Bitiş tarihi:** ${moment(PremiumBitiş).format('DD.MM.YYYY - HH:mm:ss')}`)
        
      interaction.reply({embeds: [PremiumEklendi]})
      
      const PremiumVerildi = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Bir kullanıcıya süreli premium verildi")
         .addFields({name: `<:Kullanici:1046824624165486685> **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: `<:Isim:1047166644281163786> **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${kullanıcı.id}`})
         .addFields({name: `<:Saat:1065251905497993347> **Bitiş tarihi**`, value: `${moment(PremiumBitiş).format('DD.MM.YYYY - HH:mm:ss')}`})
      
      client.channels.cache.get("1071763010844106813").send({embeds: [PremiumVerildi]}) 

      setTimeout(() => {
        
      db.delete(`PremiumÜye_${kullanıcı.id}`)
      db.delete(`Premium_${kullanıcı.id}`)
      db.subtract(`PremiumSayı`, 1)
        
      const PremiumGitti = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Bir kullancının premium süresi doldu")
         .addFields({name: `<:Kullanici:1046824624165486685> **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: `<:Isim:1047166644281163786> **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${kullanıcı.id}`})
         
      client.channels.cache.get("1071763010844106813").send({embeds: [PremiumGitti]})

      }, ms(süre.replace('gün', 'day').replace('saat', 'hours').replace('hafta', 'week')))
       
      } else {
   
      interaction.reply({embeds: [PremiumVar]})
      
        }
    }
}