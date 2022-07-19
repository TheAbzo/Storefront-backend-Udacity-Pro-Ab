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
            
            //make sure to close connection
            conn.release()
  
            console.log("result id",result.rows[0])
            return result.rows[0];
        } catch(err){
            throw new Error(`cannot insert ${err}`)
        }

        
    }

    async index(): Promise<User[]> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'SELECT * FROM users'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
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