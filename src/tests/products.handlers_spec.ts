import app from '../server'
import supertest from 'supertest';

const request = supertest(app);

describe('suite for testing product handlers endpoints', (): void => {
    let id = 0;
    let token = ""
    it('/products_create endpoint works well', async (): Promise<void> => {
        const user = {   
            "first_name" : "Abzo",
            "last_name" : "feraly",
            "password" : "123456"
        }
        const product = {
            "name" : "xiaomi",
            "price" : 50,
            "category" : "phones"
        }
        const response = await request.post('/create').send(user);
        if (response){
            id = response.body.id;
            token = response.body.token;
        }

        console.log(token)
        const responseProduct = await request.post('/products_create').set({"authorization": `Bearer ${token}`}).send(product);
        expect(responseProduct.status).toBe(200);
    });

    it('/products_index endpoint works well', async (): Promise<void> => {
        const response = await request.get('/products_index');
        expect(response.status).toBe(200);
    });

    it('/products_show endpoint works well', async (): Promise<void> => {
        const response = await request.get(`/products_show/${id}`);
        expect(response.status).toBe(200);
    });

});