import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const FilterPrice = () => {
  return (
    <div className="flex flex-col">
      <p>Price:</p>
      <div className="w-36">
        <Slider
          marks={{ 0: '$0', 1000: '$1000' }}
          range
          defaultValue={[0, 1000]}
          step={1}
          min={0}
          max={1000}
          pushable={100}
        />
      </div>
    </div>
  );
};
