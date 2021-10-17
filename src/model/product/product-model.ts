export type IValidKey = keyof Omit<IProduct, 'id'>;

export default interface IProduct {
  /**
   * The id of the user who created this product
   */
  userId: string;
  id: string;
  name: string;
  details: { [key: string]: any };
  quantity: number;
  inStock: boolean;
  price: number;
}
