import Ping from './ping';
import listPlayers from './list-players';
import Rcon from '../src/rcon';

interface ICommand {
  name: string;
  description: string;
  command: (msg: string, args: any, rcon: Rcon) => void;
}

export { ICommand };
export default [Ping, listPlayers];