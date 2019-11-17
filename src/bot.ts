const DiscordClient = require('discord.js');
import commands, { ICommand } from './commands';
import Rcon from './rcon';
import { ISettingsService } from './settings';


class Bot {

  readonly commandPrefix = '.';

  constructor(rcon: Rcon, settingsService: ISettingsService) {
    const client = new DiscordClient.Client();
    client.commands = new DiscordClient.Collection();

    commands.forEach((command: ICommand) => {
      client.commands.set(`${this.commandPrefix}${command.name}`, command);
    });

    client.on('message', (msg: any) => {
      // Clean and reads the command
      const args = msg.content.split(/ +/);
      const command = args.shift().toLowerCase();

      // Exception for command .help, it will describe all other commands
      if (command === '.help') {
        const helpText = this.getHelpText(commands);
        msg.channel.send(helpText);
        return;
      }
      if (!client.commands.has(command)) return;

      // Cycles thorugh all the available commands
      try {
        client.commands.get(command).command(msg, args, rcon, settingsService);
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

  getHelpText = (commands: Array<ICommand>): string => {
    let helpText = '';
    for (const command of commands) {
      helpText += `${command.name}: ${command.description}\n`;
    }
    return helpText;
  }
}

export default Bot;