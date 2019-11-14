import Rcon from './src/rcon';
import Discord from './src/discord';
require('dotenv').config();

const rcon = new Rcon();
new Discord(rcon);
