// enums

export enum ProductCategoryEnum {
  electronics = "electronics",
  jewelery = "jewelery",
  mensclothing = "men's clothing",
  womensclothing = "women's clothing",
}

export enum SizesEnum {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  DXL = "2XL",
}

//   interfaces

export interface Product {
  category: ProductCategoryEnum;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  count: number;
  rate: number;
  title: string;
}

export interface Size {
  id: number;
  size: SizesEnum;
}

export interface Cart extends Product {
  size: Size;
  quantity: number;
  totalPrice: number;
}
