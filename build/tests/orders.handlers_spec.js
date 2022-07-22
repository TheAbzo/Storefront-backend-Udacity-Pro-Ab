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
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const user = new users_1.Users();
const product = new products_1.Products();
const request = (0, supertest_1.default)(server_1.default);
dotenv_1.default.config();
const userTest = {
    id: 1,
    first_name: 'nora',
    last_name: 'The Abzo',
    password: '123'
};
const productTest1 = {
    id: 1,
    name: 'sony',
    price: 5,
    category: 'phone'
};
const productTest2 = {
    id: 2,
    name: 'xiaomi',
    price: 4,
    category: 'phone'
};
describe('Orders Handlers', () => {
    it('Orders Handlers: orders/:id work just fine', () => __awaiter(void 0, void 0, void 0, function* () {
        yield product.create(productTest1);
        yield product.create(productTest2);
        const result2 = yield user.create(userTest);
        const token = jsonwebtoken_1.default.sign(result2[0], process.env.TOKEN_SECRET);
        const response = yield request
            .post(`/orders/${result2[0].id}`)
            .set({ authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
    }));
});
