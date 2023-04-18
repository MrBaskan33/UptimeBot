const Discord = require('discord.js')
const db = require('croxydb')
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { botid, ownerid } = require("../ayarlar.json")
const osutils = require('os-utils') 

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('istatistik')
    .setDescription('Bot istatistiklerini gösterir.')
    .setDMPermission(false),
      
    async execute(client, interaction) {   
      
      let a = client.users.cache.get('1068897096951935017').tag
      let b = client.users.cache.get('873182701061021696').tag
      let c = client.users.cache.get('1068902433977286769').tag
      let d = client.users.cache.get('1029431477219360869').tag
      
    //  osutils.cpuUsage(function(v) {
        
      const Linkler = db.fetch(`UptimeLink`) || []
      const Uptime = db.fetch(`UptimeLink_${interaction.user.id}`) || []
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      
      if(!Uptime.length <= 0) {
        
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
      
      const IstatistikYok = new EmbedBuilder()
      .setTitle(`HarenUptime • İstatistikler`)
      .setColor("Blurple")
      .addFields({
          name: "<:Tac:1046822690448748574> Bot geliştiricileri",
          value: `**[${a}](https://discord.com/users/1068897096951935017)**\n**[${b}](https://discord.com/users/873182701061021696)**\n**[${c}](https://discord.com/users/1068902433977286769)**\n**[${d}](https://discord.com/users/1029431477219360869)**`
        },
        {
          name: "<:Js:1046823440688103434> Kütüphane",
          value: `\`Discord.js v14.7.1\``
        },
        {
          name: "<:Node:1046823461290508338> Node sürümü",
          value: `\`Node.js v16.14.2\``
        },
        {
          name: "<:Uptime:1046823485428731934> Bot uptime", 
          value: `\`${days} Gün ${hours} Saat ${minutes} Dakika ${seconds} Saniye\``
        },
        {
          name: "<:Sunucu:1046824609758060624> Toplam sunucular",
          value: `\`${client.guilds.cache.size} Sunucu\``
        },
        {
          name: "<:Kullanici:1046824624165486685> Toplam kullanıcılar",
          value: `\`${client.users.cache.size} Kullanıcı\``
        },
        {
          name: "<:Ping:1046824640149987428> Bot gecikmesi",
          value: `\`${Math.round(client.ws.ping)}ms\``
        },
        {
        name: "<:Bot:1051374431819284603> Mesaj gecikmesi",
        value: `\`${Date.now() - interaction.createdTimestamp}ms\``, 
        },      
      /*  {
        name: "<:Bellek:1068161257473052722> Bellek kullanımı",
        value: `\`%${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}\``, 
        },  */
        {
        name: "<:Ram:1069551472544587806> Ram kullanımı",
        value: `\`${(process.memoryUsage().heapUsed / 2024 / 2024).toFixed(2)}mb\``, 
        },
        {
          name: "<:Belge:1046825193131225169> Toplam projeler",
          value: `\`${Linkler.length}\``
        },
        {
          name: "<:Link:1046776084965900308> Senin projelerin",
          value: `\`Hiç link eklememişsin\``
        },
        {           
          name: "<:Premium:1047169286659129487> Toplam premium üyeler",
          value: `\`${db.fetch(`PremiumSayı`) || 0}\``
        },
        {           
          name: "<:Limit:1065321210847707227> Link ekleme hakkın",
          value: `\`${Limit}\``
        })        
     
     return interaction.reply({embeds: [IstatistikYok]})
       
     } else {
       
       let days = Math.floor(client.uptime / 86400000);
       let hours = Math.floor(client.uptime / 3600000) % 24;
       let minutes = Math.floor(client.uptime / 60000) % 60;
       let seconds = Math.floor(client.uptime / 1000) % 60;
      
     const Istatistik = new EmbedBuilder()
      .setTitle(`HarenUptime • İstatistikler`)
      .setColor("Blurple")
      .addFields({
          name: "<:Tac:1046822690448748574> Bot geliştiricileri",
          value: `**[${a}](https://discord.com/users/1068897096951935017)**\n**[${b}](https://discord.com/users/873182701061021696)**\n**[${c}](https://discord.com/users/1068902433977286769)**\n**[${d}](https://discord.com/users/1029431477219360869)**`
        },
        {
          name: "<:Js:1046823440688103434> Kütüphane",
          value: `\`Discord.js v14.7.1\``
        },
        {
          name: "<:Node:1046823461290508338> Node sürümü",
          value: `\`Node.js v16.14.2\``
        },
        {
          name: "<:Uptime:1046823485428731934> Bot uptime", 
          value: `\`${days}gün ${hours}saat ${minutes}dakika ${seconds}saniye\``
        },
        {
          name: "<:Sunucu:1046824609758060624> Toplam sunucular",
          value: `\`${client.guilds.cache.size} sunucu\``
        },
        {
          name: "<:Kullanici:1046824624165486685> Toplam kullanıcılar",
          value: `\`${client.users.cache.size} kullanıcı\``
        },
        {
          name: "<:Ping:1046824640149987428> Bot gecikmesi",
          value: `\`${Math.round(client.ws.ping)}ms\``
        },
        {
        name: "<:Bot:1051374431819284603> Mesaj gecikmesi",
        value: `\`${Date.now() - interaction.createdTimestamp}ms\``, 
        },      
      /*  {
        name: "<:Bellek:1068161257473052722> Bellek kullanımı",
        value: `\`%${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}\``, 
        },  */
        {
        name: "<:Ram:1069551472544587806> Ram kullanımı",
        value: `\`${(process.memoryUsage().heapUsed / 2024 / 2024).toFixed(2)}mb\``, 
        },
        {
          name: "<:Belge:1046825193131225169> Toplam projeler",
          value: `\`${Linkler.length}\``
        },
        {
          name: "<:Link:1046776084965900308> Senin projelerin",
          value: `\`${Uptime.length}\``
        },
        {           
          name: "<:Premium:1047169286659129487> Toplam premium üyeler",
          value: `\`${db.fetch(`PremiumSayı`) || 0}\``
        },
        {           
          name: "<:Limit:1065321210847707227> Link ekleme hakkın",
          value: `\`${Limit}\``
        })       
     
     return interaction.reply({embeds: [Istatistik]})
               
         }
      // })
    }
}
