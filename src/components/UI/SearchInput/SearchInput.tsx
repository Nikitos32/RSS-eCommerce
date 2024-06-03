import { CiSearch } from 'react-icons/ci';

interface SearchInputProps {
  handleCurrentSearch: (event: React.ChangeEvent) => void;
}

export const SearchInput = ({ handleCurrentSearch }: SearchInputProps) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <input
        type="search"
        placeholder="Search ..."
        className="outline-none border-b-2 border-slate-600"
        onChange={(event) => handleCurrentSearch(event)}
      />
      <CiSearch className="cursor-pointer" size={25} />
    </div>
  );
};
