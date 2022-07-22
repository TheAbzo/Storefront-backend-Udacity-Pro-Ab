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
const users_1 = require("../models/users");
const user = new users_1.Users();
const userTest = {
    "id": 1,
    "first_name": "bassant",
    "last_name": "The Abzo",
    "password": "123"
};
describe("Users Model", () => {
    //id to be set in index
    let id = 1;
    it('Users: Create method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.create(userTest);
        expect(result).toBeInstanceOf(Object);
    }));
    it('Users: Index method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        // console.log("Result of index iddddddddd" , result[0].id)
        id = result[0].id;
        expect(result).toBeInstanceOf(Array);
    }));
    it('Users: Show method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.show(id);
        // console.log("result in show", result)
        expect(result).toBeInstanceOf(Object);
    }));
    it('Users: Delete method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.delete(1);
        expect(result).toBe(true);
    }));
});
