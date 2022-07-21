import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import users_routes from './handlers/users_handler'
import products_routes from './handlers/products_handlers'

const app: express.Application = express()
const address: string = "0.0.0.0:3002"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3002, function () {
    console.log(`starting app on: ${address}`)
})

//see if u want a middleware for authentication/authorization token
//routes
users_routes(app)
products_routes(app)


export default app;
