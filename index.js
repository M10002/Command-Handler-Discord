const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const client = new Discord.Client();
const config = require("./config.json");

///////////////////////////////////////////////// 

client.commands = new Discord.Collection
client.aliases = new Discord.Collection

/////////////////////////////////////////////////  

const loadCommands = (dir = "./commandes/") => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"))
      
        for (const file of commands) {
        const getFileName = require(`${dir}/${dirs}/${file}`)
        client.commands.set(getFileName.help.name, getFileName)
        getFileName.help.aliases.forEach(alias => {
        client.aliases.set(alias, getFileName.help.name)
    })
  console.log(chalk.yellow(`>> Commande chargée : ${getFileName.help.name}`))
  console.log(chalk.red(`-------------------------------------------------`))
  }
})}

loadCommands()

const loadEvents = (dir = "./events/") => {
    fs.readdirSync(dir).forEach(dirs => {
      const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const event of events) {
        const evt = require(`${dir}/${dirs}/${event}`);
        const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client));
        console.log(chalk.yellow(`>> Event chargé : ${evtName}`));
        console.log(chalk.red(`-------------------------------------------------`))
      };
    });
}

loadEvents();

client.on("message", message => {
  const prefix = config.prefix;
  if (message.author.bot) return
  if (message.channel.type === "dm") return
  if (!message.content.startsWith(prefix)) return
  let args = message.content.slice(prefix.length).split(' ')
  let cmd = args.shift()
  let commands
  if (client.commands.has(cmd)) {

      commands = client.commands.get(cmd)

  }else if (client.commands.has(client.aliases.get(cmd))) {

      commands = client.commands.get(client.aliases.get(cmd))

  }else{ 
      return 
  }
  commands.run(client, message, args)
})

///////////////////////////////////////////////// 

client.login(config.token)