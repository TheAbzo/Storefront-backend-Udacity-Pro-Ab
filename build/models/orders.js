"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const database_1 = __importDefault(require("../database"));
class Orders {
    //return order id
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //insert in orders table: user_id, status
                const conn = yield database_1.default.connect();
                const sql = `INSERT into orders (user_id, status) Values (${o.user_id},'${o.status}') RETURNING id`;
                const resultId = yield conn.query(sql);
                console.log("order id is", resultId.rows[0].id);
                //loop through products array
                for (const i of o.products) {
                    //insert in orders_products table
                    const sql2 = `insert into products_orders (id_order, id_product, quantity) Values (${resultId.rows[0].id},${i.product_id},${i.quantity});`;
                    yield conn.query(sql2);
                }
                //return id of orders
                conn.release();
                return resultId.rows[0].id;
            }
            catch (err) {
                throw new Error(`cannot insert ${err}`);
            }
        });
    }
    //return all orders
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //join 2 tables and return all
                const conn = yield database_1.default.connect();
                const sql = 'select id_order, id_product,quantity, user_id, status from products full outer join products_orders on products.id = products_orders.id_product inner join orders on products_orders.id_order = orders.id';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    //return specific order of user id
    //takes user id and returns order of it
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //join 4 tables on specific id
                const sql = `select id_order, id_product,quantity, user_id, status from products full outer join products_orders on products.id = products_orders.id_product inner join orders on products_orders.id_order = orders.id where orders.user_id = ${id}`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    //delete order
    //takes order id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //remove row of id in orders and order tables
                const sql = 'DELETE FROM orders WHERE id=($1)';
                const sql2 = 'DELETE FROM products_orders WHERE id_order=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const result2 = yield conn.query(sql2, [id]);
                conn.release();
                return true;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${err}`);
            }
        });
    }
}
exports.Orders = Orders;
