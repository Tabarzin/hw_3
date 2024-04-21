import styles from './ProductsTitle.module.scss';

const ProductsTitle = () => {
  return (
    <div className={styles.title_block}>
      <span className={styles.title}>Products</span>
      <span className={styles.subtitle}>
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </span>
    </div>
  );
};

export default ProductsTitle;
