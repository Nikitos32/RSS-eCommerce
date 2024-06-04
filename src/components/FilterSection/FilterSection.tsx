import { FilterCategory } from '../FilterCategory/FilterCategory';
import { FilterPrice } from '../FilterPrice/FilterPrice';
interface FilterSectionProps {
  currentRangeValue: number[];
  handleRangeSlider: (event: number | number[]) => void;
  // showFilter: boolean;
  // setShowFilter: (arg: boolean) => void;
}

export const FilterSection = ({
  currentRangeValue,
  handleRangeSlider,
  // showFilter,
  // setShowFilter
}: FilterSectionProps) => {
  return (
    <section className="flex w-80 flex-col pt-5 gap-5 border-r-2">
      <FilterCategory />
      <FilterPrice
        currentRangeValue={currentRangeValue}
        handleRangeSlider={handleRangeSlider}
      />
    </section>
  );
};
