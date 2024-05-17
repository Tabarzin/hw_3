import React from 'react';
import { observer } from 'mobx-react-lite';
import MultiDropdown, { Option } from '@components/MultiDropdown';
import { categoryStore } from '@stores/CategoryStore';
import { searchStore } from '@stores/SearchStore';
import { useSearchParams } from 'react-router-dom';

const Filter: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryOptions = categoryStore.getCategoryOptions;
  const categoryIds = searchParams.getAll('categories').map((id) => parseInt(id, 10));

  React.useEffect(() => {
    searchStore.filterByCategories(categoryIds);
  }, [categoryIds]);

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const selectedCategoryIds = selectedOptions.map((option) => parseInt(option.key));
    const categoryStrings = selectedCategoryIds.map(String);
    setSearchParams({ categories: categoryStrings });
    searchStore.filterByCategories(selectedCategoryIds);
  };

  const initialValue = categoryOptions.filter((option) => categoryIds.includes(parseInt(option.key)));

  return (
    <MultiDropdown
      options={categoryOptions}
      value={initialValue}
      onChange={handleCategoryChange}
      getTitle={(selectedOptions) =>
        selectedOptions.length > 0 ? selectedOptions.map((option) => option.value).join(', ') : 'Filter'
      }
    />
  );
});

export default Filter;
