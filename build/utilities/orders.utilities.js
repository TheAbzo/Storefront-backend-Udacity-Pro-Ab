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
exports.checkUserId = exports.checkProductId = void 0;
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const productStore = new products_1.Products();
const userStore = new users_1.Users();
//boolean function to check of products id array exists in products table
const checkProductId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productStore.index();
        console.log(products);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.checkProductId = checkProductId;
//boolean function to check of user id exists
const checkUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.show(id);
        if (user)
            return true;
        else
            return false;
    }
    catch (error) {
        return false;
    }
});
exports.checkUserId = checkUserId;
