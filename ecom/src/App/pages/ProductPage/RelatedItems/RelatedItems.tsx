import Button from '../../../components/Button';
import Card from '../../../components/Card';
import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './RelatedItems.module.scss';
import { AxiosResponse } from 'axios';

interface RelatedItemsProps {
  categoryId: number;
}

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

const RelatedItems: React.FC<RelatedItemsProps> = ({ categoryId }) => {
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    axios
      .get<Category[]>('https://api.escuelajs.co/api/v1/categories')
      .then((categoriesResponse: AxiosResponse<Category[]>) => {
        const category = categoriesResponse.data.find((category: Category) => category.id === categoryId);

        if (category) {
          axios
            .get<Product[]>('https://api.escuelajs.co/api/v1/products')
            .then((productsResponse: AxiosResponse<Product[]>) => {
              const filteredProducts = productsResponse.data.filter(
                (product: Product) => product.category.name === category.name,
              );

              const first3Products = filteredProducts.slice(0, 3);

              setRelatedProducts(first3Products);
            })
            .catch((error: Error) => console.log(error));
        }
      })
      .catch((error: Error) => console.log(error));
  }, [categoryId]);

  return (
    <>
      <span className={styles.title}>Related Items</span>
      <div className={styles.related_block}>
        {relatedProducts.map((relatedProduct) => (
          <Link key={relatedProduct['id']} to={`/product/${relatedProduct['id']}`} style={{ textDecoration: 'none' }}>
            <Card
              key={relatedProduct['id']}
              image={relatedProduct.images[1]}
              captionSlot={relatedProduct.category.name}
              title={relatedProduct['title']}
              subtitle={relatedProduct['description']}
              contentSlot={`$${relatedProduct.price}`}
              actionSlot={<Button> Add to Cart </Button>}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default RelatedItems;
