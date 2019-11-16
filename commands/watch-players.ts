import { ICommand } from ".";
import Rcon from "../src/rcon";
import { connect } from "http2";

let watchingPlayers = false;
const delayInMinutes = 0.1; // delay in minutes between checks
let connectedPlayers: Array<string> = [];

let interval: NodeJS.Timeout;

const COMMAND_NAME = 'logged-players-notifications';
const USAGE = `
  ${COMMAND_NAME} on: to turn the notifications on
  ${COMMAND_NAME} off: to turn the notifications off
  ${COMMAND_NAME} status: to check if the notifications are on or off
`
const NOTIFICATIONS_ALREADY_ON = 'The notifications are on already';
const NOTIFICATIONS_ALREADY_OFF = 'The notifications are off already';
const NOTIFICATIONS_STATUS = 'Notifications are ';
const ERROR_CANT_RETRIVE_PLAYERS_LIST = 'It wasn\'t possible to retrive the players list';

const getPlayersListFromCommandResponse = (commandResponse: string): Array<string> => {
  const list = commandResponse.split(': ')[1].split(', ');
  return list;
}

const checkNewPlayers = (updatedPlayersList: Array<string>) => {
  let newPlayers: Array<string> = [];
  for (const player of updatedPlayersList) {
    if (!connectedPlayers.includes(player)) {
      newPlayers.push(player);
    }
  }
  return newPlayers;
}

const notificationsOn = (rcon: Rcon, channel: any): void => {
  if (watchingPlayers) {
    channel.send(NOTIFICATIONS_ALREADY_ON);
    return;
  }
  interval = setInterval(() => {
    rcon.sendCommand('list')
      .then((resp: string) => {
        const playersList = getPlayersListFromCommandResponse(resp);
        const newPlayers = checkNewPlayers(playersList);
        if (newPlayers.length > 0) {
          channel.send(`New players connected: ${newPlayers}`);
        }
        console.log(playersList);
        console.log(newPlayers);
        connectedPlayers = playersList;
      })
      .catch((error: string) => {
        channel.send(ERROR_CANT_RETRIVE_PLAYERS_LIST);
        console.error(error);
      });
  }, delayInMinutes * 60000);
}

const notificationsOff = (channel: any): void => {
  if (!watchingPlayers) {
    channel.send(NOTIFICATIONS_ALREADY_OFF);
    return;
  }
  clearInterval(interval);
}

const notificationsStatus = (channel: any): void => {
  channel.send(`${NOTIFICATIONS_STATUS} ${watchingPlayers ? 'on' : 'off'}`);
}


const loggedPlayersNotifications: ICommand = {
  name: `${COMMAND_NAME}`,
  description: 'if on, alerts when a new player logs in',
  command: (msg: any, args: any, rcon: Rcon) => {
    if (!args || args.length <= 0) {
      msg.reply(USAGE)
    }
    switch (args[0]) {
      case 'on':
        notificationsOn(rcon, msg.channel);
        msg.reply(`${NOTIFICATIONS_STATUS} on`);
        break;
      case 'off':
        notificationsOff(msg.channel);
        msg.reply(`${NOTIFICATIONS_STATUS} off`);
        break;
      case 'status':
        notificationsStatus(msg.channel);
        break;
    }
  },
};

export default loggedPlayersNotifications;