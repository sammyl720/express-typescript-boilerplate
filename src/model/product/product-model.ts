export type IValidKey = keyof Omit<IProduct, 'id'>;

export default interface IProduct {
  id: string;
  name: string;
  details: { [key: string]: any };
  quantity: number;
  inStock: boolean;
  price: number;
}
