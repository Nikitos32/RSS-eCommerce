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
          marks={{ 0: '$0', 3100: '$3100' }}
          range
          defaultValue={[0, 3100]}
          step={10}
          min={0}
          max={3100}
          pushable={10}
          onChange={(event) => handleRangeSlider(event)}
        />
      </div>
    </div>
  );
};
