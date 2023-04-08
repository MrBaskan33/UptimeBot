const Discord = require('discord.js')
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')
const { botid } = require('../ayarlar.json')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('bakım-kapat')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
      
    if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869" && interaction.user.id !== "1059475189588570122"){
    return interaction.reply({embeds: [YetkiYok]});
}
      
      const Bakım = db.fetch(`Bakım`)
      const Sebep = db.fetch(`BakımSebep`)
      
      if(!Bakım) {
        
      const BakımKapalı = new EmbedBuilder()
      .setDescription(`<:Carpi:1046504575277998130> **Bot zaten bakımda bulunmuyor.**`)
      .setColor('Red')
      .setTitle("Hata")
      interaction.reply({embeds: [BakımKapalı]})
        
      } else {
        
      db.delete(`Bakım`)
      db.delete(`BakımSebep`)
        
      const BakımKapatıldı = new EmbedBuilder()
      .setDescription(`<:Tik:1046504590775947274> **Bot bakımdan çıkartıldı.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      interaction.reply({embeds: [BakımKapatıldı]})
      
        }
     }
  }