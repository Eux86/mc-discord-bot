"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ping = {
    name: 'ping',
    description: 'Ping!',
    command: function (msg, args) {
        msg.reply('pong');
        msg.channel.send('pong');
    },
};
exports.default = ping;
