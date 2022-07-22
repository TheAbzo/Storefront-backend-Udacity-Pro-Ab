"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationToken = exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            if (decoded) {
                next();
            }
            else {
                throw 'exception';
            }
        }
        else {
            throw 'exception';
        }
    }
    catch (error) {
        res.status(401).send('Error 401: Unauthorized');
    }
};
exports.verifyAuthToken = verifyAuthToken;
//check user id
const authorizationToken = (req, res, next) => {
    const userId = parseInt(req.params.id);
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            if (verified.id === userId || verified.user.id === userId) {
                next();
            }
            else {
                throw 'exception';
            }
        }
        else {
            throw 'exception';
        }
    }
    catch (error) {
        res.status(401).send('Error 401: Unauthorized');
    }
};
exports.authorizationToken = authorizationToken;
