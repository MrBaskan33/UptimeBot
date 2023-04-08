const Discord = require('discord.js')
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')
const { botid } = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('davet')
    .setDescription('Botun linklerini gösterir.')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
      
      const Davet = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot%20applications.commands`)
        .setLabel(`Sunucuna ekle`)
        .setStyle("Link"))
      
      const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://discord.gg/XjBRvvaUzM`)
        .setLabel(`Destek sunucusu`)
        .setStyle("Link"))
      
      
      const Oy = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://top.gg/bot/${botid}/vote`)
        .setLabel(`Oy ver`)
        .setStyle("Link"))
      
      const DavetEmbed = new EmbedBuilder()
        .setTitle(`HarenUptime • Linkler`)
        .setColor("Blurple")
        .setDescription(`
> <:Davet:1047160005998166056> **Beni kullanmayı sevdiysen sunucuna ekleyebilirsin.**

> <:Destek:1047160022897020979> **Bir öneri, hata bildirmek için veya karalisteye alındıysan açtırmak için destek sunucuma katılabilirsin.**

> <:Oy:1067128355830366228> **Oy vererek bize destek olabilirsin ve bazı komutlara erişim sağlarsınız.**
`)
      
     return interaction.reply({embeds: [DavetEmbed], components: [Davet, Destek, Oy]})

    }
}