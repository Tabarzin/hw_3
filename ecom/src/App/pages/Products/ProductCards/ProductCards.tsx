// import Button from '../../../components/Button';
// import Card from '../../../components/Card';

import Button from '@components/Button';
import Card from '@components/Card';

import { getAllProducts } from '../../../../api/api';

import * as React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination';
import styles from './ProductCards.module.scss';
import { Product } from '@api/api';

const ProductCards: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 9;

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // const totalPages = Math.ceil(products.length / productsPerPage);
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = React.useMemo(() => {
    return Math.ceil(products.length / productsPerPage);
  }, [products.length, productsPerPage]);

  const indexOfLastProduct = React.useMemo(() => {
    return currentPage * productsPerPage;
  }, [currentPage, productsPerPage]);

  const indexOfFirstProduct = React.useMemo(() => {
    return indexOfLastProduct - productsPerPage;
  }, [indexOfLastProduct, productsPerPage]);

  const currentProducts = React.useMemo(() => {
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, indexOfFirstProduct, indexOfLastProduct]);

  return (
    <div>
      <div className={styles.cards}>
        {currentProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <Card
              key={product.id}
              image={product.images[0]}
              captionSlot={product.category.name}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </Link>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProductCards;
