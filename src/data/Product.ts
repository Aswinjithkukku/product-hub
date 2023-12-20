// enums

export enum ProductCategoryEnum {
  electronics = "electronics",
  jewelery = "jewelery",
  mensclothing = "men's clothing",
  womensclothing = "women's clothing",
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
