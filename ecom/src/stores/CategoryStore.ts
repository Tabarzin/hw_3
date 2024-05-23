import axios from 'axios';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

interface Option {
  key: string;
  value: string;
}

class CategoryStore {
  private products: Product[] = [];
  private filteredProducts: Product[] = [];
  private categories: { id: number; name: string; image: string }[] = [];

  constructor() {
    makeAutoObservable(this);
    runInAction(() => {
      this.fetchCategories();
    });
  }

  @observable selectedCategoryIds: number[] = [];

  @action setSelectedCategoryIds(categoryIds: number[]) {
    this.selectedCategoryIds = categoryIds;
    this.filterProductsByCategory(categoryIds);
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.filteredProducts = products;
  }

  filterProductsByCategory = action((selectedCategoryIds: number[]) => {
    if (selectedCategoryIds.length === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product) => selectedCategoryIds.includes(product.category.id));
    }
  });

  get getFilteredProducts() {
    return this.filteredProducts;
  }

  get getCategories() {
    return this.categories;
  }

  @computed get getCategoryOptions(): Option[] {
    return this.categories.map((category) => ({
      key: category.id.toString(),
      value: category.name,
    }));
  }

  fetchCategories = action(async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      runInAction(() => {
        this.setCategories(response.data);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });

  private setCategories = action((data: { id: number; name: string; image: string }[]) => {
    this.categories = data.map(({ id, name, image }) => ({ id, name, image }));
  });
}

export const categoryStore = runInAction(() => new CategoryStore());
