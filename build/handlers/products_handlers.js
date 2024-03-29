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
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const authentication_1 = require("../middleware/authentication");
const store = new products_1.Products();
//needs user token
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            id: 1,
            name: `${req.body.name}`,
            price: req.body.price,
            category: `${req.body.category}`
        };
        //after it creates user with hashing, we create jwt token and send it back to frontend
        const theProduct = yield store.create(product);
        // res.json(token).send(`id is ${theUser[0].id}`)
        res.status(200).json({ id: theProduct[0].id });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//index
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
//show
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(parseInt(req.params.id));
        res.status(200).json(product);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
//my product routes
const products_routes = (app) => {
    app.post('/products_create', authentication_1.verifyAuthToken, create);
    app.get('/products_index', index);
    app.get('/products_show/:id', show);
};
exports.default = products_routes;
