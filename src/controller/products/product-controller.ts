import { v4 } from 'uuid';
import products from "../../data/products";
import IProduct from "../../model/product/product-model";
import IUser from '../../model/product/user-model';

export default class ProductController {

  private static _FindIndexOfProduct(id: string) {
    return products.findIndex(product => product.id === id);
  }
  // get all products
  static getAllProducts(query: { [key: string]: any }):IProduct[]{
    if(query.userId){
      return products.filter(prod => prod.userId === query.userId);
    }
    return products
  }
  
  // get a product
  static getProduct(id: string): IProduct | null {
    const product = products.find(product => product.id === id);
    return product ? product : null;
  }

  static AddAProduct(newProduct: Omit<IProduct, 'id'>): string {
    products.push({
      ...newProduct,
      id: v4()
    })
    return '/api/products/'+ products[products.length - 1].id;
  }
  
  // update a product
  static updateAProduct(id: string, updatedDetails: Partial<Omit<IProduct, 'id'>>, currentUser: IUser): IProduct | null  {
  
    const indexOfProduct = ProductController._FindIndexOfProduct(id)
  
    if(indexOfProduct === -1) return null;
    if(products[indexOfProduct].userId !== currentUser.id){ return null }
    products[indexOfProduct] = {
      ...products[indexOfProduct],
      ...updatedDetails
    }
  
    return products[indexOfProduct];
  }
  
  // delete a product
  static deleteProduct(id: string, currentUser: IUser): boolean {
    const indexOfProduct = ProductController._FindIndexOfProduct(id);
    if(indexOfProduct === -1) return false;
    if(products[indexOfProduct].userId !== currentUser.id) return false;
    products.splice(indexOfProduct, 1);
    return true;
  }
}