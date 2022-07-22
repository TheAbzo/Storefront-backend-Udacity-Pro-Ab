import client from '../database';

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

export class Products {
    async create(p: Product): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO products (name, price,category) VALUES ('${p.name}', '${p.price}','${p.category}') RETURNING id, name, price, category`;
            const result = await conn.query(sql);
            conn.release();
            // console.log("Create products", result.rows)
            return result.rows;
        } catch (err) {
            throw new Error(`cannot insert ${err}`);
        }
    }

    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = `SELECT * FROM products WHERE id = ${id}`;
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            // console.log("in show products", result.rows[0])
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const sql2 = 'DELETE FROM products_orders WHERE id_product=($1)';
            const conn = await client.connect();
            await conn.query(sql2, [id]);
            await conn.query(sql, [id]);
            conn.release();
            return true;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
