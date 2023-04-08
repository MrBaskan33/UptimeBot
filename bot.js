const Discord = require('discord.js')
const { Client, Partials, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder, ButtonBuilder } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const { botid, token } = require("./ayarlar.json")
const moment = require('moment')
const os = require('os') 
const osutils = require('os-utils') 
require("moment-duration-format")
require("./slash")(client)
const db = require("croxydb")
const fetch = require('node-fetch')
client.login(token)
const express = require('express')
const monitor = require('http-monitor')

//=====// Rol alma \\=====\\
client.on('interactionCreate', async interaction => {
   if(interaction.customId === 'cekilis') {
      if(interaction.member.roles.cache.has("1065651200189534268")){
         interaction.reply({content: `Çekiliş bildirimi rolün geri alındı.`, ephemeral: true})
         interaction.member.roles.remove("1065651200189534268")
      } else {                                      
         interaction.member.roles.add("1065651200189534268")
         interaction.reply({content: `Çekiliş bildirimi rolü verildi.`, ephemeral: true})
      }
   }
 
  if(interaction.customId === 'bildirim') {
      if(interaction.member.roles.cache.has("1065650900967886858")){
         interaction.reply({content: `Genel bildirim rolü geri alındı.`, ephemeral: true})
         interaction.member.roles.remove("1065650900967886858")
      } else {                                      
         interaction.member.roles.add("1065650900967886858")
         interaction.reply({content: `Genel bildirim rolü verildi.`, ephemeral: true})
      }
   }
  
  if(interaction.customId === 'partner') {
      if(interaction.member.roles.cache.has("1075685653209161759")){
         interaction.reply({content: `Partner görme rolü geri alındı.`, ephemeral: true})
         interaction.member.roles.remove("1075685653209161759")
      } else {                                      
         interaction.member.roles.add("1075685653209161759")
         interaction.reply({content: `Partner görme rolü verildi.`, ephemeral: true})
      }
   }
})
//=====// Rol alma \\=====\\

//=====// Embedler \\=====\\
const PreYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130> **Normal bir kullanıcı en fazla 2 proje ekleyebilir, </link-limit:0> komutu ile link limitinizi arttırabilir, </pre-al:0> komutu ile premium alarak sınırsız link ekleyebilirsiniz.**`)
    
const FazlaLink = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130> **Bir kullanıcı tarafından en fazla 999 link eklenebilir.**`)
   
const LinkVar = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130> **Belirtilen proje sistemde bulunuyor.**`)
    
const BaşıHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130> **Proje linkin hatalı, linkin başında \`https://\` olduğundan emin ol.**`)
    
const SonuHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130> **Yalnızca glitch projeleri aktif tutulmaktdır, linkin sonunda \`.glitch.me\` olduğundan emin ol.**`)
    
const LinkEklendi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<:Tik:1046504590775947274> **Projen başarıyla sisteme eklendi, linkiniz 2-5 dk içerisinde aktif olacaktır.**`)
        
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130> **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<:Tik:1046504590775947274> **Projen başarıyla sistemden silindi.**`)
    
const Silindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`<:Tik:1046504590775947274> **Proje başarıyla sistemden silindi.**`)
    
