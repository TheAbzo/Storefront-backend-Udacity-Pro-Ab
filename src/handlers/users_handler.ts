import express, {Request,Response} from 'express'
import { Users, User } from '../models/users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

const store =  new Users();
dotenv.config()
//create env file next
const {
    TOKEN_SECRET
   } = process.env


//return token on creating new user
const create = async (req:Request, res:Response) =>{
    try {
        const user:User = {
            "id":1,
            "first_name":`${req.body.first_name}`,
            "last_name":`${req.body.last_name}`,
            "password":`${req.body.password}`
        }
         //after it creates user with hashing, we create jwt token and send it back to frontend
         console.log("uhm")
         console.log(user)
    const theUser = await store.create(user);
    console.log("succ", theUser)
    let token = jwt.sign(theUser,(process.env.TOKEN_SECRET) as jwt.Secret) //takes 2 args, info we want to store, a string to sign token with(secret)
    console.log("token",token)
    res.json(token)
    } catch(err){
        console.log("here")
        res.status(400)
        res.json(err)
    }
}

//index
const index = async (req:Request, res:Response) => {

    try {
        const authorizationHeader = req.headers.authorization
        if(authorizationHeader != undefined){
            const token = authorizationHeader.split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as string)
        }
        
    } catch(error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
    const users = await store.index();
    res.json(users);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

//show

//authenticate calls athenticate(hashing) 
//returns a token on authnticating an existing user
const authenticate = async (req: Request, res: Response) => {
    const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.id, user.password)
        let token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }


//all my routes
const users_routes = (app:express.Application) => {
    app.post('/create', create)
    app.get('/index', index)
    app.post('/login', authenticate)
    //show
}

export default users_routes;