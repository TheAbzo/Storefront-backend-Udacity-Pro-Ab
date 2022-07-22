import { Products, Product } from "../models/products";
import { Users, User } from "../models/users";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../server'
import supertest from 'supertest';

const user = new Users()
const product = new Products()
const request = supertest(app);

dotenv.config()
//create env file next
const {
    TOKEN_SECRET
   } = process.env

const userTest:User = {
    "id":1, //dummy id
    "first_name":"nora",
    "last_name":"The Abzo",
    "password":"123"
}

const productTest1:Product = {
    "id":1, //dummy id
    "name":"sony",
    "price":5,
    "category":"phone"
}

const productTest2:Product = {
    "id":2, //dummy id
    "name":"xiaomi",
    "price":4,
    "category":"phone"
}

describe("Orders Handlers", () => {
    
    it('Orders Handlers: orders/:id work just fine', async (): Promise<void> => {

        await product.create(productTest1)
        await product.create(productTest2)
        const result2 = await user.create(userTest)
        let token = jwt.sign(result2[0],(process.env.TOKEN_SECRET) as jwt.Secret)
        const response = await request.post(`/orders/${result2[0].id}`).set({"authorization": `Bearer ${token}`});
        expect(response.status).toBe(200);
    });
  
})