const ProjeEklenmemiş = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Carpi:1046504575277998130>  **Sisteme hiç proje eklememişsin.**`)
//=====// Embedler \\=====\\

//=====// LinkEklemeFormu \\=====\\
const LinkEklemeFormu = new ModalBuilder()
    .setCustomId('linkeklemeform2')
    .setTitle('Link ekle')
const LinkEkleFormu = new TextInputBuilder()
    .setCustomId('linkekle')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://proje-linki.glitch.me')
    .setRequired(true)
const LinkEklemeSistemi = new ActionRowBuilder().addComponents(LinkEkleFormu);
LinkEklemeFormu.addComponents(LinkEklemeSistemi);
//=====// LinkEklemeFormu \\=====\\

//=====// LinkSilmeFormu \\=====\\
const LinkSilmeFormu = new ModalBuilder()
    .setCustomId('linksilmeform2')
    .setTitle('Link sil')
const LinkSilFormu = new TextInputBuilder()
    .setCustomId('linksil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://proje-linki.glitch.me')
    .setRequired(true)
const LinkSilmeSistemi = new ActionRowBuilder().addComponents(LinkSilFormu);
LinkSilmeFormu.addComponents(LinkSilmeSistemi); 
//=====// LinkSilmeFormu \\=====\\

//=====// SilmeFormu \\=====\\
const SilmeFormu = new ModalBuilder()
    .setCustomId('silmeform')
    .setTitle('Link sil')
const SilFormu = new TextInputBuilder()
    .setCustomId('sil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://proje-linki.glitch.me')
    .setRequired(true)
const SilmeSistemi = new ActionRowBuilder().addComponents(SilFormu);
SilmeFormu.addComponents(SilmeSistemi); 

const SilID = new TextInputBuilder()
    .setCustomId('silid')
    .setLabel('Projesi silinecek kullanıcı idsini giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(18)
    .setMaxLength(20)
    .setPlaceholder('873182701061021696')
    .setRequired(true)
const SilmeID = new ActionRowBuilder().addComponents(SilID);
SilmeFormu.addComponents(SilmeID);

const Sebep = new TextInputBuilder()
    .setCustomId('sebep')
    .setLabel('Projeyi silme sebebini belirtin.')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Geçersiz link.')
    .setRequired(true)
const SilmeSebep = new ActionRowBuilder().addComponents(Sebep);
SilmeFormu.addComponents(SilmeSebep);
        
//=====// SilmeKomutu \\=====\\
client.on('interactionCreate', async interaction => {
  if (interaction.commandName === "sil") {
    
    const YetkiYok = new EmbedBuilder()
      .setDescription(`<:Carpi:1046504575277998130> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
    if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869" && interaction.user.id !== "1059475189588570122"){
    return interaction.reply({embeds: [YetkiYok]});
}
    
    await interaction.showModal(SilmeFormu);
   }
 })
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'silmeform') {
      
      let linkInput = interaction.fields.getTextInputValue("sil")
      let linkID = interaction.fields.getTextInputValue("silid")
      let Sebep = interaction.fields.getTextInputValue("sebep")
      const links = db.get(`UptimeLink_${linkID}`)

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok]}).catch(e => { })
        db.unpush(`UptimeLink_${linkID}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
        interaction.reply({embeds: [Silindi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${linkID}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:Carpi:1046504575277998130>"
        } else {
        PreVarmı = "<:Tik:1046504590775947274>"
        }
      
      
        const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Bot sahibi tarafından sistemden bir link silindi")
         .addFields({name: `<:Kullanici:1046824624165486685> **Kullanıcı adı**`, value: `<@${linkID}>`})
         .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${linkID}`})
         .addFields({name: `<:Belge:1046825193131225169> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: `<:Link:1046776084965900308> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${linkID}`).length}`})
         .addFields({name: `<:Premium:1047169286659129487> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
         .addFields({name: `<:Yazi:1048677751818821702> **Linkin silinme sebebi**`, value: `${Sebep}`})
        client.channels.cache.get("1062013022446563458").send({embeds: [ProjeSilindi]})
        
    }
})
//=====// SilmeKomutu \\=====\\

//=====// EklendimAtıldım \\=====\\
client.on('guildCreate', guild => {
  
  const Eklendim = new EmbedBuilder()
     .setColor("Green")
     .setTitle("Bir sunucuya eklendim")
     .addFields({name: `<:Isim:1047166644281163786> **Sunucu adı**`, value: `${guild}`})
     .addFields({name: `<:Id:1047166052741697587> **Sunucu id**`, value: `${guild.id}`})
     .addFields({name: `<:Sunucu:1046824609758060624> **Toplam sunucu**`, value: `${client.guilds.cache.size}`})
     .addFields({name: `<:Kullanici:1046824624165486685> **Toplam kullanıcı**`, value: `${client.users.cache.size}`})
  client.channels.cache.get('1061985950642753623').send({embeds: [Eklendim]})})

  client.on('guildDelete', guild => {
    
    const Atıldım = new EmbedBuilder()
     .setColor("Red")
     .setTitle("Bir sunucudan atıldım")
     .addFields({name: `<:Isim:1047166644281163786> **Sunucu adı**`, value: `${guild}`})
     .addFields({name: `<:Id:1047166052741697587> **Sunucu id**`, value: `${guild.id}`})
     .addFields({name: `<:Sunucu:1046824609758060624> **Toplam sunucu**`, value: `${client.guilds.cache.size}`})
     .addFields({name: `<:Kullanici:1046824624165486685> **Toplam kullanıcı**`, value: `${client.users.cache.size}`})
  client.channels.cache.get('1061985950642753623').send({embeds: [Atıldım]})})
//=====// EklendimAtıldım \\=====\\

//=====// LinkEklemeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "eklebuton") {
      
      const Kullanamazsın = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Komutlarımı kullanamazsın")
           .setDescription(`<:Yasak:1047203094380945458> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
       
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakim:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek], ephemeral: true})
       
          }
        }
      
    await interaction.showModal(LinkEklemeFormu);
  }
})
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'linkeklemeform2') {
    
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+2 
      
      if (!db.fetch(`UptimeLink_${interaction.user.id}`)) {
           db.set(`UptimeLink_${interaction.user.id}`, [])
        }
        const link = interaction.fields.getTextInputValue("linkekle")
        let link2 = db.fetch(`UptimeLink_${interaction.user.id}`, [])

        const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)

        if (!link) return

        if (PremiumÜye) {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= 999) {
                return interaction.reply({embeds: [FazlaLink], ephemeral: true}).catch(e => { })
            }

        } else {
        
        if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= Limit) {
                return interaction.reply({embeds: [PreYok], ephemeral: true}).catch(e => { })}
          }

        if (link2.includes(link)) {
            return interaction.reply({embeds: [LinkVar], ephemeral: true}).catch(e => { })
        }

        if (!link.startsWith("https://")) {
            return interaction.reply({embeds: [BaşıHatalı], ephemeral: true}).catch(e => { })
        }

        if (!link.endsWith(".glitch.me")) {
            return interaction.reply({embeds: [SonuHatalı], ephemeral: true}).catch(e => { })
        }
      
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`UptimeLink`, link)
  
        interaction.reply({embeds: [LinkEklendi], ephemeral: true}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:Carpi:1046504575277998130>"
        } else {
        PreVarmı = "<:Tik:1046504590775947274>"
        }
        
      const ProjeEklendi = new EmbedBuilder()
           .setColor("Green")
           .setTitle("Sisteme bir link eklendi")
           .addFields({name: `<:Kullanici:1046824624165486685> **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
           .addFields({name: `<:Isim:1047166644281163786> **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
           .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${interaction.user.id}`})
           .addFields({name: `<:Belge:1046825193131225169> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
           .addFields({name: `<:Link:1046776084965900308> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
           .addFields({name: `<:Premium:1047169286659129487> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        client.channels.cache.get("1062013022446563458").send({embeds: [ProjeEklendi]})
        
     } 
 })
//=====// LinkEklemeSistemi \\=====\\

//=====// LinkSilmeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "silbuton") {
      
      const Kullanamazsın = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Komutlarımı kullanamazsın")
           .setDescription(`<:Yasak:1047203094380945458> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
      
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakim:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       
          }
        }
      
    await interaction.showModal(LinkSilmeFormu);
   }
})
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'linksilmeform2') {
    
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.guild.id}`)
      
      const links = db.get(`UptimeLink_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("linksil")

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok], ephemeral: true}).catch(e => { })
     
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
        
        interaction.reply({embeds: [LinkSilindi], ephemeral: true}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:Carpi:1046504575277998130>"
        } else {
        PreVarmı = "<:Tik:1046504590775947274>"
        }
      const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Sistemden bir link silindi")
         .addFields({name: `<:Kullanici:1046824624165486685> **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:Isim:1047166644281163786> **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: `<:Id:1047166052741697587> **Kullanıcı id**`, value: `${interaction.user.id}`})
         .addFields({name: `<:Belge:1046825193131225169> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: `<:Link:1046776084965900308> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
         .addFields({name: `<:Premium:1047169286659129487> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
        client.channels.cache.get("1062013022446563458").send({embeds: [ProjeSilindi]})
        
    }
})
//=====// LinkSilmeSistemi \\=====\\
      
//=====// LinkListeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "listebuton") {
    
    const Kullanamazsın = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Komutlarımı kullanamazsın")
           .setDescription(`<:Yasak:1047203094380945458> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
      
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot bakımda")
           .setDescription(`<:Bakim:1070693677619478669> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
           .setURL(`https://discord.gg/XjBRvvaUzM`)
           .setLabel("Destek sunucusu")
           .setStyle("Link"))
          
          if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       
          }
        }
      
    const LinkYok = db.get(`UptimeLink_${interaction.user.id}`)
 			if (!LinkYok) return interaction.reply({embeds: [ProjeEklenmemiş], ephemeral: true})
        
        const links = db.get(`UptimeLink_${interaction.user.id}`).map(map => `<:Link:1046776084965900308> **Link:** ${map}`).join("\n")

        const LinkListe = new EmbedBuilder()
            .setTitle(`Sistemdeki projelerin`)
            .setDescription(`${links || "Sisteme eklenmiş bir proje yok."}`)
            .setFooter({ text: "Uptime linkler" })
            .setColor("Blurple")

        interaction.reply({
            embeds: [LinkListe],
            ephemeral: true
        }).catch(e => { })

    }
})
//=====// LinkListeSistemi \\=====\\

