import { Products, Product } from '../models/products';

const product = new Products();

const productTest: Product = {
    id: 1,
    name: 'sony',
    price: 5,
    category: 'phone'
};

describe('Products Model', () => {
    //id to be set in index
    let id = 1;

    it('Products: Create method test', async () => {
        const result = await product.create(productTest);
        // console.log("products create", result)
        expect(result).toBeInstanceOf(Object);
    });

    it('Products: Index method test', async () => {
        const result = await product.index();
        // console.log("products index first row" , result[0])
        id = result[0].id;
        expect(result).toBeInstanceOf(Array);
    });

    it('Products: Show method test', async () => {
        const result = await product.show(id);
        // console.log("products result in show", result)
        expect(result).toBeInstanceOf(Object);
    });

    it('Products: Delete method test', async () => {
        const result = await product.delete(1);
        expect(result).toBe(true);
    });
});
