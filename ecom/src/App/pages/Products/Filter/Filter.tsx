import React from 'react';
import { observer } from 'mobx-react-lite';
import MultiDropdown, { Option } from '@components/MultiDropdown';
import { categoryStore } from '@stores/CategoryStore';
import { searchStore } from '@/stores/SearchStore';

const Filter: React.FC = observer(() => {
  const categories = categoryStore.getCategories.map((category: { id: number; name: string }) => ({
    key: category.id.toString(),
    value: category.name,
  }));

  const handleCategoryChange = (selectedOptions: Option[]) => {
    const selectedCategoryIds = selectedOptions.map((option) => parseInt(option.key));
    searchStore.filterByCategories(selectedCategoryIds);
  };

  return (
    <MultiDropdown
      options={categories}
      value={[]}
      onChange={handleCategoryChange}
      getTitle={(selectedOptions) => (selectedOptions.length > 0 ? 'Filter' : 'Filter')}
    />
  );
});

export default Filter;
