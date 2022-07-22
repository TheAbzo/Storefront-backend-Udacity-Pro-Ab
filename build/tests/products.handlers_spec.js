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
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
describe('suite for testing product handlers endpoints', () => {
    let id = 0;
    let token = '';
    it('/products_create endpoint works well', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            first_name: 'Abzo',
            last_name: 'feraly',
            password: '123456'
        };
        const product = {
            name: 'xiaomi',
            price: 50,
            category: 'phones'
        };
        const response = yield request.post('/create').send(user);
        if (response) {
            id = response.body.id;
            token = response.body.token;
        }
        // console.log(token)
        const responseProduct = yield request
            .post('/products_create')
            .set({ authorization: `Bearer ${token}` })
            .send(product);
        expect(responseProduct.status).toBe(200);
    }));
    it('/products_index endpoint works well', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products_index');
        expect(response.status).toBe(200);
    }));
    it('/products_show endpoint works well', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/products_show/${id}`);
        expect(response.status).toBe(200);
    }));
});
