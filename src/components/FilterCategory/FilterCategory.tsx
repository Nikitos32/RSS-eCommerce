import { CategoryCheckbox } from '../CategoryCheckbox/CategoryCheckbox';

interface FilterCategoryProps {
  handleCategories: (event: React.ChangeEvent) => void;
}

export const FilterCategory = ({ handleCategories }: FilterCategoryProps) => {
  return (
    <div className="flex flex-col gap-2 border-b-2 pb-3 pl-5">
      <p>Category:</p>
      <CategoryCheckbox
        handleCategories={handleCategories}
        value="266af93b-136f-456e-97c0-5d5ec9a922c6"
        category="Home Decor"
        amountItems={28}
      />
      <CategoryCheckbox
        handleCategories={handleCategories}
        value="7bc4d2e8-a12a-44dc-92c7-a027ba7a6088"
        category="Furniture"
        amountItems={42}
      />
      <CategoryCheckbox
        handleCategories={handleCategories}
        value="6ee0d40d-61c5-42ec-a33a-0baaf760330f"
        category="Kitchen"
        amountItems={43}
      />
    </div>
  );
};
