import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@components/Button';
import Card from '@components/Card';
import { Link } from 'react-router-dom';
import styles from './ProductCards.module.scss';
import productStore from '@stores/ProductStore';
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchStore } from '@stores/SearchStore';
import { runInAction } from 'mobx';
import { getAllProducts, Product } from '@api/api';
import { cartStore } from '@stores/CartStore';
import defaultImage from '@assets/defaultImage.jpeg';

interface ProductCardsProps {
  products: Product[];
}

const ProductCards = observer(() => {
  const { products, hasMore, fetchProducts, normalizeImageUrl } = productStore;
  const { filteredProducts, searchTerm } = searchStore;

  React.useEffect(() => {
    runInAction(() => {
      if (products.length === 0) {
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
              image={product.images.length >= 2 ? normalizeImageUrl(product.images[1]) : defaultImage}
              captionSlot={product.category.name}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    cartStore.addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              }
            />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
});

export default ProductCards;
