# Storefront Backend Project

## Installation

- clone this repo and run `npm install` in your terminal at the project root.
- make sure that postgres is running on port 5432 (backend runs on port 3002)
- run these 2 commands in the psql:
-       -   `CREATE DATABASE store_front;`
        -   `CREATE DATABASE store_front_test;`

## env file
your env file must have something like this:
- POSTGRES_HOST = localhost
- POSTGRES_DB = store_front
- POSTGRES_USER = postgres
- POSTGRES_TEST_DB = store_front_test
- POSTGRES_PASSWORD = <YOUR PASSWORD HERE>
- POSTGRES_PORT = 5432
- BCRYPT_PASSWORD = speak-friend-Abzo
- SALT_ROUNDS = 10
- TOKEN_SECRET = secret
- ENV = dev

## scripts
- dev : it migrates up all the tables and runs the server
- test: it runs all the tests
- format: uses prettier to format
- lint: uses eslint

## Routes
### User Routes
- [POST] /create        
        - creates a user, takes in a json without id, and returns Token and the generated serial id.
                  -        ex: `{   
                                "first_name" : "hi",
                                "last_name" : "feraly",
                                "password" : "123456"
                           }`
- [POST] /login         
        - takes in all the info of the user including the serial id, and returns a jwt token. (if info invalid, then unauthorized)
- [GET] /index          
        - shows all users [bearer token required]
- [GET] /show/:id       
        - show user of this id [bearer token required]


### Products Routes
- [POST] /products_create       
        - creates new product [bearer token required]
          -            ex: `{   
                            "name" : "xiaomi",
                            "price" : 50,
                            "category" : "phones"
                         }`
- [GET] /products_index          
        - shows all products
- [GET] /products_show/:id       
        - shows the specific id 

### Order Routes
- [POST] /orders/:id            
        - show current Order by user (args: user id)[bearer token required]

## Schema
- [Table]users:
        -[Data: id(serial), first_name, last_name, password]
- [Table]products: 
        -[Data: id(serial), name, price, category]
- [Table]orders: 
        -[Data: id(serial), user_id, status]
- [Table]products_orders: 
        -[Data: id_order(foreign key), id_product(foreign key), quantity]