//=====// HataLog \\=====\\

const log = '1061985950642753625'
process.on("unhandledRejection", error => { 
  
  const Hata = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Hata:1048294942054809630> **Bir hata oluştu**\n\`${error}\``)
   
  client.channels.cache.get(log).send({embeds: [Hata]}) 
 
  console.log(error)
})
process.on("uncaughtException", error => { 
  
  const Hata2 = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Hata:1048294942054809630> **Bir hata oluştu**\n\`${error}\``)
   
  client.channels.cache.get(log).send({embeds: [Hata2]}) 
  
  console.log(error)
})
process.on("uncaughtExceptionMonitor", error => {
  
  const Hata3 = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`<:Hata:1048294942054809630> **Bir hata oluştu**\n\`${error}\``)
   
  client.channels.cache.get(log).send({embeds: [Hata3]}) 

  console.log(error)
})
 
/*monitor(`${db.fetch(`UptimeLink`)}`, {
    retries: 1
}).on('http-error', function(err) {
client.channels.cache.get(log).send(`Sunucu, bir` +err.statusCode+` hatası buldu. Hatanın Açıklaması:`+err.body)
    console.log('The server returned a '+err.statusCode+' statuscode, with the body:'+err.body);
}).on('connection-error', function() {
    console.log('The server could not be reached');
client.channels.cache.get(log).send(`Sunucuya bağlanılamadı`)
}).on('error', function(err) {
client.channels.cache.get(log).send(`Bu hata, hem 404 gibi hatasında hem de sunucuya bağlanamama hatasında tetiklenir`)
    console.log('This is triggered on both http-error and connection-error');
}).on('recovery', function() {
    console.log('The server just recovered after downtime');
client.channels.cache.get(log).send(`Sunucu kapalı kalma süresinden sonra yeni kurtarıldı`)
});*/
//=====// HataLog \\=====\\

//=====// PingLog \\=====\\
const pinglendi = new EmbedBuilder()
  .addFields({name: `<:Sistem:1065695351337660547> Linkler başarıyla pinglendi`, value: `**Pinglenen link sayısı:** \`${db.fetch("UptimeLink").length || 0}\``})
  .setColor("Green")
//=====// PingLog \\=====\\

//=====// UptimeEtme \\=====\\
setInterval(() => {
  var links = db.get("UptimeLink");
  if (!links) return;
  links.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("Hata: " + e);
    }
  });
  console.log("Uptime başarılı");
  client.channels.cache.get("1069661624878764062").send({embeds: [pinglendi]})
}, 120000);
//=====// UptimeEtme \\=====\\

