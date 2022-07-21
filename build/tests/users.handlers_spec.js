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
describe('suite for testing user handlers endpoints', () => {
    let id = 0;
    let token = "";
    it('/create user endpoint works well', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            "first_name": "Abzo",
            "last_name": "feraly",
            "password": "123456"
        };
        const response = yield request.post('/create').send(user);
        if (response) {
            id = response.body.id;
            token = response.body.token;
        }
        console.log("id is ", id, "token is ", token);
        expect(response.status).toBe(200);
    }));
    it('/index user endpoint works well', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/index');
        expect(response.status).toBe(401);
    }));
    it('/show user endpoint works well', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/show/${id}`);
        expect(response.status).toBe(401);
    }));
    it('/login user endpoint works well', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            "id": `${id}`,
            "first_name": "Abzo",
            "last_name": "feraly",
            "password": "123456"
        };
        const response = yield request.post(`/login`).send(user);
        expect(response.status).toBe(200);
    }));
});
