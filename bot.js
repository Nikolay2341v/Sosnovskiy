const Discord = require(`discord.js`);
const {MessageActionRow, MessageButton, MessageSelectMenu} = require(`discord.js`)
const res = require("express/lib/response");
const mainModule = require(`./mainModule.js`);
const profiles = require(`./profiles.js`)
const discordUsers = mainModule.registeredDiscordUsers1
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const Tickets = [`Tram (Трамвай)`,`Bus (Автобус)`,`Trolleybus (Троллейбус)`]

const ListOfRanks = {
   conductors: [`**artem456664665#4306**`,`**bonnie#6542**`],
   pending: [`**Транспортник35#8506**  (В процессе получения роли: Кондуктор (Необходимо пройти тренировку!)`]
}

const isUserRegistered = (username) => discordUsers.indexOf(username)


client.on(`ready`, () => {
   console.log(`Logged as ${client.user.tag}!`);
})

client.on(`messageCreate`,async message => {
   const msg = message.content.toLowerCase()
   check = isUserRegistered(message.author.username)
   if (msg == `.купить билет`) {
      if (check !== -1) {
     const selectMenu = new MessageSelectMenu()
     .setCustomId(`ticketsTransportSelectMenu`)
     .setPlaceholder(`Выберите транспорт!`)
     .addOptions([
        {
           label: `Трамвай`,
           description: `Купить билет для транспорта: Трамвай`,
           value: `first_option`,
           user: message.author.id
        },

        {
         label: `Автобус`,
         description: `Купить билет для транспорта: Автобус`,
         value: `second_option`,
         user: message.author.id
      },

      {
         label: `Троллейбус`,
         description: `Купить билет для транспорта: Троллейбус`,
         value: `third_option`,
         user: message.author.id
      }
     ])
     const menu = new MessageActionRow()
     .addComponents(selectMenu)
     message.channel.send({content: `Для какого транспорта желаете купить билет?`, components: [menu]})
   } else if (check === -1) {
      message.channel.send(`${message.author.username}, Вам необходимо зарегистрироваться! :no_entry_sign:`)
} 
}
})

client.on(`interactionCreate`,async (interaction) => {
   if (interaction.isSelectMenu && interaction.customId == `ticketsTransportSelectMenu`) {
      const interactionVal = interaction.values[0]
      let transport
      if (interactionVal == `first_option`) {
         transport = `Трамвай`
      } else if (interactionVal == `second_option`) {
         transport = `Автобус`
      } else if (interactionVal == `third_option`) {
         transport = `Троллейбус`
      }
      console.log(interaction.user.id);
      interaction.reply({
      content: `Вы успешно купили билет для транспорта: ${transport}! :white_check_mark:`,
      ephemeral: true
      })
   }
})

let check

client.on(`message`, message => {
 if (message.author.bot === true) return 
  const messageContent = message.content.toLowerCase()
  switch (messageContent) {
     case `.регистрация`:
        check = isUserRegistered(message.author.username)
           if (check !== -1)  {
              message.channel.send(`Вы уже зарегистрированы! :no_entry_sign:`)
           } else if (check === -1) {
              discordUsers.push(message.author.username)
            message.channel.send(`**${message.author.username}**, Вы успешно зарегистрированы! :white_check_mark:`)
           }
        break
   case `.команды`:
message.channel.send(`Доступные команды: 
.регистрация // необходима для использования основных команд!
.билеты // доступные транспортные билеты
.купить билет // купить билет для определенного транспорта.
.зарегистрированные // текущие зарегистированные пользователи
.инфо // информация
Удачного использования, **${message.author.username}**!`)
      break
   case `.билеты`:
      message.channel.send(`Доступные билеты для транспорта: **${Tickets.concat(`,`)}** `)
      break
   case `.зарегистрированные`:
      check = isUserRegistered(message.author.username)
         if (check !== -1)  {
            if (discordUsers.length > 0) {
               message.channel.send(`Текущие зарегистрированные пользователи: **${discordUsers.concat(`,`)}**`)
               } else {
                  message.channel.send(`Нет зарегистрированных пользователей.`)
               }
         } else {
          message.channel.send(`**${message.author.username}**, Вам необходимо зарегистрироваться! :no_entry_sign:`)
         }
  
      break
   case `.инфо`:
      message.channel.send(`Бот был создан пользователем @Су-30#0815. Бот был создан в целях: Разнообразия, верификации новых пользователей.`)
      break
  } 
     
})

client.login(`OTU0NzE5ODE5MTYzMzgxODEy.YjXOHg.yEHCzY_pEhsU8VY46tgTDyYG6Lc`)

