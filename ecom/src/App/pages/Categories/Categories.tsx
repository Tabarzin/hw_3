import Header from '@components/Header';
import { observer } from 'mobx-react-lite';
import { categoryStore } from '@stores/CategoryStore';
import { useEffect } from 'react';
import { runInAction } from 'mobx';
import Text from '@components/Text';

interface Category {
  id: number;
  name: string;
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

      <ul>
        {categoryStore.getCategories.map((category: Category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
