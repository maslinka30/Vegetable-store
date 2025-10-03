export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity?: number;
  total?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}