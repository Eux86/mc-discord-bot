// import * as Rcon from 'rcon';
var NodeRcon = require('rcon');
console.log('Initializing rcon');

class Rcon {

  options = {
    tcp: true,       // false for UDP, true for TCP (default true)
    challenge: false  // true to use the challenge protocol (default true)
  };
  host = process.env.RCON_HOST;
  port = process.env.RCON_PORT;
  pass = process.env.RCON_PASS;

  sendCommand = (command: string): Promise<string> => {
    const conn = new NodeRcon(this.host, this.port, this.pass, this.options);

    return new Promise((resolve: any, reject: any) => {
      conn.on('auth', function () {
        console.log("Authed!");
        conn.send(command);
      }).on('response', function (str: string) {
        console.log("Got response: " + str);
        resolve(str);
      }).on('end', function () {
        console.log("Socket closed!");
      });
      conn.connect();
    })
  }
}

export default Rcon;
