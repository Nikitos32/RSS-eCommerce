import { FilterSection } from '../FilterSection/FilterSection';
import { ProductPreviewItem } from '../ProductPreviewItem/ProductPreviewItem';
import { SortSection } from '../SortSection/SortSection';

export const CatalogPage = () => {
  return (
    <section className="flex">
      <div>
        <FilterSection />
      </div>
      <div className="flex gap-5 flex-col w-full p-5">
        <SortSection />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">Products</h1>
          <section className="flex flex-col gap-5 flex-wrap">
            <ProductPreviewItem />
            <ProductPreviewItem />
            <ProductPreviewItem />
            <ProductPreviewItem />
          </section>
        </div>
      </div>
    </section>
  );
};
