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
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const order = new orders_1.Orders();
const user = new users_1.Users();
const product = new products_1.Products();
const orderTest = {
    id: 1,
    products: [
        { product_id: 1, quantity: 9 },
        { product_id: 2, quantity: 6 }
    ],
    user_id: 1,
    status: 'active'
};
const userTest = {
    id: 1,
    first_name: 'bassant',
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
describe('Orders Model', () => {
    let useId = 0;
    let orderId = 0;
    //create 1 user, 2 products and initialize these 2
    it('Orders: Create method test', () => __awaiter(void 0, void 0, void 0, function* () {
        yield product.create(productTest1);
        yield product.create(productTest2);
        const result2 = yield user.create(userTest);
        useId = result2[0].id;
        orderTest.user_id = useId;
        const result = yield order.create(orderTest);
        orderId = result;
        expect(result).toBeInstanceOf(Number);
    }));
    it('Orders: Index method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.index();
        expect(result).toBeInstanceOf(Array);
    }));
    it('Orders: Show method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.show(useId);
        expect(result).toBeInstanceOf(Object);
    }));
    it('Orders: Delete method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.delete(orderId);
        expect(result).toBe(true);
    }));
});
