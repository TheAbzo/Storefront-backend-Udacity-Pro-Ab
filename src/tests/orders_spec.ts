import { Orders, Order } from "../models/orders";
import { Products, Product } from "../models/products";
import { Users, User } from "../models/users";



const order = new Orders()
const user = new Users()
const product = new Products()

const orderTest:Order = {
    "id":1, //generated
    "products":[{product_id: 1, quantity:9 }, {product_id: 2, quantity:6 } ],
    "user_id": 1, //to be defined inside
    "status":"active"
}

const userTest:User = {
    "id":1, //dummy id
    "first_name":"bassant",
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

describe("Orders Model", () => {
    
    let useId = 0;
    let orderId = 0;
    //create 1 user, 2 products and initialize these 2
    
    it('Orders: Create method test', async () => {

        const result0 = await product.create(productTest1)
        const result1 = await product.create(productTest2)
        const result2 = await user.create(userTest)
        useId = result2[0].id;
        orderTest.user_id = useId
        const result = await order.create(orderTest)
        orderId = result;
        expect(result).toBeInstanceOf(Number);
    });

    it('Orders: Index method test', async () => {
        const result = await order.index();
        expect(result).toBeInstanceOf(Array);
    });

    it('Orders: Show method test', async () => {
        const result = await order.show(useId);
        expect(result).toBeInstanceOf(Object);
    });

    it('Orders: Delete method test', async () => {
        const result = await order.delete(orderId)
        expect(result).toBe(true);
    });
    
})
