import { FilterCategory } from '../FilterCategory/FilterCategory';
import { FilterColor } from '../FilterColor/FilterColor';
import { FilterPrice } from '../FilterPrice/FilterPrice';

export const FilterSection = () => {
  return (
    <section className="flex w-80 flex-col pt-5 gap-5 border-r-2">
      <FilterCategory />
      <FilterColor />
      <FilterPrice />
    </section>
  );
};
