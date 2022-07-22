# Storefront Backend Project

## Installation

- clone this repo and run `npm install` in your terminal at the project root.
- make sure that postgres is running on port 5432 (backend runs on port 3002)
- run these 2 commands in the psql 
-- `CREATE DATABASE store_front;`
-- `CREATE DATABASE store_front_test;`

## env file
your env file must have something like this:
POSTGRES_HOST = localhost
POSTGRES_DB = store_front
POSTGRES_USER = postgres
POSTGRES_TEST_DB = store_front_test
POSTGRES_PASSWORD = <YOUR PASSWORD HERE>
POSTGRES_PORT = 5432
BCRYPT_PASSWORD = speak-friend-Abzo
SALT_ROUNDS = 10
TOKEN_SECRET = secret
ENV = dev

## scripts
- dev : it migrates up all the tables and runs the server
- test: it runs all the tests
- format: uses prettier to format
- lint: uses eslint

## Routes
### User Routes
- post /create   :creates a user, takes in a json without id, and returns Token and the generated serial id.
-- ex: {   
        "first_name" : "hi",
        "last_name" : "feraly",
        "password" : "123456"
       }
- post /login    :takes in all the info of the user including the serial id, and returns a jwt token. (if info invalid, then unauthorized)
- get /index     :shows all users, takes a bearer jwt token
- get /show/:id  :show user of this id, takes a bearer jwt token


### Products Routes
- post /products_create :creates new product, needs a bearer jwt token
- get /products_index :shows all products
- get /products_show/:id :shows the specific id 

### Order Routes


## Routes

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 





