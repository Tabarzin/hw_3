import Button from '@components/Button';
import Card from '@components/Card';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './RelatedItems.module.scss';
import { observer } from 'mobx-react-lite';
import relatedItemsStore from '@stores/RelatedItemsStore';
import { cartStore } from '@stores/CartStore';

import defaultImage from '@assets/defaultImage.jpeg';

interface RelatedItemsProps {
  categoryId: number;
}

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
