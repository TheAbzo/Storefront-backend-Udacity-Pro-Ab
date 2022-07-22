import app from '../server'
import supertest from 'supertest';

const request = supertest(app);

describe('suite for testing user handlers endpoints', (): void => {
    let id = 0;
    let token = ""
    it('/create user endpoint works well', async (): Promise<void> => {
        const user = {   
            "first_name" : "Abzo",
            "last_name" : "feraly",
            "password" : "123456"
        }
        const response = await request.post('/create').send(user);
        if (response){
            id = response.body.id;
            token = response.body.token;
        }
        // console.log("id is ",id, "token is ", token)
        expect(response.status).toBe(200);
    });

    it('/index user endpoint works well', async (): Promise<void> => {
        const response = await request.get('/index');
        expect(response.status).toBe(401);
    });

    it('/show user endpoint works well', async (): Promise<void> => {
        const response = await request.get(`/show/${id}`);
        expect(response.status).toBe(401);
    });

    it('/login user endpoint works well', async (): Promise<void> => {
        const user = {   
            "id" : `${id}`,
            "first_name" : "Abzo",
            "last_name" : "feraly",
            "password" : "123456"
        }
        const response = await request.post(`/login`).send(user);
        expect(response.status).toBe(200);
    });
});