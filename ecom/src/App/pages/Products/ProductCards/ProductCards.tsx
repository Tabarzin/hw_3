import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@components/Button';
import Card from '@components/Card';
import { Link } from 'react-router-dom';
import styles from './ProductCards.module.scss';
import productStore from '@stores/ProductStore';
import InfiniteScroll from 'react-infinite-scroll-component';

import { searchStore } from '@stores/SearchStore';

const ProductCards = observer(() => {
  const { products, hasMore, fetchProducts, normalizeImageUrl } = productStore;
  const { filteredProducts } = searchStore;

  const productsToDisplay = searchStore.searchTerm ? filteredProducts : products;

  React.useEffect(() => {
    if (!searchStore.searchTerm) {
      fetchProducts();
    }
  }, []);

  return (
    <InfiniteScroll
      dataLength={productsToDisplay.length}
      next={fetchProducts}
      hasMore={hasMore && !searchStore.searchTerm}
      loader={<h4>Loading...</h4>}
      endMessage={<p>**Yay! You have seen all the products**</p>}
    >
      <div className={styles.cards}>
        {productsToDisplay.map((product, index) => (
          <Link key={`${product.id}-${index}`} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <Card
              key={`${product.id}-${index}`}
              image={normalizeImageUrl(product.images[0])}
              captionSlot={product.category.name}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
});

export default ProductCards;
