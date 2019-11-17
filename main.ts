import Rcon from './src/rcon';
import Bot from './src/bot';
import { SettingsService, ISettingsService } from './src/settings';
require('dotenv').config();

const settingsService: ISettingsService = SettingsService.getInstance();
const rcon = new Rcon();
new Bot(rcon, settingsService);