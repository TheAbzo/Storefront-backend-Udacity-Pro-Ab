import { Products, Product } from "../models/products";

const user = new Products()

const productTest:Product = {
    "id":1,
    "name":"sony",
    "price":5,
    "category":"phone"
}

describe("Products Model", () => {
    
    //id to be set in index
    let id = 1

    it('Products: Create method test', async () => {
        const result = await user.create(productTest)
        console.log("products create", result)
        expect(result).toBeInstanceOf(Object);
    });

    it('Products: Index method test', async () => {
        const result = await user.index();
        console.log("products index first row" , result[0])
        id = result[0].id
        expect(result).toBeInstanceOf(Array);
    });

    it('Products: Show method test', async () => {
        const result = await user.show(id);
        console.log("products result in show", result)
        expect(result).toBeInstanceOf(Object);
    });

    it('Products: Delete method test', async () => {
        const result = await user.delete(1)
        expect(result).toBe(true);
    });
    
})
