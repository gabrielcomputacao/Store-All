export interface Product {
  id?: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
export interface ProductForm {
  id?: string;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  [key: `image${number}`]: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
