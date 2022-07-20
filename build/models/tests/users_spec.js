"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const user = new users_1.Users();
describe("Users Model", () => {
    it('Index method test', () => {
        expect(user.index).toBeDefined();
    });
});
