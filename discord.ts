const DiscordClient = require('discord.js');
import commands, { ICommand } from './commands';
import Rcon from './rcon';


class Discord {

  readonly commandPrefix = '.';

  constructor(rcon: Rcon) {
    const client = new DiscordClient.Client();
    client.commands = new DiscordClient.Collection();

    commands.forEach((command: ICommand) => {
      client.commands.set(`${this.commandPrefix}${command.name}`, command);
    });

    client.on('message', (msg: any) => {
      const args = msg.content.split(/ +/);
      const command = args.shift().toLowerCase();
      console.info(`Called command: ${command}`);
  
      if (!client.commands.has(command)) return;
  
      try {
          client.commands.get(command).command(msg, args, rcon);
      } catch (error) {
          console.error(error);
          msg.reply('there was an error trying to execute that command!');
      }
  });

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.login(process.env.BOT_TOKEN);
  }
}

export default Discord;