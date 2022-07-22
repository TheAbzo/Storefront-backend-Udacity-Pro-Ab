import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import users_routes from './handlers/users_handler';
import products_routes from './handlers/products_handlers';
import order_routes from './handlers/orders_handlers';
import cors from 'cors';

const app: express.Application = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(3002, function () {
    // console.log(`starting app on: ${address}`);
});

//routes
users_routes(app);
products_routes(app);
order_routes(app);

export default app;
