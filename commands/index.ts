import Ping from './ping';
import listPlayers from './list-players';
import Rcon from '../src/rcon';
import loggedPlayersNotifications from './watch-players';

interface ICommand {
  name: string;
  description: string;
  command: (msg: string, args: any, rcon: Rcon) => void;
}

export { ICommand };
export default [Ping, listPlayers, loggedPlayersNotifications];