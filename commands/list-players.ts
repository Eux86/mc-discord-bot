import { ICommand } from ".";
import Rcon from "../src/rcon";

const listPlayers: ICommand = {
  name: 'list-players',
  description: 'lists the currently logged players',
  command: (msg: any, args: any, rcon: Rcon) => {
      rcon.sendCommand('list').then((resp: string) => {
        msg.reply(resp);
      });
  },
};

export default listPlayers;