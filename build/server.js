"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_handler_1 = __importDefault(require("./handlers/users_handler"));
const products_handlers_1 = __importDefault(require("./handlers/products_handlers"));
const orders_handlers_1 = __importDefault(require("./handlers/orders_handlers"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3002, function () {
    // console.log(`starting app on: ${address}`);
});
//routes
(0, users_handler_1.default)(app);
(0, products_handlers_1.default)(app);
(0, orders_handlers_1.default)(app);
exports.default = app;
