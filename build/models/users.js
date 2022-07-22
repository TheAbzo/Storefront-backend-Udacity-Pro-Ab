"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = (BCRYPT_PASSWORD);
const saltRounds = (SALT_ROUNDS);
class Users {
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
                const sql = `INSERT INTO users (first_name, last_name,password) VALUES ('${u.first_name}', '${u.last_name}','${hash}') RETURNING id, first_name, last_name`;
                const result = yield conn.query(sql);
                conn.release();
                console.log("Create", result.rows);
                return result.rows;
            }
            catch (err) {
                throw new Error(`cannot insert ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE id = ${id}`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                // console.log("in show", result.rows[0])
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const book = result.rows[0];
                conn.release();
                return true;
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}. Error: ${err}`);
            }
        });
    }
    authenticate(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = `select * from users where id = $1`;
            const result = yield conn.query(sql, [id]);
            // console.log(password + pepper)
            //if id(user) exists
            if (result.rows.length) {
                const user = result.rows[0];
                //compare passwords
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    // console.log("ssss")
                    //im selecting id only
                    return result.rows[0];
                }
            }
            return null;
        });
    }
}
exports.Users = Users;
