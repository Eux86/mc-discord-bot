import { ICommand } from ".";
import Rcon from "../rcon";

const listPlayers: ICommand = {
  name: 'list-players',
  description: 'lists the currently logged players',
  command: (msg: any, args: any, rcon: Rcon) => {
      rcon.sendCommand('list')
        .then((resp: string) => {
          msg.reply(resp);
        })
        .catch((error: string) => {
          msg.reply('It wasn\'t possible to run the command');
          console.error(error);
        });
  },
};

export default listPlayers;