"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rcon_1 = __importDefault(require("./rcon"));
var discord_1 = __importDefault(require("./discord"));
var rcon = new rcon_1.default();
var discord = new discord_1.default(rcon);
rcon.sendCommand('list');
