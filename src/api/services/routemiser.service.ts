import {
  brandsType,
  Category,
  categoryType,
  productType,
  subCategory,
} from "../types/routemiser.type";

export async function allProducts(): Promise<productType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
      cache: "force-cache",
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getProductDetails(
  id: string,
): Promise<productType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}

export async function getCategories(): Promise<categoryType[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}

export async function detailsCategory(
  id: string,
): Promise<Category | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function GetAllSubCategories(): Promise<
  subCategory[] | undefined
> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getBrands(): Promise<brandsType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}
