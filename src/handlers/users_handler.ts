import express, {Request,Response} from 'express'
import { Users, User } from '../models/users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {verifyAuthToken} from '../middleware/authentication';

const store =  new Users();
dotenv.config()
//create env file next
const {
    TOKEN_SECRET
   } = process.env


console.log("in users handlers")
//return token on creating new user with his id in database
const create = async (req:Request, res:Response) =>{
    console.log("entered create")
    try {
        const user:User = {
            "id":1,
            "first_name":`${req.body.first_name}`,
            "last_name":`${req.body.last_name}`,
            "password":`${req.body.password}`
        }
         //after it creates user with hashing, we create jwt token and send it back to frontend
    const theUser = await store.create(user);
    console.log("type",theUser[0].id)
    let token = jwt.sign(theUser[0],(process.env.TOKEN_SECRET) as jwt.Secret) //takes 2 args, info we want to store, a string to sign token with(secret)
    // res.json(token).send(`id is ${theUser[0].id}`)
    res.status(200).json({"token":token, "id":theUser[0].id});
    } catch(err){
        res.status(400)
        res.json(err)
    }
}

//index
const index = async (req:Request, res:Response) => {
    console.log("entered index")
    try {
    const users = await store.index();
    res.json(users);
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

//show
const show = async (req:Request, res:Response) => {
    console.log("entered index")
    try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

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
        res.status(401).send("Error 401: Unauthorized")
        // res.json({ error })
    }
  }


//my user routes
const users_routes = (app:express.Application) => {
    app.post('/create', create)
    app.get('/index', verifyAuthToken,index)
    app.get('/show/:id', verifyAuthToken,show)
    app.post('/login', authenticate)
}

export default users_routes;