import { v4 } from 'uuid';
import products from "../../data/products";
import IProduct from "../../model/product/product-model";

export default class ProductController {

  private static _FindIndexOfProduct(id: string) {
    return products.findIndex(product => product.id === id);
  }
  // get all products
  static getAllProducts():IProduct[]{
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
  static updateAProduct(id: string, updatedDetails: Partial<Omit<IProduct, 'id'>>): IProduct | null  {
  
    const indexOfProduct = ProductController._FindIndexOfProduct(id)
  
    if(indexOfProduct === -1) return null;
  
    products[indexOfProduct] = {
      ...products[indexOfProduct],
      ...updatedDetails
    }
  
    return products[indexOfProduct];
  }
  
  // delete a product
  static deleteProduct(id: string): boolean {
    const indexOfProduct = ProductController._FindIndexOfProduct(id);
    if(indexOfProduct === -1) return false;
    products.splice(indexOfProduct, 1);
    return true;
  }
}