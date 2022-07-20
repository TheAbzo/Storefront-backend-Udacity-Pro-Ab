import dotenv from 'dotenv'
import { Pool } from 'pg'


dotenv.config()
//create env file next
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV
   } = process.env

let client:Pool;

if(ENV === 'dev'){
   
    console.log("env is dev")
    client = new Pool({
        host: POSTGRES_HOST,
        port: 5432,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    })
}else{
    console.log("env is test")

    client = new Pool({
        host: POSTGRES_HOST,
        port: 5432,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DB
    })
}

export default client