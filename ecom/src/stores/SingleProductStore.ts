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

class ProductStore {
  product: Product | null = null;
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {
      fetchProduct: action.bound,
      setProduct: action.bound,
      setLoading: action.bound,
      setError: action.bound,
    });
  }

  setProduct = (product: Product | null) => {
    this.product = product;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setError = (error: Error | null) => {
    this.error = error;
  };

  fetchProduct = async (id: string) => {
    this.setLoading(true);
    this.setError(null);

    try {
      const response: AxiosResponse<Product> = await axios.get<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );

      runInAction(() => {
        this.setProduct(response.data);
      });
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

// const singleProductStore = new ProductStore();
// export default singleProductStore;

// import { action, makeAutoObservable, runInAction } from 'mobx';
// import axios, { AxiosResponse } from 'axios';

// interface Category {
//   id: number;
//   name: string;
// }

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   category: Category;
//   images: string[];
// }

// class ProductStore {
//   product: Product | null = null;
//   loading = false;
//   error: Error | null = null;

//   constructor() {
//     makeAutoObservable(this, {
//       fetchProduct: action.bound,
//       setProduct: action.bound,
//       setLoading: action.bound,
//       setError: action.bound,
//     });
//   }

//   setProduct = (product: Product | null) => {
//     this.product = product;
//   };

//   setLoading = (loading: boolean) => {
//     this.loading = loading;
//   };

//   setError = (error: Error | null) => {
//     this.error = error;
//   };

//   fetchProduct = async (id: string) => {
//     this.setLoading(true);
//     this.setError(null);

//     try {
//       const response: AxiosResponse<Product> = await axios.get<Product>(
//         `https://api.escuelajs.co/api/v1/products/${id}`,
//       );

//       runInAction(() => {
//         this.setProduct(response.data);
//       });
//     } catch (error) {
//       runInAction(() => {
//         this.setError(error as Error);
//       });
//     } finally {
//       runInAction(() => {
//         this.setLoading(false);
//       });
//     }
//   };
// }

const singleProductStore = new ProductStore();
export default singleProductStore;
