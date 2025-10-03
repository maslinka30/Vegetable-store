import { useState, useEffect } from 'react';
import { type Product } from '../types';

interface ApiProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data: ApiProduct[] = await response.json();
        
        const formattedProducts: Product[] = data.map(item => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          category: item.category,
          image: item.image
        }));
        
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}