import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FilterPriceProps {
  currentRangeValue: number[];
  handleRangeSlider: (event: number | number[]) => void;
}

export const FilterPrice = ({
  currentRangeValue,
  handleRangeSlider,
}: FilterPriceProps) => {
  return (
    <div className="flex flex-col gap-3 border-b-2 pb-9 pl-5">
      <p>Price:</p>
      <p>
        Current Range: ${currentRangeValue[0]} - ${currentRangeValue[1]}
      </p>
      <div className="w-36 pl-2">
        <Slider
          marks={{ 0: '$0', 1000: '$1000' }}
          range
          defaultValue={[0, 1000]}
          step={1}
          min={0}
          max={1000}
          pushable={10}
          onChange={(event) => handleRangeSlider(event)}
        />
      </div>
    </div>
  );
};
