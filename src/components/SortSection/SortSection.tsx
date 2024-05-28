import { SortSelect } from '../SortSelect/SortSelect';

export const SortSection = () => {
  return (
    <div className="flex justify-between">
      <div>search</div>
      <div className="flex gap-2 justify-end items-center">
        <p>Sort by:</p>
        <SortSelect />
      </div>
    </div>
  );
};
