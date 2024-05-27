import { FilterCategory } from '../FilterCategory/FilterCategory';
import { FilterColor } from '../FilterColor/FilterColor';
import { FilterPrice } from '../FilterPrice/FilterPrice';

export const FilterSection = () => {
  return (
    <section>
      <FilterCategory />
      <FilterColor />
      <FilterPrice />
    </section>
  );
};
