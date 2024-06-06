import { CategoryCheckbox } from '../CategoryCheckbox/CategoryCheckbox';

export const FilterCategory = () => {
  return (
    <div className="flex flex-col gap-2 border-b-2 pb-3 pl-5">
      <p>Category:</p>
      <CategoryCheckbox category="Tables" amountItems={28} />
      <CategoryCheckbox category="Chairs" amountItems={42} />
      <CategoryCheckbox category="Beds" amountItems={3} />
    </div>
  );
};
