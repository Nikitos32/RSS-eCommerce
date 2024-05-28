import { ColorBox } from '../ColorBox/ColorBox';

export const FilterColor = () => {
  return (
    <div className="flex flex-col gap-1 border-b-2 w-60 pb-3">
      <p>Color:</p>
      <div className="flex gap-1">
        <ColorBox color="bg-red-600" />
        <ColorBox color="bg-blue-600" />
        <ColorBox color="bg-yellow-600" />
        <ColorBox color="bg-green-600" />
        <ColorBox color="bg-black" />
        <ColorBox color="bg-white" />
        <ColorBox color="bg-stone-600" />
      </div>
    </div>
  );
};
