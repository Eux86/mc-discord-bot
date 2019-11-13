"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordClient = require('discord.js');
var commands_1 = __importDefault(require("./commands"));
var Discord = /** @class */ (function () {
    function Discord(rcon) {
        var _this = this;
        this.commandPrefix = '.';
        var client = new DiscordClient.Client();
        client.commands = new DiscordClient.Collection();
        commands_1.default.forEach(function (command) {
            client.commands.set("" + _this.commandPrefix + command.name, command);
        });
        client.on('message', function (msg) {
            var args = msg.content.split(/ +/);
            var command = args.shift().toLowerCase();
            console.info("Called command: " + command);
            if (!client.commands.has(command))
                return;
            try {
                client.commands.get(command).command(msg, args, rcon);
            }
            catch (error) {
                console.error(error);
                msg.reply('there was an error trying to execute that command!');
            }
        });
        client.on('ready', function () {
            console.log("Logged in as " + client.user.tag + "!");
        });
        client.login('NjQ0MTU4NjIyODcxMzIyNjQ0.Xcv_Ug.GamGH16aiF1sVACUCzfvwRazmA8');
    }
    return Discord;
}());
exports.default = Discord;
