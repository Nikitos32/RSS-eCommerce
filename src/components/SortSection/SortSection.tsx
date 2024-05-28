import { SearchInput } from '../UI/SearchInput/SearchInput';
import { SortSelect } from '../UI/SortSelect/SortSelect';

export const SortSection = () => {
  return (
    <div className="flex justify-between">
      <SearchInput />
      <div className="flex gap-2 justify-end items-center">
        <p>Sort by:</p>
        <SortSelect />
      </div>
    </div>
  );
};
