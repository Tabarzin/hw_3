import Header from '@components/Header';
import { observer } from 'mobx-react-lite';
import { categoryStore } from '@stores/CategoryStore';
import React from 'react';
import { useEffect } from 'react';
import { runInAction } from 'mobx';
import Text from '@components/Text';
import styles from './Categories.module.scss';

const isValidImageURL = (url: string) => {
  const imageUrlPattern = /\.(jpeg|jpg|gif|png)$/;
  return imageUrlPattern.test(url);
};

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories = observer(() => {
  useEffect(() => {
    runInAction(() => {
      categoryStore.fetchCategories();
    });
  }, []);

  return (
    <div>
      <Header />
      <Text tag="h2" children="Categories" />

      <ul className={styles.categories_block}>
        {categoryStore.getCategories
          .filter((category: Category) => {
            return category.image && isValidImageURL(category.image);
          })
          .map((category: Category) => (
            <li key={category.id}>
              <img
                src={category.image}
                alt={category.name}
                className={styles.category_image}
                referrerPolicy="no-referrer"
              />
              <Text>{category.name}</Text>
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
