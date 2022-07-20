import { Users, User } from "../models/users";

const user = new Users()

const userTest:User = {
    "id":1,
    "first_name":"Abzo",
    "last_name":"The Abzo",
    "password":"123"
}

describe("Users Model", () => {
    
    it('Create method test', async () => {
        const result = await user.create(userTest)
        console.log("result in create", result)
        expect(result).toBeInstanceOf(Object);
    });

    it('Index method test', async () => {
        const result = await user.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Show method test', async () => {
        const result = await user.show(1);
        console.log("result in show", result)
        expect(result).toBeInstanceOf(Object);
    });

    it('Delete method test', async () => {
        const result = await user.delete(1)
        expect(result).toBe(true);
    });
    
})
