import { create } from 'zustand';
import { Category, Product, StockAlert } from '../types';

interface Store {
  categories: Category[];
  products: Product[];
  alerts: StockAlert[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, quantity: number) => void;
}

export const useStore = create<Store>((set) => ({
  categories: [],
  products: [],
  alerts: [],
  
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
    
  updateCategory: (id, category) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...category } : c
      ),
    })),
    
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
    
  addProduct: (product) =>
    set((state) => {
      const newProducts = [...state.products, product];
      const newAlerts = checkLowStock(newProducts);
      return { products: newProducts, alerts: newAlerts };
    }),
    
  updateProduct: (id, product) =>
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === id ? { ...p, ...product } : p
      );
      const newAlerts = checkLowStock(newProducts);
      return { products: newProducts, alerts: newAlerts };
    }),
    
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      alerts: state.alerts.filter((a) => a.productId !== id),
    })),
    
  updateStock: (productId, quantity) =>
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + quantity } : p
      );
      const newAlerts = checkLowStock(newProducts);
      return { products: newProducts, alerts: newAlerts };
    }),
}));

function checkLowStock(products: Product[]): StockAlert[] {
  return products
    .filter((p) => p.stock <= p.lowStockThreshold)
    .map((p) => ({
      productId: p.id,
      currentStock: p.stock,
      threshold: p.lowStockThreshold,
    }));
}