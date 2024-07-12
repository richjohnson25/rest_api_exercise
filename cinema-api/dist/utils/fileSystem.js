"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTransactionFileSync = exports.writeMovieFileSync = exports.writeUserFileSync = exports.writeFileSync = exports.readTransactionFileSync = exports.readMovieFileSync = exports.readUserFileSync = exports.readFileSync = void 0;
const fs_1 = __importDefault(require("fs"));
const readFileSync = () => {
    return JSON.parse(fs_1.default.readFileSync('./database/db.json', 'utf-8'));
};
exports.readFileSync = readFileSync;
const readUserFileSync = () => {
    return JSON.parse(fs_1.default.readFileSync('./database/users-db.json', 'utf-8'));
};
exports.readUserFileSync = readUserFileSync;
const readMovieFileSync = () => {
    return JSON.parse(fs_1.default.readFileSync('./database/movies-db.json', 'utf-8'));
};
exports.readMovieFileSync = readMovieFileSync;
const readTransactionFileSync = () => {
    return JSON.parse(fs_1.default.readFileSync('./database/transactions-db.json', 'utf-8'));
};
exports.readTransactionFileSync = readTransactionFileSync;
const writeFileSync = (data) => {
    return fs_1.default.writeFileSync('./database/db.json', JSON.stringify(data));
};
exports.writeFileSync = writeFileSync;
const writeUserFileSync = (data) => {
    return fs_1.default.writeFileSync('./database/users-db.json', JSON.stringify(data));
};
exports.writeUserFileSync = writeUserFileSync;
const writeMovieFileSync = (data) => {
    return fs_1.default.writeFileSync('./database/movies-db.json', JSON.stringify(data));
};
exports.writeMovieFileSync = writeMovieFileSync;
const writeTransactionFileSync = (data) => {
    return fs_1.default.writeFileSync('./database/transactions-db.json', JSON.stringify(data));
};
exports.writeTransactionFileSync = writeTransactionFileSync;
