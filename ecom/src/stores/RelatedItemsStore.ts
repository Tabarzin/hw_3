import { action, makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosResponse } from 'axios';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
}

class RelatedItemsStore {
  relatedProducts: Product[] = [];
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {
      fetchRelatedProducts: action.bound,
      setRelatedProducts: action.bound,
      setLoading: action.bound,
      setError: action.bound,
    });
  }

  setRelatedProducts = (products: Product[]) => {
    this.relatedProducts = products;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setError = (error: Error | null) => {
    this.error = error;
  };

  fetchRelatedProducts = async (categoryId: number) => {
    this.setLoading(true);
    this.setError(null);

    try {
      const categoryResponse: AxiosResponse<Category[]> = await axios.get<Category[]>(
        'https://api.escuelajs.co/api/v1/categories',
      );
      const category = categoryResponse.data.find((category: Category) => category.id === categoryId);

      if (category) {
        const productsResponse: AxiosResponse<Product[]> = await axios.get<Product[]>(
          'https://api.escuelajs.co/api/v1/products',
        );
        const filteredProducts = productsResponse.data.filter(
          (product: Product) => product.category.name === category.name,
        );
        const firstThreeProducts = filteredProducts.slice(0, 3);

        runInAction(() => {
          this.setRelatedProducts(firstThreeProducts);
        });
      } else {
        runInAction(() => {
          this.setError(new Error('Category not found'));
        });
      }
    } catch (error) {
      runInAction(() => {
        this.setError(error as Error);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };
}

const relatedItemsStore = new RelatedItemsStore();
export default relatedItemsStore;
