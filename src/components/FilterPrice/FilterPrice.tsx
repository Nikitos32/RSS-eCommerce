import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

export const FilterPrice = () => {
  const [currentRangeValue, setCurrentRangeValue] = useState<number[]>([
    0, 1000,
  ]);
  const handleRangeSlider = (event: number | number[]) => {
    if (typeof event !== 'number') {
      setCurrentRangeValue(event);
    }
  };

  return (
    <div className="flex flex-col gap-3 ">
      <p>Price:</p>
      <p>
        Current Range: ${currentRangeValue[0]} - ${currentRangeValue[1]}
      </p>
      <div className="w-36">
        <Slider
          marks={{ 0: '$0', 1000: '$1000' }}
          range
          defaultValue={[0, 1000]}
          step={1}
          min={0}
          max={1000}
          pushable={100}
          onChange={(event) => handleRangeSlider(event)}
        />
      </div>
    </div>
  );
};
