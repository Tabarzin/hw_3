import axios from 'axios';

const PRODUCTS_URL = 'https://api.escuelajs.co/api/v1/products';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];

  category: {
    id: number;
    name: string;
    // image: string;
    // creationAt: string;
    // updatedAt: string;
  };
}

async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(PRODUCTS_URL);

    const products: Product[] = response.data;

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export { getAllProducts };
