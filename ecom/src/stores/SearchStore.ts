import { makeAutoObservable, computed } from 'mobx';
import productStore from './ProductStore';

class SearchStore {
  searchTerm = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  get filteredProducts() {
    return computed(() =>
      productStore.products.filter((product) => product.title.toLowerCase().includes(this.searchTerm.toLowerCase())),
    ).get();
  }
}

export const searchStore = new SearchStore();
