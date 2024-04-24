import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import Text from '@components/Text';
import ProductCards from './ProductCards';
import ProductsTitle from './ProductsTitle';
import styles from './Products.module.scss';
import Header from '@components/Header';

const Products = () => {
  const getPlaceholderText = (selectedOptions: Option[]) => {
    if (selectedOptions.length === 0) {
      return 'Filter';
    }

    return 'Filter';
  };

  return (
    <main className={styles.products}>
      <Header />
      <ProductsTitle />
      <div className={styles.input_filter}>
        <div>
          <form className={styles.input_btn}>
            <Input
              className={styles.input_text}
              value={'Search product'}
              onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
            <Button> Find now</Button>
          </form>
        </div>
        <div className={styles.filter}>
          <MultiDropdown
            options={[]}
            value={[]}
            onChange={function (value: Option[]): void {
              throw new Error('Function not implemented.');
            }}
            getTitle={getPlaceholderText}
          />
        </div>
      </div>

      <div className={styles.cards_block}>
        <div className={styles.product_number}>
          <Text tag={'h1'} color={'primary'} weight={'bold'}>
            Total product
          </Text>

          <Text view={'p-20'} color={'accent'} weight={'bold'}>
            184
          </Text>
        </div>
        <ProductCards />
      </div>
    </main>
  );
};

export default Products;
