import { ColorBox } from '../ColorBox/ColorBox';

export const FilterColor = () => {
  return (
    <>
      <p>Color:</p>
      <ColorBox color="bg-red-600" />
      <ColorBox color="bg-blue-600" />
      <ColorBox color="bg-yellow-600" />
      <ColorBox color="bg-green-600" />
      <ColorBox color="bg-black" />
      <ColorBox color="bg-white" />
      <ColorBox color="bg-stone-600" />
    </>
  );
};
