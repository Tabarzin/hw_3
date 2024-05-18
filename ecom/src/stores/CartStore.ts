import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { Product } from '@api/api';

class CartStore {
  cartItems: Product[] = [];

  constructor() {
    makeAutoObservable(this, {
      cartItems: observable,
      addToCart: action.bound,
      removeFromCart: action.bound,
      cartTotal: computed,
      cartItemCount: computed,
    });
  }

  addToCart(product: Product) {
    const isInCart = this.cartItems.find((cartItem) => cartItem.id === product.id);
    if (isInCart) {
      return;
    } else {
      this.cartItems.push(product);
    }
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== id);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  get cartItemCount(): number {
    return this.cartItems.length;
  }
}

export const cartStore = new CartStore();
