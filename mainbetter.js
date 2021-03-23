const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = '-';
 
const fs = require('fs');

var cfg = JSON.parse(fs.readFileSync('config.json'));
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    console.log(command.name);
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('bot is online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command==="salam"){
        client.commands.get(command).execute(message,args);
    }
    else if (command==="ping")
    {
        client.commands.get(command).execute(message,args);
    }
    
});

client.login(cfg.pkey);