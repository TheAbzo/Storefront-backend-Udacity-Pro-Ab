# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- [POST] /products_create       
            - creates new product [bearer token required]
                - ex: `{   
                         "name" : "xiaomi",
                         "price" : 50,
                         "category" : "phones"
                         }`
- [GET] /products_index          
            - shows all products
- [GET] /products_show/:id       
            - shows the specific id 



#### Users
- [POST] /create        
            - creates a user, takes in a json without id, and returns Token and the generated serial id.
                - ex: `{   
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

#### Orders
- [POST] /orders/:id            
            - show current Order by user (args: user id)[bearer token required]


## Data Shapes
#### Product
![](schema/products.png)

- id is primary serial key
#### User
![](schema/users.png)

- id is primary serial key
#### Orders
![](schema/orders.png)

- id is primary serial key
#### Products_orders
![](schema/products_orders.png)

- it has 2 foreign keys on orders and products tables.


