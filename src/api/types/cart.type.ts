import { productType } from "./routemiser.type";

export interface DataCart {
  cartOwner: string;
  createdAt: string;
  products: product[]; ///
  totalCartPrice: number;
  updatedAt: string;
  _id: string;
}

export interface product {
  count: number;
  price: number;
  _id: string;
  product: productType;
}
