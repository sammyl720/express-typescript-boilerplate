import IProduct from "../model/product/product-model";
import fs from 'fs';
import path from "path";

export default class ProductData {
  private static _filePath = path.resolve(__dirname, 'products-data.json');

  private static UpdateProductList(products: IProduct[]){
    fs.writeFileSync(ProductData._filePath, JSON.stringify(products));
  }
  protected static GetAllProducts(){
    const jsonProducts = fs.readFileSync(ProductData._filePath, 'utf-8');
    return JSON.parse(jsonProducts) as IProduct[];
  }

  protected static AddProduct(product: IProduct){
    const products = ProductData.GetAllProducts();
    products.push(product);
    fs.writeFileSync(ProductData._filePath, JSON.stringify(products));
  }

  protected static UpdateProduct(product: IProduct){
    const products = ProductData.GetAllProducts();
    const indexOfProduct = products.findIndex(prod => prod.id === product.id);
    if(indexOfProduct === -1) throw new Error("No product with id " + product.id);
    products[indexOfProduct] = product;
    ProductData.UpdateProductList(products);
  }

  protected static DeleteProduct(productId: string){
    const products = ProductData.GetAllProducts();
    const indexOfProduct = products.findIndex(prod => prod.id === productId);
    if(indexOfProduct === -1) throw new Error("No product with id " + productId);
    products.splice(indexOfProduct, 1);
    ProductData.UpdateProductList(products);
  }
}