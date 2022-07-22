import express, {Request,Response} from 'express'
import { Orders, Order } from '../models/orders'
import {authorizationToken} from '../middleware/authentication';

const store =  new Orders();

console.log("in orders handlers")

//show
const show = async (req:Request, res:Response) => {
    console.log("entered order show")
    try {
    const order = await store.show(parseInt(req.params.id));
    res.status(200).json(order);
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

//my product routes
const order_routes = (app:express.Application) => {
    app.post('/orders/:id',authorizationToken, show)
}

export default order_routes;