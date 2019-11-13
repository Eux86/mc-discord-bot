"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ping_1 = __importDefault(require("./ping"));
var list_players_1 = __importDefault(require("./list-players"));
exports.default = [ping_1.default, list_players_1.default];
