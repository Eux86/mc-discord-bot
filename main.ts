import Rcon from './rcon';
import Discord from './discord';

const rcon = new Rcon();
const discord = new Discord(rcon);

rcon.sendCommand('list');