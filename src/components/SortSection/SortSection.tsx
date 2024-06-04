import { SearchInput } from '../UI/SearchInput/SearchInput';
import { SortSelect } from '../UI/SortSelect/SortSelect';

interface SortSectionProps {
  handleCurrentSort: (event: React.ChangeEvent) => void;
  handleCurrentSearch: (event: React.ChangeEvent) => void;
  showFilter: boolean;
  setShowFilter: (arg: boolean) => void;
}

export const SortSection = ({
  handleCurrentSort,
  handleCurrentSearch,
  showFilter,
  setShowFilter,
}: SortSectionProps) => {
  return (
    <div className="flex justify-between alight-center items-center">
      <div>
        <SearchInput handleCurrentSearch={handleCurrentSearch} />
      </div>
      <button
        className="xl:hidden h-min px-3 rounded-2xl cursor-pointer border-2 border-moonBlack"
        onClick={() => setShowFilter(!showFilter)}
      >
        <span>Filter</span>
      </button>
      <div className="flex gap-2 justify-end items-center">
        <p>Sort by:</p>
        <SortSelect handleCurrentSort={handleCurrentSort} />
      </div>
    </div>
  );
};
