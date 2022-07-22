import client from "../database";


interface product {
    product_id: string,
    quantity: number
}
export type Order = {
    id : number;
    user_id : string;
    products : product[]; //id:quantity
    status : string;
}

export class Orders {

    //return order id
    async create(o: Order): Promise<number>{
        try{
            //insert in orders table: user_id, status
            const conn = await client.connect()
            const sql = `INSERT into orders (user_id, status) Values (${o.user_id},'${o.status}') RETURNING id`
            const resultId = await conn.query(sql)

            console.log("order id is",resultId.oid)
            //loop through products array
            for(const i of o.products){
                //insert in orders_products table
                const sql2 = `insert into products_orders (id_order, id_product, quantity) Values (${resultId.oid},${i.product_id},${i.quantity});`
            }
            //return id of orders
            conn.release()
            return resultId.oid;
        } catch(err){
            throw new Error(`cannot insert ${err}`)
        }
    }

    //return all orders
    async index(): Promise<Order[]> {
        try {
            //join 2 tables and return all
          const conn = await client.connect()
          const sql = 'select id_order, id_product, name, price, category,quantity from products inner join products_orders on products.id = products_orders.id_product;'
          const result = await conn.query(sql)
          conn.release()
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    //return specific order of user id
    //takes user id and returns order of it
    async show(id: number): Promise<Order[]> {
        try {
        //join 4 tables on specific id
        const sql = `select u.first_name, u.last_name, po.id_order, p.id, p.name, p.price, p.category,po.quantity from products p inner join products_orders po on p.id = po.id_product Inner join orders o on o.id = po.id_order inner join users u on u.id = o.id where u.id = ${id};`
        const conn = await client.connect()
        const result = await conn.query(sql)
        conn.release()
        return result.rows
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }

    //delete order
    //takes order id
    async delete(id: number): Promise<boolean> {
        try {
            //remove row of id in orders and order tables
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const sql2 = 'DELETE FROM products_orders WHERE id_order=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const result2 = await conn.query(sql2, [id])
            conn.release()  
            return true
                } catch (err) {
                    throw new Error(`Could not delete order ${id}. Error: ${err}`)
                }
    }
}