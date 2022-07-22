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
const orders_1 = require("../models/orders");
const authentication_1 = require("../middleware/authentication");
const store = new orders_1.Orders();
console.log("in orders handlers");
//show
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entered order show");
    try {
        const order = yield store.show(parseInt(req.params.id));
        res.status(200).json(order);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
//my product routes
const order_routes = (app) => {
    app.post('/orders/:id', authentication_1.authorizationToken, show);
};
exports.default = order_routes;
