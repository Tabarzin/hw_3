import Text from '../../components/Text';
import axios from 'axios';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

import 'swiper/scss/scrollbar';

import styles from './ProductPage.module.scss';
import Button from '../../components/Button';
import Header from '../../components/Header';
import RelatedItems from './RelatedItems';
import BackButton from '../../components/BackButton';
import { AxiosResponse } from 'axios';

interface ProductDetailsProps {
  productId: string;
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

const ProductPage: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = React.useState<any>({});

  React.useEffect(() => {
    axios
      .get<Product[]>(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response: AxiosResponse<Product[]>) => setProductDetails(response.data))
      .catch((error: Error) => console.log(error));
  }, [id]);

  return (
    <div>
      <Header />
      <Link className={styles.link} to={'/'}>
        <BackButton />
      </Link>
      <div className={styles.product_wrapper}>
        <div className={styles.product}>
          <div className={styles.product_container}>
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              spaceBetween={40}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {productDetails.images &&
                productDetails.images.map((imageUrl: string, index: number) => (
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
                {productDetails.title}
              </Text>
              <Text view="p-20" maxLines={2} className={styles.description}>
                {productDetails.description}
              </Text>
              <Text view="title" className={styles.price}>{`$${productDetails.price}`}</Text>
              <div className={styles.buttons}>
                <Button>Buy Now</Button>
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
        {<RelatedItems categoryId={productDetails.category?.id} />}
      </div>
    </div>
  );
};

export default ProductPage;
