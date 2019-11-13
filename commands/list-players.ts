import { ICommand } from ".";
import Rcon from "../rcon";

const listPlayers: ICommand = {
  name: 'list-players',
  description: 'list-players',
  command: (msg: any, args: any, rcon: Rcon) => {
      rcon.sendCommand('list').then((resp: string) => {
        msg.reply(resp);
      });
  },
};

export default listPlayers;