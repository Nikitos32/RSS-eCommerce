import { FilterCategory } from '../FilterCategory/FilterCategory';
import { FilterColor } from '../FilterColor/FilterColor';
import { FilterPrice } from '../FilterPrice/FilterPrice';

export const FilterSection = () => {
  return (
    <section className="w-200">
      <FilterCategory />
      <FilterColor />
      <FilterPrice />
    </section>
  );
};
