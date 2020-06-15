import Ping from './ping';
import listPlayers from './list-players';
import Rcon from '../rcon';
import { ISettingsService } from '../settings';

interface ICommand {
  name: string;
  description: string;
  command: (msg: string, args: any, rcon: Rcon, settingsService: ISettingsService) => void;
}

export { ICommand };
export default [Ping, listPlayers];