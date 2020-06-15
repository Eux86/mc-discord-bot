import Rcon from "../rcon";
import { ISettingsService, ISettings } from "../settings";

let watchingPlayers = false;
const delayInMinutes: number = Number.parseInt(process.env.PLAYERS_CONNECTED_ALERTS_POLLING_MINUTES_DELAY || '2'); // delay in minutes between checks
let connectedPlayers: Array<string> = [];

let interval: NodeJS.Timeout;

const getPlayersList = async (rcon: Rcon): Promise<Array<string>> => {
  const resp = await rcon.sendCommand('list');

  const namesPart = resp.trim().split(': ')[1];
  if (namesPart && namesPart.length > 0) {
    return namesPart.split(', ');
  } else {
    return [];
  }
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

const checkDisconnectedPlayers = (updatedPlayersList: Array<string>) => {
  return connectedPlayers.filter(player => !updatedPlayersList.includes(player));
}

export const onMonitorPlayers = (rcon: Rcon, settingsService: ISettingsService, onNewPlayers: (newPlayers: string[]) => void, onPlayersDisconnected: (disconnectedPlayers: string[]) => void): void => {
  watchingPlayers = true;
  settingsService.getSettingsAsync().then((settings: ISettings) => {
    settingsService.setSettingsAsync({ ...settings, connectedPlayersNotificationsEnabled: true });
  });
  continouslyPoll(rcon, onNewPlayers, onPlayersDisconnected);
}

const continouslyPoll = async (rcon: Rcon, onNewPlayers: (newPlayers: string[]) => void, onPlayersDisconnected: (disconnectedPlayers: string[]) => void) => {
  while (true) {
    try {
      const playersList = await getPlayersList(rcon);

      const newPlayers = checkNewPlayers(playersList);
      if (newPlayers.length > 0) {
        onNewPlayers(newPlayers);
      }

      const disconnectedPlayers = checkDisconnectedPlayers(playersList);
      if (disconnectedPlayers.length > 0) {
        onPlayersDisconnected(disconnectedPlayers);
      }

      connectedPlayers = playersList;
    }
    catch (error) {
      console.error(error);
    }
    await new Promise(resolve => setTimeout(resolve, delayInMinutes * 60000));
  }
}
