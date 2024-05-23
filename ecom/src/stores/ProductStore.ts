import { action, makeAutoObservable, runInAction } from 'mobx';
import { getAllProducts, Product } from '@api/api';

class ProductStore {
  products: Product[] = [];
  hasMore = true;

  constructor() {
    makeAutoObservable(this, { fetchProducts: action.bound, normalizeImageUrl: action.bound });
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();

      runInAction(() => {
        this.products = [...this.products, ...fetchedProducts];

        this.hasMore = fetchedProducts.length > 0;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  normalizeImageUrl = (imageUrl: string): string => {
    if (imageUrl.startsWith('["') && imageUrl.endsWith('"]')) {
      let extractedUrl = imageUrl.substring(2, imageUrl.length - 2);

      if (extractedUrl.startsWith('"') && extractedUrl.endsWith('"')) {
        extractedUrl = extractedUrl.substring(1, extractedUrl.length - 1);
      }
      return extractedUrl;
    } else if (imageUrl.startsWith('["') && imageUrl.endsWith('"')) {
      let extractedUrl = imageUrl.substring(2, imageUrl.length - 1);
      return extractedUrl;
    }
    return imageUrl;
  };
}

const productStore = new ProductStore();
export default productStore;
