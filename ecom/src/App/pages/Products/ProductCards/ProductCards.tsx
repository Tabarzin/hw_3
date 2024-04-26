import Button from '@components/Button';
import Card from '@components/Card';
import { getAllProducts } from '@api/api';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCards.module.scss';
import { Product } from '@api/api';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductCards: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchMoreProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();
      setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      setHasMore(fetchedProducts.length > 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  React.useEffect(() => {
    fetchMoreProducts();
  }, []);

  const normalizeImageUrl = (imageUrl: string): string => {
    if (imageUrl.startsWith('["') && imageUrl.endsWith('"]')) {
      let extractedUrl = imageUrl.substring(2, imageUrl.length - 2);

      extractedUrl = extractedUrl.replace(/\\/g, '');

      if (extractedUrl.startsWith('"') && extractedUrl.endsWith('"')) {
        extractedUrl = extractedUrl.substring(1, extractedUrl.length - 1);
      }
      return extractedUrl;
    }

    return imageUrl;
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen all the products</b>
          </p>
        }
      >
        <div className={styles.cards}>
          {products.map((product, index) => (
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
    </div>
  );
};

export default ProductCards;
