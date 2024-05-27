import { CategoryCheckbox } from '../CategoryCheckbox/CategoryCheckbox';

export const FilterCategory = () => {
  return (
    <div>
      <p>Category:</p>
      <CategoryCheckbox category="Tables" amountItems={3} />
      <CategoryCheckbox category="Chairs" amountItems={3} />
      <CategoryCheckbox category="Beds" amountItems={3} />
    </div>
  );
};
