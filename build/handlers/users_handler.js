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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const store = new users_1.Users();
dotenv_1.default.config();
//create env file next
const { TOKEN_SECRET } = process.env;
//return token on creating new user
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            "id": 1,
            "first_name": `${req.body.first_name}`,
            "last_name": `${req.body.last_name}`,
            "password": `${req.body.password}`
        };
        //after it creates user with hashing, we create jwt token and send it back to frontend
        console.log("uhm");
        console.log(user);
        const theUser = yield store.create(user);
        console.log("succ", theUser);
        let token = jsonwebtoken_1.default.sign(theUser, (process.env.TOKEN_SECRET)); //takes 2 args, info we want to store, a string to sign token with(secret)
        console.log("token", token);
        res.json(token);
    }
    catch (err) {
        console.log("here");
        res.status(400);
        res.json(err);
    }
});
//index
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader != undefined) {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
//show
//authenticate calls athenticate(hashing) 
//returns a token on authnticating an existing user
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    try {
        const u = yield store.authenticate(user.id, user.password);
        let token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
//all my routes
const users_routes = (app) => {
    app.post('/create', create);
    app.get('/index', index);
    app.post('/login', authenticate);
    //show
};
exports.default = users_routes;
