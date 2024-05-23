import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { Product } from '@api/api';

class CartItem {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number = 1) {
    this.product = product;
    this.quantity = quantity;
    makeAutoObservable(this);
  }
}

class CartStore {
  cartItems: CartItem[] = [];

  constructor() {
    makeAutoObservable(this, {
      cartItems: observable,
      addToCart: action.bound,
      removeFromCart: action.bound,
      increaseQuantity: action.bound,
      decreaseQuantity: action.bound,
      cartTotal: computed,
      cartItemCount: computed,
    });
    this.loadCartItems();
  }

  addToCart(product: Product, quantity: number = 1) {
    const existingItem = this.cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push(new CartItem(product, quantity));
    }

    this.saveCartItems();
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.product.id !== id);
    this.saveCartItems();
  }

  increaseQuantity(id: number) {
    const item = this.cartItems.find((item) => item.product.id === id);
    if (item) {
      item.quantity++;
    }
    this.saveCartItems();
  }

  decreaseQuantity(id: number) {
    const item = this.cartItems.find((item) => item.product.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
    this.saveCartItems();
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get cartItemCount(): number {
    return this.cartItems.length;
  }

  saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  loadCartItems() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems).map(
        (item: { product: Product; quantity: number }) => new CartItem(item.product, item.quantity),
      );
    }
  }
}

export const cartStore = new CartStore();
