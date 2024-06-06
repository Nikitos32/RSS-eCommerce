import { FilterCategory } from '../FilterCategory/FilterCategory';
import { FilterPrice } from '../FilterPrice/FilterPrice';
interface FilterSectionProps {
  currentRangeValue: number[];
  handleCategories: (event: React.ChangeEvent) => void;
  handleRangeSlider: (event: number | number[]) => void;
  showFilter: boolean;
  setShowFilter: (arg: boolean) => void;
}

export const FilterSection = ({
  currentRangeValue,
  handleRangeSlider,
  showFilter,
  setShowFilter,
  handleCategories,
}: FilterSectionProps) => {
  return (
    <section
      className={`flex w-80 bg-white flex-col pt-5 gap-5 border-r-2 absolute ${showFilter ? 'block' : 'hidden'} xl:static xl:block`}
    >
      <div
        className="[block xl:hidden border-b-2 pb-3 pl-5 text-lg font-semibold cursor-pointer"
        onClick={() => setShowFilter(false)}
      >
        {'< Filter'}
      </div>
      <FilterCategory handleCategories={handleCategories} />
      <FilterPrice
        currentRangeValue={currentRangeValue}
        handleRangeSlider={handleRangeSlider}
      />
    </section>
  );
};
