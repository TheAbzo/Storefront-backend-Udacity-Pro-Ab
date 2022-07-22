/* Replace with your SQL commands */
CREATE TABLE products_orders (id_order bigint REFERENCES orders(id), id_product bigint REFERENCES products(id),quantity integer );
