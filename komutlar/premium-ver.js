const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('premium-ver')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Premium verilecek kullanıcıyı belirtin.')
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
      const PremiumÜye = db.fetch(`PremiumÜye_${kullanıcı.id}`);
      
      const PremiumEklendi = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Başarılı")
         .setDescription(`<:Tik:1046504590775947274> ${kullanıcı} **adlı kullanıcıya premium verildi.**`)
        
      const PremiumVar = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Hata")
         .setDescription(`<:Carpi:1046504575277998130> ${kullanıcı} **adlı kullanıcının zaten premium üyeliği bulunuyor.**`)
        
      const PremiumVerildi = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Bir kullanıcıya premium verildi")
         .addFields({name: `<:Kullanici:1046824624165486685> **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: `<:Isim:1047166644281163786> **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${kullanıcı.id}`})
      
      if(!PremiumÜye) {
      
      db.set(`PremiumÜye_${kullanıcı.id}`, true)
      interaction.reply({embeds: [PremiumEklendi]})
      client.channels.cache.get("1071763010844106813").send({embeds: [PremiumVerildi]})
      db.add(`PremiumSayı`, 1)
      
      } else {
   
      interaction.reply({embeds: [PremiumVar]})
      
        }
    }
}