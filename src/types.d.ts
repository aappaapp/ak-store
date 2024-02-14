export interface Image {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: Image[];
}

export interface User {
  id: string;
  isAdmin?: boolean;
  cart: CartItem[];
}

export interface CartItem {
  id: string;
  attributes: Record<string, any>;
}
