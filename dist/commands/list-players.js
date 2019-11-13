"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var listPlayers = {
    name: 'list-players',
    description: 'list-players',
    command: function (msg, args, rcon) {
        rcon.sendCommand('list').then(function (resp) {
            msg.reply(resp);
        });
    },
};
exports.default = listPlayers;
