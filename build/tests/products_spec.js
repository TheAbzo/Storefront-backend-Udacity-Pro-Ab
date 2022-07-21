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
const user = new products_1.Products();
const productTest = {
    "id": 1,
    "name": "sony",
    "price": 5,
    "category": "phone"
};
describe("Products Model", () => {
    //id to be set in index
    let id = 1;
    it('Create method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.create(productTest);
        console.log("products create", result);
        expect(result).toBeInstanceOf(Object);
    }));
    it('Index method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        console.log("products index first row", result[0]);
        id = result[0].id;
        expect(result).toBeInstanceOf(Array);
    }));
    it('Show method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.show(id);
        console.log("products result in show", result);
        expect(result).toBeInstanceOf(Object);
    }));
    it('Delete method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.delete(1);
        expect(result).toBe(true);
    }));
});
