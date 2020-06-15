import { Client, Collection, Guild, Channel, TextChannel } from 'discord.js';
import commands, { ICommand } from './commands';
import Rcon from './rcon';
import { ISettingsService } from './settings';
import { onMonitorPlayers } from './services/online-players';

class Bot {

  readonly commandPrefix = '.';
  private client: Client;
  private testing: boolean = process.env.ONLY_TEST_CHANNEL?.toLowerCase() === 'true';

  constructor(rcon: Rcon, settingsService: ISettingsService) {
    this.client = new Client();
    const clientCommands = new Collection<string, ICommand>();

    commands.forEach((command: ICommand) => {
      clientCommands.set(`${this.commandPrefix}${command.name}`, command);
    });

    this.client.on('message', (msg: any) => {
      // Clean and reads the command
      const args = msg.content.split(/ +/);
      const command = args.shift().toLowerCase();

      // Exception for command .help, it will describe all other commands
      if (command === '.help') {
        const helpText = this.getHelpText(commands);
        msg.channel.send(helpText);
        return;
      }
      if (!clientCommands.has(command)) return;

      // Cycles thorugh all the available commands
      try {
        const concreteCommand = clientCommands.get(command);
        if (concreteCommand) {
          concreteCommand.command(msg, args, rcon, settingsService);
        } else {
          msg.reply(`No such command: ${command}`);
        }
      } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
      }
    });

    this.client.on('ready', () => {
      this.client.channels.cache.forEach((channel) => {
        if (this.isTextChannel(channel)) {
          if (!this.testing || channel.name === 'bot-tests') {
            channel.send('Hello! Mc Bot is now available :)');
          }
        }
      });
      onMonitorPlayers(rcon, settingsService, this.onNewPlayersHandler, this.onDisconnectedPlayersHandler);
      console.log(`Logged in as ${this.client.user?.tag}!`);
    });

    this.client.login(process.env.BOT_TOKEN);
  }

  onNewPlayersHandler = (newPlayers: string[]) => {
    this.broadcastOnAllChannels(`Welcome ${newPlayers}!`)
  }

  onDisconnectedPlayersHandler = (disconnectedPlayers: string[]) => {
    this.broadcastOnAllChannels(`See you next time ${disconnectedPlayers}`)
  }

  broadcastOnAllChannels = (message: string) => {
    this.client.channels.cache.forEach((channel) => {
      if (this.isTextChannel(channel)) {
        if (!this.testing || channel.name === 'bot-tests') {
          channel.send(message);
        }
      }
    });
  }

  isTextChannel = (channel: Channel): channel is TextChannel => channel.type === 'text';

  getHelpText = (commands: Array<ICommand>): string => {
    let helpText = '';
    for (const command of commands) {
      helpText += `${command.name}: ${command.description}\n`;
    }
    return helpText;
  }
}

export default Bot;