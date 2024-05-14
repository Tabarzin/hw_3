import { Product } from '@api/api';
import { makeAutoObservable, computed, action, runInAction } from 'mobx';
import productStore from '@stores/ProductStore';

class SearchStore {
  searchTerm = '';
  selectedCategoryIds: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSearchTerm(term: string) {
    runInAction(() => {
      this.searchTerm = term;
      console.log(this.searchTerm);
    });
  }

  filterByCategories(categoryIds: number[]) {
    this.selectedCategoryIds = categoryIds;
  }

  get filteredProducts() {
    const filterBySearch = (product: Product) => product.title.toLowerCase().includes(this.searchTerm.toLowerCase());

    const filterByCategories = (product: Product) =>
      this.selectedCategoryIds.length === 0 || this.selectedCategoryIds.includes(product.category.id);

    return computed(() => productStore.products.filter(filterBySearch).filter(filterByCategories)).get();
  }
}

export const searchStore = new SearchStore();
