import React from 'react';
import { observer } from 'mobx-react-lite';
import MultiDropdown, { Option } from '@components/MultiDropdown';
import { categoryStore } from '@stores/CategoryStore';
import { searchStore } from '@stores/SearchStore';
import { useSearchParams } from 'react-router-dom';

const Filter: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = categoryStore.getCategories.map((category: { id: number; name: string }) => ({
    key: category.id.toString(),
    value: category.name,
  }));

  const categoryIds = searchParams.getAll('categories').map((id) => parseInt(id, 10));

  React.useEffect(() => {
    searchStore.filterByCategories(categoryIds);
  }, [categoryIds]);

  // const handleCategoryChange = (selectedOptions: Option[]) => {
  //   const selectedCategoryIds = selectedOptions.map((option) => parseInt(option.key));
  //   setSearchParams({ categories: selectedCategoryIds });
  //   searchStore.filterByCategories(selectedCategoryIds);
  // };

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const selectedCategoryIds = selectedOptions.map((option) => parseInt(option.key));
    const categoryStrings = selectedCategoryIds.map(String); // Convert numbers to strings
    setSearchParams({ categories: categoryStrings });
    searchStore.filterByCategories(selectedCategoryIds);
  };

  const initialValue = categories.filter((category) => categoryIds.includes(parseInt(category.key)));

  return (
    <MultiDropdown
      options={categories}
      value={initialValue}
      onChange={handleCategoryChange}
      getTitle={(selectedOptions) =>
        selectedOptions.length > 0 ? selectedOptions.map((option) => option.value).join(', ') : 'Filter'
      }
    />
  );
});

export default Filter;
