import IProduct from "../model/product/product-model";
import { v4 } from 'uuid';

const products: IProduct[] = [
  {
    id: v4(),
    name: "First Product",
    details: {
      condition: "new"
    },
    quantity: 10,
    inStock: true,
    price: 899.99
  },
  {
    id: v4(),
    name: "Second Product",
    details: {
      condition: "used"
    },
    quantity: 5,
    inStock: true,
    price: 1200
  },
  {
    id: v4(),
    name: "Third Product",
    details: {
      condition: "new"
    },
    quantity: 0,
    inStock: false,
    price: 400
  }
]

export default products;