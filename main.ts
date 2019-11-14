import Rcon from './rcon';
import Discord from './discord';

const rcon = new Rcon();
new Discord(rcon);
