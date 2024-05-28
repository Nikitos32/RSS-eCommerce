import { FilterSection } from '../FilterSection/FilterSection';
import { SortSection } from '../SortSection/SortSection';

export const CatalogPage = () => {
  return (
    <section className="flex">
      <div>
        <FilterSection />
      </div>
      <div className="flex flex-col w-full p-5">
        <SortSection />
      </div>
    </section>
  );
};
