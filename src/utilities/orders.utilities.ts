import { Products } from "../models/products";
import { Users } from "../models/users";

const productStore =  new Products();
const userStore =  new Users();

//boolean function to check of products id array exists in products table
export const checkProductId = async (id:number[]) :Promise<boolean> => {
    try {

        const products = await productStore.index();
        console.log(products)
        return true

    } catch (error) {
        return false
    }
}


//boolean function to check of user id exists
export const checkUserId = async (id:number) :Promise<boolean> => {
    try {
        const user = await userStore.show(id);
        if(user)
          return true
        else 
          return false

    } catch (error) {
        return false
    }
}
