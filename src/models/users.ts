import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


export type User = {
    id : Number;
    first_name : string;
    last_name : string;
    username : string //use username as hashed password
}

dotenv.config()
//create env file next
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS
   } = process.env

   const pepper:string = (BCRYPT_PASSWORD) as string
   const saltRounds:string = (SALT_ROUNDS) as string

export class Users {
    async create(u: User): Promise<User[]>{
        try{
            const conn = await client.connect()
            console.log("pepper",pepper)
            const hash = bcrypt.hashSync(u.username + pepper, parseInt(saltRounds))
            //u shouldnt hardcode this sql query, take it from User.id better
            const sql = `INSERT INTO USERS (ID, first_name, last_name,username) VALUES (14, 'Abdel', 'rahman','${hash}')`
            const result = await conn.query(sql)
            
            //make sure to close connection
            conn.release()
  
            return result.rows
        } catch(err){
            throw new Error(`cannot insert ${err}`)
        }
    }

    async authenticate(id:number, password:string): Promise<User | null>{
        const conn = await client.connect()
        const sql = `select * from users where id = $1`

        const result = await conn.query(sql, [5])
        console.log(password + pepper)

        //if id(user) exists
        if(result.rows.length){
            const user = result.rows[0]
            console.log("user aaaaa",user)
            console.log("username aaaaa",user.username)

            //compare passwords
            if(bcrypt.compareSync(password+pepper, user.username)){
                console.log("ssss")
                //im selecting id only
                return result.rows[0]
            }
        }
        console.log('sasdsa')
        return null
    }
}