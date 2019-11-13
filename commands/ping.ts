import { ICommand } from ".";

const ping: ICommand = {
  name: 'ping',
  description: 'Ping!',
  command: (msg: any, args: any) => {
      msg.reply('pong');
      msg.channel.send('pong');
  },
};

export default ping;