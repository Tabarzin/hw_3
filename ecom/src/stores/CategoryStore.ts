import { action, makeAutoObservable, runInAction } from 'mobx';

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

class CategoryStore {
  private products: Product[] = [];
  private filteredProducts: Product[] = [];
  private categories: { id: number; name: string }[] = [];

  constructor() {
    makeAutoObservable(this);
    runInAction(() => {
      this.fetchCategories();
    });
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

  private fetchCategories = action(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then((response) => response.json())
      .then(
        action((data) => {
          this.setCategories(data);
        }),
      )
      .catch((error) => console.error('Error fetching categories:', error));
  });

  private setCategories = action((data: { id: number; name: string }[]) => {
    this.categories = data;
  });
}

export const categoryStore = new CategoryStore();