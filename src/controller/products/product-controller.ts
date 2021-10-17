import ProductData from "../../data/products";
import IProduct from "../../model/product/product-model";
import IUser from '../../model/user/user-model';

export default class ProductController extends ProductData {
  static get products(){
    return ProductController.GetAllProducts()
  }

  // get all products
  static async getAllProducts(query: { [key: string]: any }):Promise<IProduct[]>{
    const products = await ProductController.products;
    return products as IProduct[];
  }
  
  // get a product
  static async getProduct(id: string): Promise<IProduct | null> {
    return await ProductController.GetProduct(id);
  }

  static async AddAProduct(newProduct: Omit<IProduct, 'id'>): Promise<string> {
    const product = await ProductController.AddProduct(newProduct)
    return '/api/products/'+ product.id;
  }
  
  // update a product
  static async updateAProduct(id: string, updatedDetails: Partial<Omit<IProduct, 'id'>>, currentUser: IUser): Promise<IProduct | null> {
  
    const product = await ProductController.GetProduct(id)

    if(!product) return null;
    if(product.userId.toString() !== currentUser.id){ return null }
    
    await ProductController.UpdateProduct(id, updatedDetails);
    return await ProductController.GetProduct(id) as IProduct;
  }
  
  // delete a product
  static async deleteProduct(id: string, currentUser: IUser): Promise<boolean> {
    const product = await ProductController.GetProduct(id);
    if(!product) return false;
    if(product.userId.toString() !== currentUser.id) return false;
    await ProductController.DeleteProduct(id);
    return true;
  }
}