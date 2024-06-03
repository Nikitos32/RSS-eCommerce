import { SearchInput } from '../UI/SearchInput/SearchInput';
import { SortSelect } from '../UI/SortSelect/SortSelect';

interface SortSectionProps {
  handleCurrentSort: (event: React.ChangeEvent) => void;
  handleCurrentSearch: (event: React.ChangeEvent) => void;
}

export const SortSection = ({
  handleCurrentSort,
  handleCurrentSearch,
}: SortSectionProps) => {
  return (
    <div className="flex justify-between">
      <SearchInput handleCurrentSearch={handleCurrentSearch} />
      <div className="flex gap-2 justify-end items-center">
        <p>Sort by:</p>
        <SortSelect handleCurrentSort={handleCurrentSort} />
      </div>
    </div>
  );
};
