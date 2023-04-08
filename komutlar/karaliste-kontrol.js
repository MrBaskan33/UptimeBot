const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-kontrol')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karaliste bilgisine bakılacak kullanıcıyı belirtin.')
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
      
       const KaralistedeVar = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Karalistede")
         .setDescription(`<:Karaliste:1047167116727550023> ${kullanıcı} **adlı kullanıcı karalistede bulunuyor, komutları kullanamaz.**`)
      
      const KaralistedeYok = new EmbedBuilder()
         .setColor("Green")
         .setTitle("Karalistede değil")
         .setDescription(`<:Tik:1046504590775947274> ${kullanıcı} **adlı kullanıcı karalistede bulunmuyor, komutları kullanabilir.**`)
        
      if(!Karaliste) {
      
      interaction.reply({embeds: [KaralistedeYok]}) 
      
      } else {
      
      interaction.reply({embeds: [KaralistedeVar]}) 
        
        }
    }
}