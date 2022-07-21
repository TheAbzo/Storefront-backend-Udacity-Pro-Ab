import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


export type User = {
    id : number;
    first_name : string;
    last_name : string;
    password : string
}

dotenv.config()

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
   } = process.env

const pepper:string = (BCRYPT_PASSWORD) as string
const saltRounds:string = (SALT_ROUNDS) as string

export class Users {
    async create(u: User): Promise<User[]>{
        try{
            const conn = await client.connect()
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))      
            const sql = `INSERT INTO users (first_name, last_name,password) VALUES ('${u.first_name}', '${u.last_name}','${hash}') RETURNING id, first_name, last_name`
            const result = await conn.query(sql)
            conn.release()
            console.log("Create", result.rows)
            return result.rows;
        } catch(err){
            throw new Error(`cannot insert ${err}`)
        }
    }

    async index(): Promise<User[]> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT * FROM users'
          const result = await conn.query(sql)
          conn.release()
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: number): Promise<User> {
        try {
        const sql = `SELECT * FROM users WHERE id = ${id}`
        const conn = await client.connect()
        const result = await conn.query(sql)
        conn.release()
        console.log("in show", result.rows[0])
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }

    async delete(id: number): Promise<boolean> {
        try {
        const sql = 'DELETE FROM users WHERE id=($1)'
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        const book = result.rows[0]  
        conn.release()  
        return true
            } catch (err) {
                throw new Error(`Could not delete book ${id}. Error: ${err}`)
                return false
            }
    }

    async authenticate(id:number, password:string): Promise<User | null>{
        const conn = await client.connect()
        const sql = `select * from users where id = $1`

        const result = await conn.query(sql, [id])
        console.log(password + pepper)

        //if id(user) exists
        if(result.rows.length){
            const user = result.rows[0]

            //compare passwords
            if(bcrypt.compareSync(password+pepper, user.password)){
                console.log("ssss")
                
                //im selecting id only
                return result.rows[0]
            }
        }
        return null
    }
}