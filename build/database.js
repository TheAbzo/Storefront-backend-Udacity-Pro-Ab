"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
//create env file next
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV } = process.env;
let client;
if (ENV === 'dev') {
    console.log("env is dev");
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        port: 5432,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    });
}
else {
    console.log("env is test");
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        port: 5432,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DB
    });
}
exports.default = client;
