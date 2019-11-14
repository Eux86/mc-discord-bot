import Rcon from './rcon';
import Discord from './discord';
require('dotenv').config();

const rcon = new Rcon();
new Discord(rcon);
