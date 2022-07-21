import express, {Request,Response} from 'express'
import { Products, Product } from '../models/products'
import verifyAuthToken from '../middleware/authentication';

const store =  new Products();


//needs user token
const create = async (req:Request, res:Response) =>{
    console.log("entered create")
    try {
        const product:Product = {
            "id":1,
            "name":`${req.body.name}`,
            "price": req.body.price,
            "category":`${req.body.category}`
        }
         //after it creates user with hashing, we create jwt token and send it back to frontend
        const theProduct = await store.create(product);
        console.log("type",theProduct[0].id)
        // res.json(token).send(`id is ${theUser[0].id}`)
        res.status(200).json({"id":theProduct[0].id});
    } catch(err){
        res.status(400)
        res.json(err)
    }
}

//index
const index = async (req:Request, res:Response) => {
    console.log("entered product index")
    try {
    const products = await store.index();
    res.json(products);
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

//show
const show = async (req:Request, res:Response) => {
    console.log("entered products show")
    try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

//all my routes
const users_routes = (app:express.Application) => {
    app.post('products/create', verifyAuthToken, create)
    app.get('products/index',index)
    app.get('products/show/:id',show)
}

export default users_routes;