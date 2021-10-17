import IProduct from "../model/product/product-model";
import ProductModel from "./models/product";

export default class ProductData {

  protected static async GetProduct(id: string){
    return await ProductModel.findById(id);
  }
  protected static async GetAllProducts(){
    const products = await ProductModel.find();
    return products;
  }

  protected static async AddProduct(product: Omit<IProduct, "id">){
    const dbProduct = new ProductModel(product);
    await dbProduct.save();
    return dbProduct as IProduct;
  }

  protected static async UpdateProduct(id: string, product: Omit<Partial<IProduct>, 'id'>){
    const dbProduct = await ProductModel.findById(id);
    if(!dbProduct) throw new Error("No product with id " + id);
    await ProductModel.findByIdAndUpdate(id, product);
  }

  protected static async DeleteProduct(productId: string){
    await ProductModel.findByIdAndDelete(productId)
  }
}