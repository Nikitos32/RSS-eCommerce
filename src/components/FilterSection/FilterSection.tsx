import { FilterCategory } from '../FilterCategory/FilterCategory';
import { FilterPrice } from '../FilterPrice/FilterPrice';
interface FilterSectionProps {
  currentRangeValue: number[];
  handleCategories: (event: React.ChangeEvent) => void;
  handleRangeSlider: (event: number | number[]) => void;
}

export const FilterSection = ({
  currentRangeValue,
  handleRangeSlider,
  handleCategories,
}: FilterSectionProps) => {
  return (
    <section className="flex w-80 flex-col pt-5 gap-5 border-r-2">
      <FilterCategory handleCategories={handleCategories} />
      <FilterPrice
        currentRangeValue={currentRangeValue}
        handleRangeSlider={handleRangeSlider}
      />
    </section>
  );
};
