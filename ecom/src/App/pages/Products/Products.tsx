import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import Text from '@components/Text';
import ProductCards from './ProductCards';
import ProductsTitle from './ProductsTitle';
import styles from './Products.module.scss';
import Header from '@components/Header';
import { observer } from 'mobx-react-lite';
import { searchStore } from '@stores/SearchStore';
import { runInAction } from 'mobx';
import { categoryStore } from '@stores/CategoryStore';
import Filter from './Filter/Filter';
import { useSearchParams } from 'react-router-dom';

const Products = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  searchStore.setSearchTerm(searchTerm);

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
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
          <Filter />
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
        {/* <ProductCards products={searchStore.filteredProducts} /> */}
        <ProductCards />
      </div>
    </main>
  );
});

export default Products;

// import productStore from '@stores/ProductStore';

// const Products = observer(() => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const searchTerm = searchParams.get('search') || '';
//   searchStore.setSearchTerm(searchTerm);

//   const handleSearch = (value: string) => {
//     setSearchParams({ search: value });
//     runInAction(() => {
//       searchStore.setSearchTerm(value);
//     });
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     runInAction(() => {
//       handleSearch(searchStore.searchTerm);
//     });
//   };

//   return (
//     <main className={styles.products}>
//       <Header />
//       <ProductsTitle />
//       <div className={styles.input_filter}>
//         <div>
//           <form className={styles.input_btn} onSubmit={handleSubmit}>
//             <Input
//               className={styles.input_text}
//               value={searchStore.searchTerm}
//               onChange={handleSearch}
//               placeholder="Search product"
//             />
//             <Button type="submit">Find now</Button>
//           </form>
//         </div>
//         <div className={styles.filter}>
//           <Filter />
//         </div>
//       </div>
//       <div className={styles.cards_block}>
//         <div className={styles.product_number}>
//           <Text tag={'h1'} color={'primary'} weight={'bold'}>
//             Total product
//           </Text>
//           <Text view={'p-20'} color={'accent'} weight={'bold'}>
//             {searchStore.filteredProducts.length}
//           </Text>
//         </div>
//         {/* <ProductCards products={searchStore.filteredProducts} /> */}
//         <ProductCards />
//       </div>
//     </main>
//   );
// });

// export default Products;

// const Products = () => {
//   return <div className={styles.container}>hei</div>;
// };

// export default Products;

// import React, { useEffect, useState } from 'react';
// import Button from '@components/Button';
// import Input from '@components/Input';
// import Text from '@components/Text';
// import ProductCards from './ProductCards';
// import ProductsTitle from './ProductsTitle';
// import styles from './Products.module.scss';
// import Header from '@components/Header';
// import { observer } from 'mobx-react-lite';
// import { searchStore } from '@stores/SearchStore';
// import { runInAction } from 'mobx';
// import { categoryStore } from '@stores/CategoryStore';
// import Filter from './Filter/Filter';
// import { useSearchParams } from 'react-router-dom';

// const Products = observer(() => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const searchTerm = searchParams.get('search') || '';
//   searchStore.setSearchTerm(searchTerm);

//   const handleSearch = (value: string) => {
//     setSearchParams({ search: value });
//     runInAction(() => {
//       searchStore.setSearchTerm(value);
//     });
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     runInAction(() => {
//       handleSearch(searchStore.searchTerm);
//     });
//   };

//   return (
//     <main className={styles.products}>
//       <Header />
//       <ProductsTitle />
//       <div className={styles.input_filter}>
//         <div>
//           <form className={styles.input_btn} onSubmit={handleSubmit}>
//             <Input
//               className={styles.input_text}
//               value={searchStore.searchTerm}
//               onChange={handleSearch}
//               placeholder="Search product"
//             />
//             <Button type="submit">Find now</Button>
//           </form>
//         </div>
//         <div className={styles.filter}>
//           <Filter />
//         </div>
//       </div>
//       <div className={styles.cards_block}>
//         <div className={styles.product_number}>
//           <Text tag={'h1'} color={'primary'} weight={'bold'}>
//             Total product
//           </Text>
//           <Text view={'p-20'} color={'accent'} weight={'bold'}>
//             {searchStore.filteredProducts.length}
//           </Text>
//         </div>

//         <ProductCards />
//       </div>
//     </main>
//   );
// });

// export default Products;
