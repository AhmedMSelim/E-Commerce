import { productType } from "./routemiser.type";

export interface OrderCardProps {
  createdAt: string;
  id: number;
  totalOrderPrice: number;
  _id: string;
  shippingAddress: shippingaddress;
  cartItems: cartitems[];
}
interface shippingaddress {
  city: string;
  details: string;
  phone: string;
}
interface cartitems {
  count: number;
  price: number;
  product: productType;
  _id: string;
}
