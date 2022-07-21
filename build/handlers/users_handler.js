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
const authentication_1 = __importDefault(require("../middleware/authentication"));
const store = new users_1.Users();
dotenv_1.default.config();
//create env file next
const { TOKEN_SECRET } = process.env;
//return token on creating new user with his id in database
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entered create");
    try {
        const user = {
            "id": 1,
            "first_name": `${req.body.first_name}`,
            "last_name": `${req.body.last_name}`,
            "password": `${req.body.password}`
        };
        //after it creates user with hashing, we create jwt token and send it back to frontend
        const theUser = yield store.create(user);
        console.log("type", theUser[0].id);
        let token = jsonwebtoken_1.default.sign(theUser[0], (process.env.TOKEN_SECRET)); //takes 2 args, info we want to store, a string to sign token with(secret)
        // res.json(token).send(`id is ${theUser[0].id}`)
        res.status(200).json({ "token": token, "id": theUser[0].id });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//index
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entered index");
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
//show
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entered index");
    try {
        const user = yield store.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
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
        res.status(401).send("Error 401: Unauthorized");
        // res.json({ error })
    }
});
//all my routes
const users_routes = (app) => {
    app.post('/create', create);
    app.get('/index', authentication_1.default, index);
    app.get('/show/:id', authentication_1.default, show);
    app.post('/login', authenticate);
};
exports.default = users_routes;
