"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as Rcon from 'rcon';
var NodeRcon = require('rcon');
console.log('Initializing rcon');
var Rcon = /** @class */ (function () {
    function Rcon() {
        var _this = this;
        this.options = {
            tcp: true,
            challenge: false // true to use the challenge protocol (default true)
        };
        this.host = '127.0.0.1';
        this.port = '8888';
        this.pass = 'shomshom';
        this.sendCommand = function (command) {
            var conn = new NodeRcon(_this.host, _this.port, _this.pass, _this.options);
            return new Promise(function (resolve, reject) {
                conn.on('auth', function () {
                    console.log("Authed!");
                    conn.send(command);
                }).on('response', function (str) {
                    console.log("Got response: " + str);
                    resolve(str);
                }).on('end', function () {
                    console.log("Socket closed!");
                });
                conn.connect();
            });
        };
    }
    return Rcon;
}());
exports.default = Rcon;
