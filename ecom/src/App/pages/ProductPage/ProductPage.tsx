import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/scrollbar';
import styles from './ProductPage.module.scss';
import Button from '@components/Button';
import Header from '@components/Header';
import RelatedItems from './RelatedItems';
import BackButton from '@components/BackButton';
import Text from '@components/Text';
import { observer } from 'mobx-react-lite';
import singleProductStore from '@stores/SingleProductStore';

const swiperModules = [Navigation, Scrollbar, A11y];

const ProductPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error, fetchProduct } = singleProductStore;

  // React.useEffect(() => {
  //   fetchProduct(id);
  // }, [id, fetchProduct]);

  React.useEffect(() => {
    const productId = id;

    if (productId) {
      fetchProduct(productId);
    }
  }, [id, fetchProduct]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return null;

  return (
    <div>
      <Header />
      <Link className={styles.link} to="/">
        <BackButton />
      </Link>
      <div className={styles.product_wrapper}>
        <div className={styles.product}>
          <div className={styles.product_container}>
            <Swiper
              modules={swiperModules}
              spaceBetween={40}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {product.images &&
                product.images.map((imageUrl: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      key={index}
                      className={styles.product_image}
                      src={imageUrl}
                      alt={`Product Image ${index + 1} `}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.product_text_block}>
              <Text view="title" className={styles.title}>
                {product.title}
              </Text>
              <Text view="p-20" maxLines={2} className={styles.description}>
                {product.description}
              </Text>
              <Text view="title" className={styles.price}>{`$${product.price}`}</Text>
              <div className={styles.buttons}>
                <Button>Buy Now</Button>
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
        {<RelatedItems categoryId={product.category?.id} />}
      </div>
    </div>
  );
});

export default ProductPage;
