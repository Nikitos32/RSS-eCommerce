import { FilterCategory } from '../FilterCategory/FilterCategory';
import { FilterColor } from '../FilterColor/FilterColor';
import { FilterPrice } from '../FilterPrice/FilterPrice';

export const FilterSection = () => {
  return (
    <section className="flex flex-col p-6 gap-5">
      <FilterCategory />
      <FilterColor />
      <FilterPrice />
    </section>
  );
};
