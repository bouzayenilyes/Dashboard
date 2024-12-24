export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryIds: string[];
  characteristics: {
    size?: string;
    color?: string;
    weight?: string;
    [key: string]: string | undefined;
  };
  lowStockThreshold: number;
}

export interface StockAlert {
  productId: string;
  currentStock: number;
  threshold: number;
}