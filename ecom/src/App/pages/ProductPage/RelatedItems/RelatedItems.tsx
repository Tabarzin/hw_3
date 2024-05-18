import Button from '@components/Button';
import Card from '@components/Card';
import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './RelatedItems.module.scss';
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react-lite';
import relatedItemsStore from '@stores/RelatedItemsStore';
import { cartStore } from '@stores/CartStore';

import defaultImage from '@assets/defaultImage.jpeg';

interface RelatedItemsProps {
  categoryId: number;
}

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

// const RelatedItems: React.FC<RelatedItemsProps> = ({ categoryId }) => {
//   const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);

//   React.useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       try {
//         const categoryResponse = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories');

//         if (categoryResponse.data) {
//           const category = categoryResponse.data.find((category: Category) => category.id === categoryId);

//           if (category) {
//             const productsResponse = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');

//             if (productsResponse.data) {
//               const filteredProducts = productsResponse.data.filter(
//                 (product: Product) => product.category.name === category.name,
//               );
//               const firstThreeProducts = filteredProducts.slice(0, 3);
//               setRelatedProducts(firstThreeProducts);
//             } else {
//               console.error('Error fetching products');
//             }
//           } else {
//             console.error('Category not found');
//           }
//         } else {
//           console.error('Error fetching categories');
//         }
//       } catch (error) {
//         console.error('Error fetching related products:', error);
//       }
//     };

//     fetchRelatedProducts();
//   }, [categoryId]);

//   return (
//     <>
//       <span className={styles.title}>Related Items</span>
//       <div className={styles.related_block}>
//         {relatedProducts.map((relatedProduct) => (
//           <Link key={relatedProduct['id']} to={`/product/${relatedProduct['id']}`} style={{ textDecoration: 'none' }}>
//             <Card
//               key={relatedProduct['id']}
//               image={relatedProduct.images[1]}
//               captionSlot={relatedProduct.category.name}
//               title={relatedProduct['title']}
//               subtitle={relatedProduct['description']}
//               contentSlot={`$${relatedProduct.price}`}
//               actionSlot={<Button> Add to Cart </Button>}
//             />
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// };

// export default RelatedItems;

const RelatedItems: React.FC<RelatedItemsProps> = observer(({ categoryId }) => {
  const { relatedProducts, loading, error, fetchRelatedProducts } = relatedItemsStore;

  React.useEffect(() => {
    fetchRelatedProducts(categoryId);
  }, [categoryId, fetchRelatedProducts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <span className={styles.title}>Related Items</span>
      <div className={styles.related_block}>
        {relatedProducts.map((relatedProduct) => (
          <Link key={relatedProduct['id']} to={`/product/${relatedProduct['id']}`} style={{ textDecoration: 'none' }}>
            <Card
              key={relatedProduct['id']}
              image={relatedProduct.images.length >= 2 ? relatedProduct.images[1] : defaultImage}
              captionSlot={relatedProduct.category.name}
              title={relatedProduct['title']}
              subtitle={relatedProduct['description']}
              contentSlot={`$${relatedProduct.price}`}
              actionSlot={
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    cartStore.addToCart(relatedProduct);
                  }}
                >
                  Add to Cart
                </Button>
              }
            />
          </Link>
        ))}
      </div>
    </>
  );
});

export default RelatedItems;
