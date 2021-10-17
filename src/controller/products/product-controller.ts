import { v4 } from 'uuid';
import ProductData from "../../data/products";
import IProduct from "../../model/product/product-model";
import IUser from '../../model/user/user-model';

export default class ProductController extends ProductData {
  static get products(){
    return ProductController.GetAllProducts()
  } 
  private static _FindIndexOfProduct(id: string) {
    return ProductController.products.findIndex(product => product.id === id);
  }
  // get all products
  static getAllProducts(query: { [key: string]: any }):IProduct[]{
    if(query.userId){
      return ProductController.products.filter(prod => prod.userId === query.userId);
    }
    return ProductController.products;
  }
  
  // get a product
  static getProduct(id: string): IProduct | null {
    const product = ProductController.products.find(product => product.id === id);
    return product ? product : null;
  }

  static AddAProduct(newProduct: Omit<IProduct, 'id'>): string {
    const product: IProduct = {
      ...newProduct,
      id: v4()
    }
    ProductController.AddProduct(product)
    return '/api/products/'+ product.id;
  }
  
  // update a product
  static updateAProduct(id: string, updatedDetails: Partial<Omit<IProduct, 'id'>>, currentUser: IUser): IProduct | null  {
  
    const indexOfProduct = ProductController._FindIndexOfProduct(id)
    if(indexOfProduct === -1) return null;
    if(ProductController.products[indexOfProduct].userId !== currentUser.id){ return null }
    const product: IProduct = {
      ...ProductController.products[indexOfProduct],
      ...updatedDetails
    }
    
    ProductController.UpdateProduct(product)
    return product;
  }
  
  // delete a product
  static deleteProduct(id: string, currentUser: IUser): boolean {
    const indexOfProduct = ProductController._FindIndexOfProduct(id);
    if(indexOfProduct === -1) return false;
    if(ProductController.products[indexOfProduct].userId !== currentUser.id) return false;
    ProductController.DeleteProduct(id);
    return true;
  }
}