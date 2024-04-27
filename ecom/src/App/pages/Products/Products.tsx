import Button from '@components/Button';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import Text from '@components/Text';
import ProductCards from './ProductCards';
import ProductsTitle from './ProductsTitle';
import styles from './Products.module.scss';
import Header from '@components/Header';

import { observer } from 'mobx-react-lite';
import { searchStore } from '@stores/SearchStore';
import { runInAction } from 'mobx';

const Products = observer(() => {
  const handleSearch = (value: string) => {
    runInAction(() => {
      searchStore.setSearchTerm(value);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runInAction(() => {
      handleSearch(searchStore.searchTerm);
    });
  };

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
          <form className={styles.input_btn} onSubmit={handleSubmit}>
            <Input
              className={styles.input_text}
              value={searchStore.searchTerm}
              onChange={handleSearch}
              placeholder="Search product"
            />
            <Button type="submit">Find now</Button>
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
            {searchStore.filteredProducts.length}
          </Text>
        </div>
        <ProductCards products={searchStore.filteredProducts} />
      </div>
    </main>
  );
});

export default Products;
