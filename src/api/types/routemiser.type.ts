export interface productType {
  sold: number;
  images: string[];
  subcategory: [[object]];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: categoryType;
  brand: bransType;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
}

export interface categoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAd: string;
  updatedAd: string;
}
interface bransType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface Category {
  name: string;
}

export interface subCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface brandsType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
