import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@components/Button';
import Card from '@components/Card';
import { Link } from 'react-router-dom';
import styles from './ProductCards.module.scss';
import productStore from '@stores/ProductStore';
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchStore } from '@stores/SearchStore';
import { runInAction } from 'mobx';

const ProductCards = observer(() => {
  const { products, hasMore, fetchProducts, normalizeImageUrl } = productStore;
  const { filteredProducts, searchTerm } = searchStore;

  React.useEffect(() => {
    runInAction(() => {
      if (searchTerm && products.length > 0) {
      } else if (products.length === 0) {
        fetchProducts();
      }
    });
  }, [searchTerm, products.length]);

  return (
    <InfiniteScroll
      dataLength={filteredProducts.length}
      next={fetchProducts}
      hasMore={hasMore && !searchTerm && filteredProducts.length === 0}
      loader={<h4>Loading...</h4>}
      endMessage={<p>**Yay! You have seen all the products**</p>}
    >
      <div className={styles.cards}>
        {filteredProducts.map((product, index) => (
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
